import express from "express";
import { AuthControllers } from "./auth.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "./auth.constance";

const router = express.Router();

// signup user
router.post("/signup", AuthControllers.singupUser);

// singin in login
router.post("/login", AuthControllers.loginUser);

router.post(
    '/change-password',
    auth( USER_ROLE.admin, USER_ROLE.user),
    AuthControllers.changePassword,
  );

router.post(
    '/refresh-token',
    AuthControllers.refreshToken,
  )

export const AuthRoutes = router;