import statisticController from "../controllers/statistic_controller";
import { Router } from "express";

export const statisticRouter = (router: Router) => {
    router.get("/statistic_listeningRecordFor1Week", statisticController.statisticSongFor1Week)

}