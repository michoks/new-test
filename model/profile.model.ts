import mongoose, { models, Schema } from "mongoose";

const ProfileSchema = new Schema({
    bios: String,
    avatar: String,
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

const Profile = models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;