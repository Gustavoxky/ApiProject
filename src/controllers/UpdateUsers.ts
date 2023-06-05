import { Request, Response } from "express";
import prisma from "../database/PrismaClient";

export class UpdateUsers {
  async handle(req: Request, res: Response) {
    const { id, name, email, login, password } = req.body;

    try {
      const existingUser = await prisma.users.findUnique({
        where: {
          id
        }
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const updatedUser = await prisma.users.update({
        where: {
          id
        },
        data: {
          id,
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