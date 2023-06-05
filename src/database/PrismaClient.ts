import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default prisma

jest.mock("../database/PrismaClient", () => ({
  __esModule: true,
  default: {
    image: {
      findUnique: jest.fn(),
    },
  },
}));