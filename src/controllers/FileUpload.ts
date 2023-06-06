import { Request, Response } from "express";
import prisma from "../database/PrismaClient";


export class FileUpload {
  async store(req: Request, res: Response) {
    const requestFiles = req.files as Express.Multer.File[];

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
