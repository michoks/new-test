import mongoose, { models, Schema } from "mongoose";

const TagSchema = new Schema({
    name: String,
    posts: [{
        type: Schema.Types.ObjectId, ref: "Post"
    }]
})

const Tag = models.Tag || mongoose.model("Tag", TagSchema);

export default Tag;