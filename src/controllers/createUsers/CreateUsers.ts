import bcrypt from 'bcrypt';
import { Response } from 'express';
import prisma from '../../database/PrismaClient';
import { CreateUserRequest, validateEmail } from './types';

export class CreateUsers {
  async handle(req: CreateUserRequest, res: Response) {
    const { name, email, login, password } = req.body;

    if (!name || !email || !login || !password) {
      return res.status(400).json({ error: 'Os campos name, email, login e password são obrigatórios.' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Formato de e-mail inválido.' });
    }

    try {
      const existingUser = await prisma.users.findFirst({
        where: {
          OR: [
            { email },
            { login },
          ],
        },
      });

      if (existingUser) {
        return res.status(409).json({ error: 'Usuário já existe.' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await prisma.users.create({
        data: {
          name,
          email,
          login,
          password: hashedPassword,
        },
      });

      return res.status(200).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }
}
