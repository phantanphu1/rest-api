import commentController from "../controllers/comment_controller";
import { Router } from "express";

export const commentRouter = (router: Router) => {
    router.post("/add/comment", commentController.addComment)
    router.delete("/delete/comment/:id", commentController.deleteComment)
}