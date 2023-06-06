import { Request, Response } from "express";
import { FileUpload } from "../controllers/FileUpload";

describe("FileUpload", () => {
  it("Deve realizar o upload de arquivos corretamente", async () => {
    const fileUpload = new FileUpload();
    const req = {
      files: [
        {
          filename: "image.jpg",
        },
        {
          filename: "audio.mp3",
        },
      ],
    } as Request;
    const res = {
      json: jest.fn(),
    } as unknown as Response;

    await fileUpload.store(req, res);

    expect(res.json).toHaveBeenCalledWith({ files: [
      { path: "image.jpg" },
      { path: "audio.mp3" },
    ]});
  });
});