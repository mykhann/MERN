import express from "express";
import { getComanyById, getCompany, registerCompany, updateCompany } from "../controller/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {upload} from "../middlewares/multer.middleware.js"
const router= express.Router();



router.route("/register").post(isAuthenticated,registerCompany)
router.route("/get/:id").get(isAuthenticated,getComanyById)
router.route("/update/:id").put(upload.single("file"), isAuthenticated,updateCompany)
router.route("/get").get(isAuthenticated,getCompany)

export default router