import express from 'express';
import { login, Logout, register, updateProfile } from '../controller/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { upload } from '../middlewares/multer.middleware.js'; // Assuming multer is set up in this middleware

const router = express.Router();

// Use upload.single for single file upload
router.route("/register").post(upload.single('file'), register);
router.route("/login").post(login);
router.route("/logout").post(isAuthenticated, Logout);
router.route("/profile/update").post(isAuthenticated, upload.single('file'), updateProfile);

export default router;
