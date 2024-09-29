import express from "express";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

// signup user
router.post("/signup", AuthControllers.singupUser);

// singin in login

router.post("/login", AuthControllers.loginUser)

export const AuthRoutes = router;