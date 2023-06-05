import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import prisma from '../database/PrismaClient';

export class CreateUsers {
  async handle(req: Request, res: Response) {
    const { name, email, login, password } = req.body;

    // Validar campos obrigatórios
    if (!name || !email || !login || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    // Validar formato de e-mail
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Formato de e-mail inválido.' });
    }

    try {
      // Verificar se o usuário já existe com o mesmo e-mail ou login
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

      // Criptografar a senha
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await prisma.users.create({
        data: {
          name,
          email,
          login,
          password: hashedPassword, // Usar o hash criptografado da senha
        },
      });

      return res.status(200).json(user);
    } catch (error) {
      // Tratar erros
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
  }
}

// Função para validar o formato de e-mail
export function validateEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
