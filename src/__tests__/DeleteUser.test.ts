import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { DeleteUsers } from "../controllers/services/users/DeleteUsers";

jest.mock("../database/PrismaClient", () => ({
  users: {
    findUnique: jest.fn(),
    delete: jest.fn()
  }
}));

describe("DeleteUsers", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve retornar status 404 quando o usuário não for encontrado", async () => {
    const deleteUsers = new DeleteUsers();
    const req = {
      params: {
        id: "1"
      }
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    (prisma.users.findUnique as jest.Mock).mockResolvedValue(null);

    await deleteUsers.handle(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "Usuário não encontrado" });
  });

  it("Deve retornar status 200 quando o usuário for excluído com sucesso", async () => {
    const deleteUsers = new DeleteUsers();
    const req = {
      params: {
        id: "1"
      }
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    (prisma.users.findUnique as jest.Mock).mockResolvedValue({
      id: "1"
    });
    (prisma.users.delete as jest.Mock).mockResolvedValue({});

    await deleteUsers.handle(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      message: "Usuário excluído com sucesso"
    });
  });

  it("Deve retornar status 500 quando ocorrer um erro ao excluir o usuário", async () => {
    const deleteUsers = new DeleteUsers();
    const req = {
      params: {
        id: "1"
      }
    } as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;

    (prisma.users.findUnique as jest.Mock).mockResolvedValue({
      id: "1"
    });
    (prisma.users.delete as jest.Mock).mockRejectedValue(
      new Error("Erro ao excluir o usuário")
    );

    await deleteUsers.handle(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({
      error: "Ocorreu um erro ao excluir o usuário"
    });
  });
});
