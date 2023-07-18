import { commentValidation } from "../helpers/comment";
import commentController from "../controllers/comment_controller";
import { Router } from "express";

export const commentRouter = (router: Router) => {
    router.post("/add/comment", commentValidation, commentController.addComment)
    router.get("/getById/comment/:id", commentController.getByIdComment)
    router.delete("/delete/comment/:id", commentController.deleteComment)
}