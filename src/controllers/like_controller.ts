import { Request, Response, NextFunction } from "express";
import Song from "../models/song.model";
import { errorFunction } from "../utils/errorFunction";

const likeController = {
    likeSong: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await Song.findById(req.params.id);

            if (!id)
                return res
                    .status(404)
                    .json(errorFunction(true, 404, "Không tồn tại"));

            const check = id.like?.find((e: string) => {
                return e === req.body.userId;
            });

            if (check) {
                res.status(200).json(errorFunction(true, 200, "Bạn đã like bài viết"));
            } else {
                await id.updateOne({ $push: { like: req.body.userId } });
                res.json(
                    errorFunction(false, 200, "đã like bài viết ", id.like?.length + 1)
                );
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "bad Request",
            });
        }
    },
    dislikeSong: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await Song.findById(req.params.id)
            if (!id)
                return res.status(404).json(errorFunction(true, 404, "Không tồn tại"))

            const check = id.like?.find((e: string) => {
                return e === req.body.userId
            })
            if (check) {
                await Song.updateOne(
                    { _id: req.params.id },
                    { $push: { like: req.body.userId } }
                )
                res.json(errorFunction(false, 200, "Đã unlike bài hát", id.like?.length - 1))
            } else {
                res.json(errorFunction(true, 200, "Bạn đã unlike bài viết"))
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            })

        }
    },
    likeFavorite: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await Song.findById(req.params.id)
            if (!id)
                return res
                    .status(404)
                    .json(errorFunction(true, 404, "Không tồn tại"))
            const check = id.like.find((e: string) => {
                return e === req.body.userId
            })
            if (check) {
                res.status(200).json(errorFunction(false, 200, "Bạn đã lưu yêu thích"))
            } else {
                await id.updateOne(
                    { $push: { like: req.body.userId } }
                )
                res.status(200).json(errorFunction(false, 200, "Bạn đã ưu thích", id.like?.length + 1))
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request"
            })

        }
    },
    dislikeFavorite: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await Song.findById(req.params.id)
            if (!id)
                res.status(404).json(errorFunction(true, 404, "Không tồn tại"))

            const check = id.like?.find((e: string) => { return e === req.body.userId }
            )
            if (check) {
                Song.updateOne(
                    { _id: req.params.id },
                    { $push: { like: req.body.userId } }
                )
                res.json(errorFunction(true, 200, "Bạn đã unlike yêu thích", id.like?.length - 1))
            } else {
                res.json(errorFunction(true, 200, "Bạn đã unlike ưu thích"))
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request"
            })


        }
    }
};
export default likeController;
