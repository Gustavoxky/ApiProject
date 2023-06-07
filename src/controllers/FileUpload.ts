import { Request, Response } from "express";
import prisma from "../database/PrismaClient";

export class FileUpload {
  async store(req: Request, res: Response) {
    const requestFiles = req.files as Express.Multer.File[];

    if (!requestFiles || requestFiles.length === 0) {
      return res.status(400).json({ error: "formato de arquivo não suportado." });
    }

    const files = requestFiles.map((file: Express.Multer.File) => {
      return {
        path: file.filename,
      };
    });

    const createdFiles = await Promise.all(
      files.map((file) => prisma.file.create({ data: file }))
    );

    return res.json({ files: createdFiles });
  }
}
