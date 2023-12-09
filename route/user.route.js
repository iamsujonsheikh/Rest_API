import express from "express";
import { createUser, deleteAUser, getAllUser, getSingleUser, updateAUser } from "../controllers/user.controller.js";

const router = express.Router();

// routing decleare.
router.route('/').get(getAllUser).post(createUser);
router.route('/:id').get(getSingleUser).delete(deleteAUser).put(updateAUser);

export default router;