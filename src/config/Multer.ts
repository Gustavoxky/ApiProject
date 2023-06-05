import multer, { Options } from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const mimeType = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/jpg",
      "audio/mp3",
      "audio/wav",
      "audio/mpeg"
    ];

    if (!mimeType.includes(file.mimetype)) {
      return callback(null, false);
    }
    callback(null, true);
  }
} as Options;
