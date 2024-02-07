import { Schema } from "mongoose";

export const ProductSchema = new Schema({
    name: {type:String,required:true},
    description: String,
    price: Number,
    image: String,
    created_at: { 
        type: Date, 
        default: Date.now 
    }
})