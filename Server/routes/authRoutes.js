import express from "express";

import { createBlog, deleteBlog, getBlog, loginUser, registerUser, updateBlog } from "../controllers/auth.js";

const authRoutes = express.Router();

authRoutes.post('/login', loginUser)
authRoutes.post('/register', registerUser)
authRoutes.post('/create', createBlog)
authRoutes.get('/get', getBlog)
authRoutes.delete('/delete/:id', deleteBlog)
authRoutes.put('/update', updateBlog)

export default authRoutes;