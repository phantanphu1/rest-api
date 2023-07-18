import playlistController from "../controllers/playlist_controller";
import { Router } from "express";

export const playlistRouter = (router: Router) => {
    router.post("/create/playlist", playlistController.createPlaylist)
    router.get("/getallPlaylist", playlistController.getallPlaylist)
    router.delete("/deletePlaylist/:id", playlistController.deletePlaylist)
}