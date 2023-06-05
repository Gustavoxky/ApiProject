import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { FileUpload } from "../controllers/FileUpload";

jest.mock("@prisma/client", () => {
  const createMock = jest.fn();
  const prismaClientMock = {
    post: {
      create: createMock,
    },
  };
  return {
    PrismaClient: jest.fn(() => prismaClientMock),
  };
});

describe("FileUpload", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve criar um novo post com os arquivos fornecidas", async () => {
    const fileUpload = new FileUpload();
    const req = {
      body: {
        description: "Descrição do post",
      },
      files: [
        {
          filename: "image.jpg",
        },
        {
          filename: "audio.mp3",
        },
      ],
    } as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    const createdPost = {
      description: "Descrição do post",
      files: [
        {
          path: "image.jpg",
        },
        {
          path: "audio.mp3",
        },
      ],
    };

    const prismaClientMock = new PrismaClient();
    (prismaClientMock.post.create as jest.Mock).mockResolvedValue(createdPost);

    await fileUpload.store(req, res);

    expect(prismaClientMock.post.create).toBeCalledWith({
      data: {
        description: "Descrição do post",
        files: {
          create: [
            {
              path: "image.jpg",
            },
            {
              path: "audio.mp3",
            },
          ],
        },
      },
      select: {
        description: true,
        files: true,
      },
    });
    expect(res.json).toBeCalledWith(createdPost);
  });
});
