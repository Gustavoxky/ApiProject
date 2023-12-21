import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { CreateUsers } from "../controllers/services/users/CreateUsers";
import { validateEmail } from "../utils/validateEmail";

const mockRequest = () => {
  const req: Partial<Request> = {
    body: {}
  };
  return req as Request;
};

const mockResponse = () => {
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
  };
  return res as Response;
};

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashedPassword")
}));

jest.mock("../database/PrismaClient", () => ({
  users: {
    findFirst: jest.fn(),
    create: jest.fn()
  }
}));

describe("CreateUsers", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new user successfully", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: "John Doe",
      email: "johndoe@example.com",
      login: "johndoe",
      password: "password123"
    };

    (prisma.users.findFirst as jest.Mock).mockResolvedValue(null);
    (prisma.users.create as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      login: "johndoe",
      password: "hashedPassword"
    });

    await new CreateUsers().handle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should return error 400 when required fields are missing", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: "John Doe",
      email: "",
      login: "johndoe",
      password: "password123"
    };

    await new CreateUsers().handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Os campos name, email, login e password são obrigatórios."
    });
  });

  it("should return error 400 when the email format is invalid", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: "John Doe",
      email: "johndoexample.com",
      login: "johndoe",
      password: "password123"
    };

    await new CreateUsers().handle(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Formato de e-mail inválido."
    });
  });

  it("should return error 409 when the user already exists", async () => {
    const req = mockRequest();
    const res = mockResponse();

    req.body = {
      name: "Jane Smith",
      email: "johndoe@example.com",
      login: "johndoe",
      password: "password456"
    };

    (prisma.users.findFirst as jest.Mock).mockResolvedValue({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      login: "johndoe",
      password: "hashedPassword"
    });
    await new CreateUsers().handle(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ error: "Usuário já existe." });
  });

  it("should return error 500 when an error occurs", async () => {
    const req = mockRequest();
    const res = mockResponse();
    req.body = {
      name: "John Doe",
      email: "johndoe@example.com",
      login: "johndoe",
      password: "password123"
    };

    (prisma.users.findFirst as jest.Mock).mockRejectedValue(
      new Error("Database error")
    );

    await new CreateUsers().handle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Erro ao criar usuário." });
  });
});

describe("validateEmail", () => {
  it("should return true for a valid email", () => {
    const email = "johndoe@example.com";
    const isValid = validateEmail(email);
    expect(isValid).toBe(true);
  });

  it("should return false for an invalid email", () => {
    const email = "johndoexample.com";
    const isValid = validateEmail(email);
    expect(isValid).toBe(false);
  });
});
