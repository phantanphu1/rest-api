import mongoose, { Schema } from "mongoose";
import { IFavourite } from "../types/favourite";

const favoriteSchema = new mongoose.Schema<IFavourite>(
    {
        userId: {
            type: String,
            required: true,
        },
        songId: {
            type: Schema.Types.ObjectId,
            ref: "Song",
        },
    },
    {
        timestamps: true,
    }
);
const Favourite = mongoose.model("Favourite", favoriteSchema)
export default Favourite
