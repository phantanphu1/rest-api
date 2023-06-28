import express from "express";
import { userRouter } from "./user_router";
import { songRouter } from "./song_router";

const router = express.Router();
const routes = () => {

  userRouter(router);
  songRouter(router);
  return router;
};

export default routes;
