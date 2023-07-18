import { Router } from "express";
import userController from "../controllers/user_controller";
import { userValidation } from "../helpers/user";

export const userRouter = (router: Router) => {
  router.post("/user/register",userValidation,userController.register);
  router.post("/user/login", userController.login);
  router.get("/user/getAn/:id", userController.getAnUser);
  router.put("/user/update/:id", userController.updateUser);
  router.get("/user/getAll", userController.getAllUser);
  router.delete("/user/delete/:id", userController.deleteUser);

};
