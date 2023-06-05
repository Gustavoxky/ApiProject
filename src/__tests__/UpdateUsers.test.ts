import { Request, Response } from "express";
import { UpdateUsers } from "../controllers/UpdateUsers";
import prisma from "../database/PrismaClient";

jest.mock("../database/PrismaClient", () => ({
  users: {
    findUnique: jest.fn(),
    update: jest.fn()
  }
}));

describe("UpdateUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve atualizar os dados do usuário existente", async () => {
    const updateUsers = new UpdateUsers();
    const req = {
      body: {
        name: "User 1",
        email: "user1@example.com",
        login: "user1",
        password: "password1"
      }
    } as Request;
    const res = {
      json: jest.fn()
    } as unknown as Response;

    const existingUser = {
      name: "User 1",
      email: "user1@example.com",
      login: "user1",
      password: "password1"
    };

    const updatedUser = {
      name: "User 1",
      email: "updateduser1@example.com",
      login: "updateduser1",
      password: "updatedpassword1"
    };

    (prisma.users.findUnique as jest.Mock).mockResolvedValue(existingUser);
    (prisma.users.update as jest.Mock).mockResolvedValue(updatedUser);

    await updateUsers.handle(req, res);

    expect(prisma.users.findUnique).toBeCalledWith({
      where: {
        name: "User 1"
      }
    });
    expect(prisma.users.update).toBeCalledWith({
      where: {
        name: "User 1"
      },
      data: {
        name: "User 1",
        email: "user1@example.com",
        login: "user1",
        password: "password1"
      }
    });
    expect(res.json).toBeCalledWith(updatedUser);
  });

  it("Deve retornar status 404 quando o usuário não existe", async () => {
    const updateUsers = new UpdateUsers();
    const req = {
      body: {
        name: "User 2",
        email: "user2@example.com",
        login: "user2",
        password: "password2"
      }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);

    await updateUsers.handle(req, res);

    expect(prisma.users.findUnique).toBeCalledWith({
      where: {
        name: "User 2"
      }
    });
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "Usuário não encontrado" });
  });

  it("Deve retornar status 500 quando ocorrer um erro", async () => {
    const updateUsers = new UpdateUsers();
    const req = {
      body: {
        name: "User 3",
        email: "user3@example.com",
        login: "user3",
        password: "password3"
      }
    } as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    const mockError = new Error("An error occurred");
    (prisma.users.findUnique as jest.Mock).mockRejectedValue(mockError);

    await updateUsers.handle(req, res);

    expect(prisma.users.findUnique).toBeCalledWith({
      where: {
        name: "User 3"
      }
    });
    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Ocorreu um erro ao atualizar o usuário" });
  });
})