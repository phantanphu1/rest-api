import likeController from "../controllers/like_controller";
import { Router } from "express";
export const likeRouter = (router: Router) => {
    router.post("/like-song/:id", likeController.likeSong)
    router.post("/dislike-song/:id", likeController.dislikeSong)
    router.post("/like-favourite/:id",likeController.likeFavorite)
    router.post("/dislike-favourite/:id",likeController.dislikeFavorite)

}