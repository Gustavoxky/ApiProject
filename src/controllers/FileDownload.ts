import { Request, Response } from "express";
import path from 'path';
import prisma from "../database/PrismaClient";
import { File } from "../interfaces";

export class FileDownload {
  async download(req: Request, res: Response): Promise<Response<any, Record<string, any>> | void> {
    try {
      const { id } = req.params;

      const file: File | null = await prisma.file.findUnique({
        where: {
          id: id,
        },
      });

      if (!file) {
        return res.status(404).send('Imagem não encontrada.');
      }

      const filePath: string = path.join(__dirname, '..', '..', 'uploads', file.path);

      return res.status(200).download(filePath);
    } catch (error: any) {
      console.error('Erro ao fazer download do arquivo:', error);
      return res.status(500).send('Erro ao fazer download do arquivo.');
    }
  }
}
