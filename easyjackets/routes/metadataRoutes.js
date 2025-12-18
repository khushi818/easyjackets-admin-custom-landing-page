// routes/metadataRoutes.js
import express from 'express';
import {
  createMetadata,
  getAllMetadata,
  getMetadataByRoute,
  updateMetadata,
  deleteMetadata
} from '../controllers/metaDataController.js';

const router = express.Router();

// Route to create metadata
router.post('/', createMetadata);

// Route to get all metadata
router.get('/', getAllMetadata);

// Route to get metadata by route
router.get('/:route', getMetadataByRoute);

// Route to update metadata by route
router.put('/:route', updateMetadata);

// Route to delete metadata by route
router.delete('/:route', deleteMetadata);

export default router;
