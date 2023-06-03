import { Request, Response } from "express";
import prisma from "../database/PrismaClient";

export class GetUsers {
  async handle(req: Request, res: Response) {
    const {name, email} = req.params
    const GetUsers = await prisma.users.findMany(
      {
        select: {
          name: true,
          email: true,
        }
      })
    return res.json(GetUsers)
  }
}