// const cloudinary=require("cloudinary").V2;
import dotenv from 'dotenv';
import pkg from 'cloudinary';;
// import {v2 as cloudinary} from 'cloudinary';
// require("dotenv").config();

dotenv.config();
const {v2:cloudinary}=pkg;

cloudinary.config({
    
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
api_key:process.env.CLOUDINARY_API_KEY,
api_secret:process.env.CLOUDINARY_API_SECRET
});
// module.export=cloudinary;
console.log("✅ Cloudinary config loaded:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET ? '✅ loaded' : '❌ missing'
  });
  
export default cloudinary;