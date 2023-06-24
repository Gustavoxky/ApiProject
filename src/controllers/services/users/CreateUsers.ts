import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from '../../../database/PrismaClient';
import { Users } from '../../../interfaces';
import { validateEmail } from '../../../utils/validateEmail';
import { validateFields } from '../../../utils/validateFields';

export class CreateUsers {
  async handle(req: Request, res: Response) {
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
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { email },
            { login: login || '' },
          ],
        },
      });

      if (existingUser) {
        return res.status(409).json({ error: 'Usuário já existe.' });
      }

      const saltRounds = 10;
      const hashedPassword = password ? await bcrypt.hash(password, saltRounds) : undefined;

      const user = await prisma.users.create({
        data: {
          name,
          email,
          login: login || '',
          password: hashedPassword || '',
        },
      });

      return res.status(200).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }
}