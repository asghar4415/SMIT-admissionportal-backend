import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fs from "fs"
import { promisify } from 'util';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
const unlinkAsync = promisify(fs.unlink);

export const UploadImage = async (req, res) => {
    const urls = [];
    console.log("files", req.files);
  
    if (!req.files.length) {
      return res.json({
        status: true,
        message: "No new image uploaded",
        data: null,
      });
    }
  
    try {
      for (const file of req.files) {
        console.log("------------", file);
        const path = file.path;
        if (!path) {
          return res.json({
            status: false,
            message: "No new image uploaded",
            data: null,
          });
        }
  
        if (fs.existsSync(path)) {
          const uploadResult = await cloudinary.uploader.upload(path);
          urls.push(uploadResult.secure_url);
          await unlinkAsync(path); 
        } else {
          console.log("File does not exist at path:", path);
        }
      }
  
      return res.json({
        status: true,
        message: "Images uploaded",
        data: urls,
      });

    } catch (error) {

      console.error("Error uploading images:", error);
      return res.status(500).json({
        status: false,
        message: "Internal server error",
        data: null,
      });

    }
};
