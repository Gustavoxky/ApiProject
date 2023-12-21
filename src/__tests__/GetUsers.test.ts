import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { GetUsers } from "../controllers/services/users/GetUsers";

const redisMock = {
  get: jest.fn(),
  setex: jest.fn(),
};

jest.mock("ioredis", () => ({
  __esModule: true,
  default: redisMock,
}));

describe("GetUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar a lista de usuários", async () => {
    // Configurando o mock para o Prisma
    const mockUserList = [
      { id: '1', name: 'User 1', email: 'user1@example.com', login: 'user1', password: 'password1' },
      { id: '2', name: 'User 2', email: 'user2@example.com', login: 'user2', password: 'password2' },
    ];

    (prisma.users.findMany as jest.Mock).mockResolvedValueOnce({
      $values: mockUserList,
    });

    // Configurando o mock para o Redis
    (redisMock.get as jest.Mock).mockResolvedValueOnce(null);
    (redisMock.setex as jest.Mock).mockResolvedValueOnce(null);

    const getUsers = new GetUsers();
    const req = {
      params: {},
    } as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    // Chama getUsers.handle
    await getUsers.handle(req, res);

    expect(prisma.users.findMany).toHaveBeenCalledWith({
      select: {
        id: true,
        name: true,
        email: true,
        login: true,
        password: true,
      },
    });
    expect(redisMock.get).toHaveBeenCalledWith("usersCache");
    expect(res.json).toHaveBeenCalledWith(mockUserList);
  });
});
