import { Request, Response } from "express";
import prisma from "../../../database/PrismaClient";
import { Users } from "../../../interfaces";
import { validateEmail } from "../../../utils/validateEmail";
import { validateFields } from "../../../utils/validateFields";


export class UpdateUsers {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email, login, password }: Users = req.body;

    const fieldsValid = validateFields(name, email, login, password);
    if (!fieldsValid) {
      return res.status(400).json({ error: 'Os campos name, email, login e password são obrigatórios.' });
    }

    const emailValid = validateEmail(email);
    if (!emailValid) {
      return res.status(400).json({ error: 'Formato de e-mail inválido.' });
    }

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
          name,
          email,
          login,
          password
        }
      });

      return res.status(200).json({ message: "Usuário atualizado com sucesso" });
    } catch (error: any) {
      console.error("Erro ao atualizar o usuário:", error);
      return res
        .status(500)
        .json({ error: "Ocorreu um erro ao atualizar o usuário" });
    }
  }
}
