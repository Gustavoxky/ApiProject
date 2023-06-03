import { Router } from "express";
import multer from "multer";
import uploadsConfig from './config/Multer';
import { CreateUsers } from "./controllers/CreateUsers";
import { DeleteUsers } from "./controllers/DeleteUsers";
import { FileUpload } from "./controllers/FileUpload";
import { GetUsers } from "./controllers/GetUsers";
import { UpdateUsers } from './controllers/UpdateUsers';

const router = Router()

const createUsers = new CreateUsers()
const getUsers = new GetUsers()
const deleteUsers = new DeleteUsers()
const updateUsers = new UpdateUsers()
const fileUpload = new FileUpload()

const upload = multer(uploadsConfig)

router.post("/users", createUsers.handle)
router.get("/", getUsers.handle)
router.delete("/users/:name", deleteUsers.handle)
router.put("/users/:name", updateUsers.handle)
router.post("/", upload.array("images"), fileUpload.store);
export default router