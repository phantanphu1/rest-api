import { NextFunction, Request, Response } from "express";
import Song from "../models/song.model";
import { errorFunction } from "../utils/errorFunction";
import { ISong } from "../types/song";

const songController = {
    addSong: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Song.create(req.body);
            res.json(errorFunction(false, 200, "Thêm Bài Hát Thành Công", data));
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    getSongById: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const songId = await Song.findById<ISong>(req.params.id);
            if (!songId)
                return res
                    .status(404)
                    .json(errorFunction(true, 404, "Bài hát không tồn tại"));
            res.status(200).json(errorFunction(true, 200, "Lấy thành công"));
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    getAllSong: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { pageNumber, limit, songTitle } = req.query;
            const SkipNumber = (Number(pageNumber) - 1) * Number(limit);

            let query: any = {};

            // if (!pageNumber || !limit) {
            //     return res
            //         .status(400)
            //         .json(errorFunction(true, 400, "Truyền thiếu pageNumber và limit"));
            // }

            if (songTitle) {
                query.title = {
                    $regex: songTitle,
                    $option: "i",
                };
            }

            const allSong = await Song.find(query);

            const result = await Song.find(query)
                .skip(SkipNumber)
                .limit(Number(limit));

            let totalPage = 0;

            if (allSong.length % Number(limit) === 0) {
                totalPage = allSong.length / Number(limit);
            } else {
                totalPage = Math.floor(allSong.length / Number(limit) + 1);
            }

            res.json(
                errorFunction(false, 200, "Lấy thành công", {
                    totalPage: totalPage,
                    total: allSong.length,
                    data: result,
                })
            );
        } catch (error) {
            console.log(error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    updateSong: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const songId = await Song.findById(req.params.id);
            if (!songId)
                return res
                    .status(404)
                    .json(errorFunction(true, 404, "Không timg thấy bài hát"));
            await songId.updateOne({ $set: req.body });
            res
                .status(200)
                .json(errorFunction(true, 200, "Cập nhật bài hát thành công"));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    deleteSong: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await Song.findById(req.params.id);
            if (!id)
                return res
                    .status(404)
                    .json(errorFunction(true, 404, "Bài hát không tồn tại"));
            await Song.findByIdAndDelete(req.params.id);
            res.status(200).json(errorFunction(true, 200, "Xóa bài hát thành công"));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
};
export default songController;
