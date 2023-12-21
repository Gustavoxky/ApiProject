import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { GetUsers } from "../controllers/services/users/GetUsers";

jest.mock("../database/PrismaClient", () => ({
  users: {
    findMany: jest.fn()
  }
}));

describe("GetUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar a lista de usuários", async () => {
    const getUsers = new GetUsers();
    const req = {
      params: {}
    } as Request;
    const res = {
      json: jest.fn()
    } as unknown as Response;

    const mockUserList = [
      { name: "User 1", email: "user1@example.com" },
      { name: "User 2", email: "user2@example.com" }
    ];

    (prisma.users.findMany as jest.Mock).mockResolvedValue(mockUserList);

    await getUsers.handle(req, res);

    expect(prisma.users.findMany).toBeCalledWith({
      select: {
        id: true,
        name: true,
        email: true
      }
    });
    expect(res.json).toBeCalledWith(mockUserList);
  });
});
