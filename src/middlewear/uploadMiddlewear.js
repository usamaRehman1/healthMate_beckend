import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { ENV } from "../constant/index.js"

// Configure Cloudinary credentials
cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: ENV.CLOUDINARY_API_KEY,
    api_secret: ENV.CLOUDINARY_API_SECRET,
});

// Set up storage engine for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'health_mate_reports', // Folder name in your Cloudinary dashboard
        allowed_formats: ['jpg', 'jpeg', 'png', 'pdf'],
    },
});

const upload = multer({ storage: storage });

export {
    upload,
    cloudinary
}