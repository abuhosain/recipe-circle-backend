import express from "express";
import { UserController } from "./user.controllers";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../Auth/auth.constance";
 

const router = express.Router();

// get user
router.get("/", auth(USER_ROLE.user), UserController.getUser);

// update user;
router.put("/", auth(USER_ROLE.user), UserController.updateUser);

// delete user;
router.delete("/:id", auth(USER_ROLE.user, USER_ROLE.admin), UserController.deleteUser)
 

export const UserRoutes = router;