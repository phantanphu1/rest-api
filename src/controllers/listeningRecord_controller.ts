import { errorFunction } from "../utils/errorFunction";
import ListeningRecord from "../models/listeningRecord.model";
import { NextFunction, Request, Response } from "express";

const listeningController = {
    recordListeningActivity: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const listeningRecord = (await ListeningRecord.create(req.body))
            const { duration } = listeningRecord
            res.json(errorFunction(true, 200, "Ghi thành công", {
                duration
            }));
        } catch (error) {
            console.error("Lỗi khi ghi lại hoạt động nghe bài hát:", error);
        }
    },
};
export default listeningController;
