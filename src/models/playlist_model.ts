import mongoose, { Schema } from "mongoose";
import { IPlaylist } from "../types/playlist";
const playlistSchema = new mongoose.Schema<IPlaylist>(
    {
        userId: {
            type: Schema.Types.ObjectId, rè: "Users"
        },
        songId: {
            type: Schema.Types.ObjectId, ref: "Song"
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)
const Playlist = mongoose.model("Playlist", playlistSchema)
export default Playlist