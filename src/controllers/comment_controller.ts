import { NextFunction, Request, Response } from "express";
import Comment from "../models/comment.model";
import { errorFunction } from "../utils/errorFunction";

const commentController = {
    addComment: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await (
                await Comment.create(req.body)
            ).populate("userId", ["userName", "avt"]);
            res.json(errorFunction(false, 200, "Thêm thành công", data));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    getByIdComment: async (req: Request, res: Response) => {
        try {
            const data = await Comment.find({ userId: req.params.id }).populate(
                "userId",
                ["userName", "avt"]
            );
            res.status(200).json(errorFunction(true, 200, "Lấy thành công", data))
        } catch (error) {
            console.log("error", error);
            res.json({
                message: "Bad Request",
            });
        }
    },
    deleteComment: async (req: Request, res: Response) => {
        try {
            const id = await Comment.findById(req.params.id);
            if (!id)
                return res.status(404).json(errorFunction(true, 404, "Không tồn tại"));
            await Comment.findByIdAndDelete(req.params.id);
            res.status(200).json(errorFunction(true, 200, "Xóa thành công"));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
};
export default commentController;
