import cors from "cors"; // Importe o pacote cors
import { Router } from "express";
import multer from "multer";
import uploadsConfig from './config/Multer';
import { DeleteFile } from "./controllers/services/files/DeleteFile";
import { FileDownload } from "./controllers/services/files/FileDownload";
import { FileUpload } from "./controllers/services/files/FileUpload";
import { GetFileUpload } from "./controllers/services/files/GetFileUpload";
import { CreateUsers } from "./controllers/services/users/CreateUsers";
import { DeleteUsers } from "./controllers/services/users/DeleteUsers";
import { GetGithubUsers } from "./controllers/services/users/GetGithubUsers";
import { GetUsers } from "./controllers/services/users/GetUsers";
import { UpdateUsers } from "./controllers/services/users/UpdateUsers";


const router = Router()

const createUsers = new CreateUsers()
const getUsers = new GetUsers()
const deleteUsers = new DeleteUsers()
const fileUpload = new FileUpload()
const getFileUpload = new GetFileUpload()
const getGithubUsers = new GetGithubUsers()
const fileDownload = new FileDownload()
const updateUsers = new UpdateUsers()
const deleteFile = new DeleteFile()

const upload = multer(uploadsConfig)

router.use(cors());

router.post("/create-user", createUsers.handle)
router.get("/users", getUsers.handle)
router.delete("/delete-user/:id", deleteUsers.handle)
router.put("/user/:id", updateUsers.handle)
router.get("/files", getFileUpload.handle);
router.get("/github-user/:username", getGithubUsers.handle);
router.post("/upload", upload.array("files"), fileUpload.store);
router.get("/files", getFileUpload.handle);
router.delete("/files/:id", deleteFile.handle);
router.get('/download/:id', fileDownload.download);

export default router