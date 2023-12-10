import express from "express";
import { login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

// routing decleare.
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router;