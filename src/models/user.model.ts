import mongoose from "mongoose";
import bcrypt from "bcrypt"
import config from "config"
import { IUser } from "../types/user";
const userSchema = new mongoose.Schema<IUser>(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: true,
        },
        numberPhone: {
            type: String,
            required: false,
            unique: false,

        },
        address: {
            type: String,
            required: false,
            unique: false,

        },
        gender: {
            type: String,
            required: false,
            default: "nam",
        },
        avt: {
            type: String,
            default:
                "https://scarpa-us.com/wp-content/uploads/2020/05/cham-toi-ky-quan-tien-canh-trong-sieu-pham-avatar-.jpeg",
        }
    },
    {
        timestamps: true,
    }
)
const Users = mongoose.model("User", userSchema);
export default Users;