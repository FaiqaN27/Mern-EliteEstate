import express from "express";
import { handleTestApiRoute } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', handleTestApiRoute)

export default router;