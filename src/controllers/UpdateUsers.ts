import { Request, Response } from "express";
import prisma from "../database/PrismaClient";
import { Users } from "../interfaces";

export class UpdateUsers {
  async handle(req: Request, res: Response) {
    const { id, name, email, login, password }: Users = req.body;

    try {
      const existingUser: Users | null = await prisma.users.findUnique({
        where: {
          id
        }
      });

      if (!existingUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const updatedUser: Users = await prisma.users.update({
        where: {
          id
        },
        data: {
          name,
          email,
          login,
          password
        }
      });

      return res.json(updatedUser);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: "Ocorreu um erro ao atualizar o usuário" });
    }
  }
}
