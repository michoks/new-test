import mongoose, { models, Schema } from "mongoose";

const ImageSchema = new Schema({
    publicId: { type: String, required: true, unique: true },
    url: { type: String, required: true },
    formate: String,
    width: Number,
    height: Number,
}, { timestamps: true });

const Image = models.image || mongoose.model("image", ImageSchema);

export default Image;