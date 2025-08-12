import dotenv from 'dotenv';
import express, { request, response } from "express";
const blog=express.Router();
import post from "../models/postSchema.js";
import upload from "../middleware/Upload.js";
import auth from "../middleware/auth.js";
import fs from 'fs';
// import post from "../models/postSchema.js";

dotenv.config();


blog.post('/blog/create', upload.single('image'), async(request, response)=>{
    try {
        console.log("request body:", request.body);
        console.log("uploaded file", request.file);
        if(
            !request.body.title||
            !request.body.content||
            !request.body.author
        ){
            return response.status(400).json({
                success:false,
                message: "send all required feild: "
            });
        };
            const newPost={
                title: request.body.title,
                content: request.body.content,
                author: request.body.author,
                image:request.file?.path || null
            };
            const posta=await post.create(newPost);
            return response.status(201).json({
                success:true, 
                message:"blog post created successfully",
                post:posta
            });
       

    } catch (error) {
        console.log("error creating blogpost", error);
        if(error.name==="validationError"){
            return response.status(400).json({
                success:false,
                message:"validation error",
                error:error.message
            });
        }
        return response.status(500).json({
            success:false,
        message:"internal server error",
        error:error.message
    });
    }

});



blog.get('/blog', async(request, response)=>{
    try {
        const page=parseInt(request.query.page)|| 1;
        const limit=10;
        const startIndex=(page-1)*limit;
        const totalpost=await post.countDocuments({});
        const posts=await post.find({})
        .sort({createdAt: -1})
        .skip(startIndex)
        .limit(limit);

        // const allpost=await post.find({}).sort({createdAt:-1});
        return response.status(200).json({
            count: totalpost,
            totalPages:Math.ceil(totalpost/limit),
            currentPage:page,
            // count:allpost.length,
            data:posts
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
});
blog.get('/blog/all', async(request, response)=>{
    try{
        const allpost=await post.find({}).sort({createdAt:-1});
        return response.status(200).json({
            count:allpost.length,
            data:allpost
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
})
blog.get('/blog/:id', async(request, response)=>{
    try {
        const {id}=request.params;
        const postbyid=await post.findById(id);
        return response.status(200).json(postbyid);
    } catch (error) {
            console.log(error);
            console.log(error.message);
            response.status(500).send({message:error.message});
        
    }
})


// blog.get('/blog/:title', async(request, response)=>{
//     try {
//         const title=request.params.title.trim();
      
//         const postByTitle=await post.findOne({title: title});

//         if (!postByTitle) {
//             return response.status(404).send({ message: "Post not found" });
//         }

//         return response.status(200).json(postByTitle);
//     } catch (error) {
//             console.log(error);
//             console.log(error.message);
//             response.status(500).send({message:error.message});
        
//     }
// })

blog.delete('/blog/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        // Check if the post exists
        const existingPost = await post.findById(id);
        if (!existingPost) {
            return response.status(404).json({ message: "Post not found" });
        }

        // Delete the post
        const result = await post.findByIdAndDelete(id);
        
        return response.status(200).send({ 
            message: "Post deleted successfully",
            deletedPost: result
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

blog.put('/blog/:id', async (request, response) => {
    try {
        const { id } = request.params;
        
        // Validate request body
        if (
            !request.body.title ||
            !request.body.content ||
            !request.body.author
        ) {
            return response.status(400).send({
                message: "Send all required fields: title, content, author"
            });
        }

        // Check if the post exists
        const existingPost = await post.findById(id);
        if (!existingPost) {
            return response.status(404).json({ message: "Post not found" });
        }

        // Update the post
        const updatedPost = await post.findByIdAndUpdate(id, request.body, { new: true });
        
        return response.status(200).send({
            message: "Post updated successfully",
            updatedPost: updatedPost
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
export default blog;
