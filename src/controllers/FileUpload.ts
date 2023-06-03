import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export class FileUpload {
  async store(req: Request, res: Response) {
    const { description } = req.body;
    const requestImages = req.files as Express.Multer.File[];

    const images = requestImages.map((Image) => {
      return {
        path: Image.filename,
      };
    });

    const post = await prisma.post.create({
      data: {
        description,
        images: {
          create: images,
        },
      },
      select: {
        description: true,
        images: true,
      },
    });

    return res.json(post);
  }
}