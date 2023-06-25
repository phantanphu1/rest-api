import express from "express";
import { userRouter } from "./user_router";

const router = express.Router();
const routes = () => {

  userRouter(router);
  return router;
};

export default routes;
