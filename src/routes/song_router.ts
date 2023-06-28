import songController from "../controllers/song_controller";
import { Router } from "express";
export const songRouter = (routes: Router) => {
    routes.post("/song/addSong", songController.addSong)

    routes.get("/song/getSongById/:id", songController.getSongById)

    routes.get("/song/getAll", songController.getAllSong)

    routes.put("/song/updateSong/:id", songController.updateSong)

    routes.delete("/song/deleteSong/:id", songController.deleteSong)
}