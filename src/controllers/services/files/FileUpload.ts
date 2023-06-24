import { Request, Response } from "express";
import prisma from "../../../database/PrismaClient";

interface ValidFile {
  path: string;
}

interface InvalidFile {
  error: string;
}

export class FileUpload {
  async store(req: Request, res: Response) {
    const requestFiles = req.files as Express.Multer.File[];

    if (!requestFiles || requestFiles.length === 0) {
      return res.status(400).json({ error: "formato de arquivo não suportado." });
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    const minSizeInBytes = 0.001 * 1024 * 1024;

    const validFiles: ValidFile[] = [];
    const invalidFiles: InvalidFile[] = [];

    for (const file of requestFiles) {
      if (file.size > maxSizeInBytes) {
        invalidFiles.push({
          error: `O arquivo ${file.filename} excede o tamanho máximo suportado.`,
        });
      }
      else if (file.size < minSizeInBytes) {
        invalidFiles.push({
          error: `O arquivo ${file.filename} excede o tamanho mínimo suportado.`,
        });
      }
      else {
        validFiles.push({
          path: file.filename,
        });
      }
    }

    const createdFiles = await Promise.all(
      validFiles.map((file) => prisma.file.create({ data: file }))
    );

    return res.json({ files: [...createdFiles, ...invalidFiles] });
  }
}
