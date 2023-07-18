import mongoose, { Schema } from "mongoose";
import { IListeningRecord } from "../types/listeningRecord";
import { string } from "joi";
const listeningRecordSchema = new mongoose.Schema<IListeningRecord>(
    {
        userId: {
            type: Schema.Types.ObjectId, ref: "Users"
        },
        songId: {
            type: Schema.Types.ObjectId, ref: "Song"
        },
        duration: {
            type: String,
        },
        listenedAt: {
            type: Date,
            required: true,
            default: Date.now
        }

    },
    {
        timestamps: true,
    }
);
const ListeningRecord = mongoose.model(
    "listeningRecord",
    listeningRecordSchema
);
export default ListeningRecord;
