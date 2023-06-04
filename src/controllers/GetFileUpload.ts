import { Request, Response } from "express";
import path from "path";
import prisma from "../database/PrismaClient";

export class GetFileUpload {
  async handle(req: Request, res: Response) {
    try {
      const images = await prisma.image.findMany();
      const imagePaths = images.map((image) => ({
        path: path.join(__dirname, "..", "..", "uploads", image.path),
      }));

      return res.json(imagePaths);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
