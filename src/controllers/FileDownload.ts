import { Request, Response } from "express";
import path from 'path';
import prisma from "../database/PrismaClient";

export class FileDownload {
  async download(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const file = await prisma.file.findUnique({
        where: {
          id: id,
        },
      });

      if (!file) {
        return res.status(404).send('Imagem não encontrada.');
      }

      const filePath = path.join(__dirname, '..', '..', 'uploads', file.path);

      res.status(200).download(filePath);
    } catch (error) {
      console.error('Erro ao fazer download da imagem:', error);
      res.status(500).send('Erro ao fazer download da imagem.');
    }
  }
}
