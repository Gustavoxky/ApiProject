import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class FileUpload {
  async store(req: Request, res: Response) {
    const requestFiles = req.files as Express.Multer.File[];

    const files = requestFiles.map((file) => {
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
