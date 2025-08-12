// import { type } from "express/lib/response";
import mongoose from "mongoose";

const postmodel=new mongoose.Schema({
    title:{
        type: String,
        required:true,
        trim: true
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: String, 
        required: true
    },
    image: { 
        type: String, 
        default: "" 
    },

    createdAt:{
        type:Date,
        default:Date.now

    }

})
const post=mongoose.model('post', postmodel);
export default post;