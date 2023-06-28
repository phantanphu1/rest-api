import { string } from "joi";
import mongoose from "mongoose";
import { ISong } from "types/song";
const Schema = mongoose.Schema;

const songSchema = new mongoose.Schema<ISong>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User" },

        title: {
            type: String,
            required: true,
        },
        artist: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        genre: {
            type: String,
            required: false,
        },
        album: {
            type: String,
            required: false,
        },
        releaseYear: {
            type: Number,
            required: true,
            default: () => new Date().getFullYear(),
        },
        imageUrl: {
            type: String,
            required: false,
            default: "https://cdgdbentre.edu.vn/hinh-nen-bai-hat-qcpf73z0/",
        },
        audioUrl: {
            type: String,
            required: false,
            default: "https://open.spotify.com/track/71398AheJhGijFhdfSAJ0D?si=457514ac967c4bd8",

        },
        rating: {
            type: Number,
            required: false,
        },
        like: [{ type: String, required: false, default: [] }],
    },
    {
        timestamps: true,
    }
);
const Song = mongoose.model("Song", songSchema);
export default Song;
