import { Request, Response } from "express";
import prisma from "../database/PrismaClient";

export class DeleteUsers {
  async handle(req: Request, res: Response) {
    const { name } = req.params;

    try {
      const user = await prisma.users.findUnique({
        where: {
          name
        }
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await prisma.users.delete({
        where: {
          name
        }
      });

      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao excluir o usuário" });
    }
  }
}