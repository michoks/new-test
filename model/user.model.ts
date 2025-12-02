import mongoose, { models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String, required: true, minLength: [2, "length is less than 3"],
        maxLength: [50, "length is greater than 50"], lowercase: true, trim: true
    },
    email: {
        type: String, required: true, unique: true, trim: true, lowercase: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
    }
}, { timestamps: true })

const User = models.User || mongoose.model("User", UserSchema);

export default User;