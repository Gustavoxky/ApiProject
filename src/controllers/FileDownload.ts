import { Request, Response } from "express";
import path from 'path';
import prisma from "../database/PrismaClient";

export class FileDownload {
  async download(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const image = await prisma.image.findUnique({
        where: {
          id: id,
        },
      });

      if (!image) {
        return res.status(404).send('Imagem não encontrada.');
      }

      const filePath = path.join(__dirname, '..', 'uploads', image.path);

      res.download(filePath);
    } catch (error) {
      console.error('Erro ao fazer download da imagem:', error);
      res.status(500).send('Erro ao fazer download da imagem.');
    }
  }
}
