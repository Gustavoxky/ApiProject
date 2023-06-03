import { Request, Response } from "express";
import prisma from "../database/PrismaClient";

export class UpdateUsers {
  async handle(req: Request, res: Response) {
    // const { name } = req.params;
    const { name, email, login, password } = req.body;

    try {
      // Verificar se o usuário existe
      const existingUser = await prisma.users.findUnique({
        where: {
          name
        }
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      // Atualizar os dados do usuário
      const updatedUser = await prisma.users.update({
        where: {
          name
        },
        data: {
          name,
          email,
          login,
          password
        }
      });

      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário" });
    }
  }
}