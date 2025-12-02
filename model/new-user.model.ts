import mongoose, { models, Schema, Document } from "mongoose";

export interface UI_Products extends Document {
    product_name: string,
    category: [],
    createdAt: Date,
    updatedAt: Date
}

const Products_Schema = new Schema<UI_Products>({
    product_name: { type: String, required: true, trim: true, minLength: [2, "name must be shorter than 2 letters"], maxLength: [30, "name must not be longer than 30 letters"] },

    category: ["perishable", "durable", "tangable"],
}, {
    timestamps: true,
    versionKey: false
});


const Products = models.Products || mongoose.model<UI_Products>("Products", Products_Schema)

export default Products;