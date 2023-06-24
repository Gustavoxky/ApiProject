import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import prisma from "../../../database/PrismaClient";

export class DeleteFile {
  async handle(req: Request, res: Response) {
    try {
      const fileId = req.params.id;

      // Recupere o caminho do arquivo do banco de dados ou de qualquer outra fonte
      const file = await prisma.file.findUnique({
        where: { id: fileId },
      });

      if (!file) {
        return res.status(404).json({ error: "Arquivo não encontrado" });
      }

      const filePath = path.join(__dirname, "..", "..", "uploads", file.path);

      // Verifique se o arquivo existe antes de excluí-lo
      if (fs.existsSync(filePath)) {
        // Exclua o arquivo utilizando o método fs.unlink
        fs.unlinkSync(filePath);
      }

      // Remova o registro do arquivo do banco de dados ou de qualquer outra fonte
      await prisma.file.delete({ where: { id: fileId } });

      return res.json({ message: "Arquivo excluído com sucesso" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}
