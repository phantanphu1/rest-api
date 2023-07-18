import { songValidation } from "../helpers/song";
import songController from "../controllers/song_controller";
import { Router } from "express";
export const songRouter = (router: Router) => {
    router.post("/song/addSong", songValidation, songController.addSong)

    router.get("/song/getSongById/:id", songController.getSongById)

    router.get("/song/getAll", songController.getAllSong)

    router.put("/song/updateSong/:id", songController.updateSong)

    router.delete("/song/deleteSong/:id", songController.deleteSong)
}