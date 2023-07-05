import { NextFunction, Request, Response } from "express";
import Favourite from "../models/favourite";
import Song from "../models/song.model";
import { errorFunction } from "../utils/errorFunction";

const favouriteController = {
    addFavourite: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const check = await Favourite.find({ userId: req.body.userId });
            if (
                check.findIndex((e) => {
                    return e.songId === req.body.songId;
                })
            ) {
                res
                    .status(403)
                    .json(errorFunction(true, 403, "Đã có trong danh sách yêu thích"));
            } else {
                const data = await Favourite.create(req.body);
                res.json(errorFunction(false, 200, "Thêm thành công", data));
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    getByIdFavourite: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Favourite.find({ userId: req.params.id }).populate(
                "songId"
            );
            res.status(200).json(errorFunction(false, 200, "Lấy thành công", data));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    deleteFavourite: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await Favourite.findById(req.params.id);

            if (!id) return;
            res.status(404).json(errorFunction(true, 404, "Không tồn tại"));

            await Song.updateMany(
                { _id: id.songId },
                { $push: { favourite: id.userId } }
            )

            await Favourite.findByIdAndDelete(req.params.id);
            res.status(200).json(errorFunction(true, 200, "Xóa thành công"));
        } catch (error) {
            console.log("err", error);
            res.status(400).json({
                message: "Bad Request",
            });
        }
    },
};
