import express from "express";
import { userRouter } from "./user_router";
import { songRouter } from "./song_router";
import { likeRouter } from "./like_router";
import { commentRouter } from "./comment_router";

const router = express.Router();
const routes = () => {

  userRouter(router);
  songRouter(router);
  likeRouter(router);
  commentRouter(router);
  return router;
};

export default routes;
