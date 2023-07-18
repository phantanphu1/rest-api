import { Response, Request, NextFunction } from "express";
import Playlist from "../models/playlist_model";
import { errorFunction } from "../utils/errorFunction";

const playlistController = {
    createPlaylist: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const check = await Playlist.findOne({ name: req.body.name });

            if (check) res.status(201).json(errorFunction(true, 201, "Đã tồn tại"));

            const data = await Playlist.create(req.body);
            res.status(200).json(errorFunction(true, 200, "Tạo thành công", data));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    getallPlaylist: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await Playlist.find();
            res.status(200).json(errorFunction(false, 200, "Lấy thành công ", data));
        } catch (error) {
            console.log("error", error);
            res.status(400).json({
                error: true,
                message: "Bad Request",
            });
        }
    },
    deletePlaylist: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = await Playlist.findById(req.params.id);
            if (!id) return;
            res.status(404).json(errorFunction(true, 404, "Không tồn tại"));

            await Playlist.findByIdAndRemove(req.params.id);
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
export default playlistController;
