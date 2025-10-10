import express from "express";
import { handleUserSignup, handleUserSignin, handleGoogleAuth, handleUserSignOut } from "../controllers/auth.controller.js";

const router = express.Router();

router.post('/signup', handleUserSignup);
router.post('/signin', handleUserSignin);
router.post("/google", handleGoogleAuth);
router.get('/signout', handleUserSignOut);

export default router;