import { Request, Response } from "express";
import prisma from "../database/PrismaClient";

export class CreateUsers {
  async handle(req: Request, res: Response) {
    const {name, email, login, password} = req.body
    const users = await prisma.users.create({
      data: {
        name,
        email,
        login,
        password
      }
    })
    return res.json(users)
  }
}