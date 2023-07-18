import listeningController from "../controllers/listeningRecord_controller";
import { Router } from "express";

export const listeningRecord=(router:Router)=>{
    router.post("/listeningRecord/song",listeningController.recordListeningActivity)
}