import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { errorFunction } from "../utils/errorFunction";
import { ISong } from "../types/song";

const validation = joi.object<ISong>({
    userId: joi.string().required(),
    title: joi.string().required().min(5).max(50),
    artist: joi.string().required().email(),
    duration: joi.string().min(6).max(20).required(),
    genre: joi.string(),
    album: joi.string(),
    releaseYear: joi.string(),
    imageUrl: joi.string(),
    audioUrl: joi.string(),
    rating: joi.number().min(1).max(5),
    like: joi.string()
});

export const userValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { error } = validation.validate(req.body);
    if (error) {
        res.status(406);
        return res.json(
            errorFunction(true, 406, `Error in data: ${error.message}`)
        );
    } else {
        next();
    }
};
