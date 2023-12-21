import { Request, Response } from "express";
import Redis, { RedisOptions } from "ioredis";
import prisma from "../../../database/PrismaClient";
import { Users } from "../../../interfaces";
import { redisConfig } from "../../../config/redis";

const { host, port } = redisConfig;

// Ajuste as opções conforme necessário
const redisOptions: RedisOptions = {
  host,
  port,
  enableOfflineQueue: false,
  maxRetriesPerRequest: 10,
  enableReadyCheck: true,
};

const redisClient: Redis = new Redis(redisOptions);

const CACHE_KEY = "usersCache";
const CACHE_EXPIRATION_TIME = 3600; // Em segundos
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

async function getFromCache(cacheKey: string): Promise<Users[] | null> {
  try {
    // Aguarda 100 ms entre as requisições ao Redis
    await new Promise((resolve) => setTimeout(resolve, 100));

    const cachedData = await redisClient.get(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  } catch (redisError) {
    handleRedisError(redisError);
    return null;
  }
}

async function setToCache(cacheKey: string, data: Users[]): Promise<void> {
  const serializedData = JSON.stringify(data);
  await redisClient.setex(cacheKey, CACHE_EXPIRATION_TIME, serializedData);
}

async function getUsersFromDatabase(): Promise<Users[]> {
  return prisma.users.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

function handleRedisError(redisError: any): void {
  console.error("Erro ao interagir com o Redis:", redisError);
}

export class GetUsers {
  async handle(req: Request, res: Response) {
    try {
      const cachedData = await getFromCache(CACHE_KEY);

      if (cachedData) {
        console.log("Dados encontrados no cache.");
        return res.json(cachedData);
      }

      const getUsers: Users[] = await getUsersFromDatabase();

      if (getUsers.length > 0) {
        await setToCache(CACHE_KEY, getUsers);
        console.log("Dados armazenados no cache.");
      }

      return res.json(getUsers);
    } catch (error: any) {
      console.error(error);
      return res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
        error: "Erro ao obter usuários",
        details: error.message,
      });
    } finally {
      // Libere recursos, se necessário
    }
  }
}
