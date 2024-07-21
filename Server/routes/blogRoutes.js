import express from "express";

import { authToken } from "../middleware/authToken.js";
import { createBlog, deleteBlog, getBlog, updateBlog } from "../controllers/blogController.js";


const blogRoutes = express.Router();

blogRoutes.post('/create',authToken, createBlog)
blogRoutes.get('/get', getBlog)
blogRoutes.delete('/delete/:id',authToken, deleteBlog)
blogRoutes.put('/update',authToken, updateBlog)

export default blogRoutes;