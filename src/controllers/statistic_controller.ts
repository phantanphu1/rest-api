import { NextFunction, Request, Response } from "express";
import ListeningRecord from "../models/listeningRecord.model";
import { errorFunction } from "../utils/errorFunction";

const statisticController = {
    statisticSongFor1Week: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - 7); // Lấy ngày 7 ngày trước
            startDate.setHours(0, 0, 0, 0); // Đặt giờ về 00:00:00

            const endDate = new Date(); // Lấy ngày hiện tại
            endDate.setHours(23, 59, 59, 999); // Đặt giờ về 23:59:59

            const result = await ListeningRecord.aggregate([
                {
                    $match: {
                        listenedAt: {
                            $gte: startDate,
                            $lte: endDate,
                        },
                    },
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$listenedAt" } },
                        count: { $sum: 1 },
                    },
                },
                {
                    $sort: { count: -1 },
                },
            ]);
            res.json(errorFunction(false, 200, "Lấy thành công", result));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
};
export default statisticController;
