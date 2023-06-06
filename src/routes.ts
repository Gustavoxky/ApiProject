import { Router } from "express";
import multer from "multer";
import uploadsConfig from './config/Multer';
import { CreateUsers } from "./controllers/CreateUsers";
import { DeleteUsers } from "./controllers/DeleteUsers";
import { FileDownload } from "./controllers/FileDownload";
import { FileUpload } from "./controllers/FileUpload";
import { GetFileUpload } from "./controllers/GetFileUpload";
import { GetGithubUsers } from "./controllers/GetGithubUsers";
import { GetUsers } from "./controllers/GetUsers";
import { UpdateUsers } from './controllers/UpdateUsers';

const router = Router()

const createUsers = new CreateUsers()
const getUsers = new GetUsers()
const deleteUsers = new DeleteUsers()
const updateUsers = new UpdateUsers()
const fileUpload = new FileUpload()
const getFileUpload = new GetFileUpload()
const getGithubUsers = new GetGithubUsers()
const fileDownload = new FileDownload()

const upload = multer(uploadsConfig)

router.post("/create-user", createUsers.handle)
router.get("/users", getUsers.handle)
router.delete("/delete-user/:name", deleteUsers.handle)
router.put("/user/:name", updateUsers.handle)
router.post("/upload", upload.array("files"), fileUpload.store);
router.get("/files", getFileUpload.handle);
router.get("/github-user/:username", getGithubUsers.handle);
router.get('/download/:id', fileDownload.download);

export default router