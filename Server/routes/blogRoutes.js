import express from "express";

import { authToken } from "../middleware/authToken.js";
import { createBlog, deleteBlog, getBlog, publicBlog, updateBlog } from "../controllers/blogController.js";
import {multer, storage} from "./../middleware/multerConfig.js"
const upload = multer({storage : storage})



const blogRoutes = express.Router();

blogRoutes.post('/create',authToken, upload.single('image'), createBlog)
blogRoutes.get('/get',authToken, getBlog)
blogRoutes.get('/public',authToken, publicBlog)
blogRoutes.delete('/delete/:id',authToken, deleteBlog)
blogRoutes.put('/update',authToken,upload.single('image'), updateBlog)

export default blogRoutes;