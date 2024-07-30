import express from 'express';

import { authToken } from '../middleware/authToken.js';
import {multer, storage} from "./../middleware/multerConfig.js"
import blogRoutes from './blogRoutes.js';
import { createProfile, deleteProfile, getProfile, updateProfile } from '../controllers/profileController.js';

const upload = multer({storage : storage})


const profileRoutes = express.Router()

blogRoutes.post('/createprofile', authToken, upload.single('image'), createProfile)
blogRoutes.get('/getprofile', authToken, getProfile)
blogRoutes.delete('/deleteprofile/:id', authToken, deleteProfile)
blogRoutes.put('/updateprofile', authToken, upload.single('image'), updateProfile)


export default profileRoutes;