import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { Users } from "../types";

export class DeleteUsers {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const user: Users | null = await prisma.users.findUnique({
        where: {
          id
        }
      });

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await prisma.users.delete({
        where: {
          id
        }
      });

      return res.status(200).json({ message: "Usuário excluído com sucesso" });
    } catch (error: any) {
      return res.status(500).json({ error: "Ocorreu um erro ao excluir o usuário" });
    }
  }
}