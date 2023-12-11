import express from "express";
import { createUser, deleteUser, getAUser, getAllUser, updateUser } from "../controllers/user.controller.js";
import tokenVerify from "../middlewares/tokenVerify.js";

// initialize router
const router = express.Router();

// token verify middleware
router.use(tokenVerify);

router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getAUser).put(updateUser).delete(deleteUser);


export default router;