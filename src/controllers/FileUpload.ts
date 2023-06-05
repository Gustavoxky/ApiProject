import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class FileUpload {
  async store(req: Request, res: Response) {
    const { description } = req.body;
    const requestImages = req.files as Express.Multer.File[];

    const files = requestImages.map((File) => {
      return {
        path: File.filename,
      };
    });

    const post = await prisma.post.create({
      data: {
        description,
        files: {
          create: files,
        },
      },
      select: {
        description: true,
        files: true,
      },
    });

    return res.json(post);
  }
}