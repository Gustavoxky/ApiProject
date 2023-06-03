"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var Multer_1 = __importDefault(require("./config/Multer"));
var CreateUsers_1 = require("./controllers/CreateUsers");
var DeleteUsers_1 = require("./controllers/DeleteUsers");
var FileUpload_1 = require("./controllers/FileUpload");
var GetUsers_1 = require("./controllers/GetUsers");
var UpdateUsers_1 = require("./controllers/UpdateUsers");
var router = (0, express_1.Router)();
var createUsers = new CreateUsers_1.CreateUsers();
var getUsers = new GetUsers_1.GetUsers();
var deleteUsers = new DeleteUsers_1.DeleteUsers();
var updateUsers = new UpdateUsers_1.UpdateUsers();
var fileUpload = new FileUpload_1.FileUpload();
var upload = (0, multer_1.default)(Multer_1.default);
router.post("/users", createUsers.handle);
router.get("/users", getUsers.handle);
router.delete("/users/:name", deleteUsers.handle);
router.put("/users/:name", updateUsers.handle);
router.post('/images', upload.array('images'), fileUpload.store);
exports.default = router;
//# sourceMappingURL=routes.js.map