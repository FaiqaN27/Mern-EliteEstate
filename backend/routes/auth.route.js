import express from "express";
import { handleUserSignup, handleUserSignin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin)

export default router;