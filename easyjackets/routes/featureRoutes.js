import express from 'express';
import { createOrUpdateFeatureController, getFeaturesController, getFeatureByNameController, updateWebsiteDetails, getWebsiteDetails, createBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, deleteBlogController, SubmitContact } from '../controllers/FeatureController.js';


const router = express.Router();

router.get('/website/details', getWebsiteDetails);
router.put('/website/details', updateWebsiteDetails);
// Route to create or update a feature
router.post('/blogs' , createBlogController)
router.get('/blogs' , getAllBlogsController)
router.get('/blogs/:id' , getBlogByIdController)
router.put('/blogs/:id' , updateBlogController)
router.delete('/blogs/:id' , deleteBlogController)

router.post('/', createOrUpdateFeatureController);
router.post('/contact' , SubmitContact)

// Route to get all features
router.get('/', getFeaturesController);

// Route to get a feature by name
router.get('/:name', getFeatureByNameController);






export default router;
