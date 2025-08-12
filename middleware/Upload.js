// upload.js

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
// import cloudinary from './Cloudinary.js';
import cloudinary from '../Cloud/Cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog-images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

export default upload;
