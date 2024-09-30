import { Router } from "express";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { UserRoutes } from "../modules/Users/user.route";
import { RecipeRoutes } from "../modules/Recipes/recipes.route";
import { AdminRoutes } from "../modules/Admin/admin.routes";
 

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/recipe",
    route: RecipeRoutes,
  },
  {
    path: "/admin",
    route: AdminRoutes,
  },
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
