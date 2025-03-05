import mongoose from "mongoose";
import 'mongoose-type-email';

const UserSchema = new mongoose.Schema(
    {
        email: {
            type: mongoose.SchemaTypes.Email,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;