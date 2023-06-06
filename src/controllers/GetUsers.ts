import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { Users } from "../interfaces";

export class GetUsers {
  async handle(req: Request, res: Response) {
    try {
      const getUsers: Users[] = await prisma.users.findMany({
        select: {
          name: true,
          email: true,
        },
      });

      return res.json(getUsers);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao obter usuários" });
    }
  }
}
