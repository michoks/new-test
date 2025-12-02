import mongoose, { models, Schema } from "mongoose";

const PostSchema = new Schema({
    title: String,
    content: String,
    author: {
        user: {
            type: Schema.Types.ObjectId, ref: "User", required: true
        }
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }]
})


const Post = models.Post || mongoose.model("Post", PostSchema);

export default Post;