"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
exports.default = {
    storage: multer_1.default.diskStorage({
        destination: path_1.default.join(__dirname, "..", "..", "uploads"),
        filename: function (req, file, callBack) {
            callBack(null, "".concat(Date.now(), "-").concat(file.originalname));
        },
    }),
    limits: {
        fileMaxSize: 5 * 1024 / 1024,
    },
    fileFilter: function (req, file, cd) {
        var mimeType = ['image/jpg', 'image/png', 'image/gif', 'image/jpeg'];
        if (!mimeType.includes(file.mimetype)) {
            return cd(null, false);
        }
        cd(null, true);
    }
};
//# sourceMappingURL=Multer.js.map