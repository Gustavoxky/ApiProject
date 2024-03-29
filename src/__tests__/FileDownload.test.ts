import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { FileDownload } from "../controllers/services/files/FileDownload";

jest.mock("../database/PrismaClient", () => ({
  file: {
    findUnique: jest.fn(),
  },
}));

describe("FileDownload", () => {
  let fileDownload: FileDownload;
  let req: Request;
  let res: Response;

  beforeEach(() => {
    fileDownload = new FileDownload();
    req = {
      params: {
        id: "exampleId",
      },
    } as unknown as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      download: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("download", () => {
    test("should send 404 if file is not found", async () => {
      (prisma.file.findUnique as jest.Mock).mockResolvedValue(null);

      await fileDownload.download(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("Imagem não encontrada.");
      expect(res.download).not.toHaveBeenCalled();
    });

    test("should download the file if file is found", async () => {
      const mockImage = {
        id: "exampleId",
        path: "examplePath",
      };
      (prisma.file.findUnique as jest.Mock).mockResolvedValue(mockImage);

      await fileDownload.download(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.download).toHaveBeenCalledWith(
        expect.stringContaining("uploads/examplePath")
      );
      expect(res.send).not.toHaveBeenCalled();
    });

    test("should send 500 if an error occurs", async () => {
      (prisma.file.findUnique as jest.Mock).mockRejectedValue(new Error());

      await fileDownload.download(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("Erro ao fazer download do arquivo.");
      expect(res.download).not.toHaveBeenCalled();
    });
  });
});
