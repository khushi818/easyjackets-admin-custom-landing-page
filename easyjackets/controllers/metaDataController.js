import Metadata from '../models/metaData.js';

// Create Metadata
export const createMetadata = async (req, res) => {
  try {
    const metadata = new Metadata(req.body);
    await metadata.save();
    res.status(201).json({ success: true, message: 'Metadata created successfully', metadata });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating metadata', error: error.message });
  }
};

// Get All Metadata
export const getAllMetadata = async (req, res) => {
  try {
    const metadataList = await Metadata.find();
    res.status(200).json({ success: true, metadata: metadataList });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching metadata', error: error.message });
  }
};

// Get Metadata by Route
export const getMetadataByRoute = async (req, res) => {
  try {
    const metadata = await Metadata.findOne({ route: req.params.route });
   
    res.status(200).json({ success: true, metadata });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching metadata', error: error.message });
  }
};

// Update Metadata by Route
export const updateMetadata = async (req, res) => {
  try {
    const updatedMetadata = await Metadata.findOneAndUpdate(
      { route: req.params.route },
      req.body,
      { new: true }
    );
    if (!updatedMetadata) {
      return res.status(404).json({ success: false, message: 'Metadata not found' });
    }
    res.status(200).json({ success: true, message: 'Metadata updated successfully', metadata: updatedMetadata });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating metadata', error: error.message });
  }
};

// Delete Metadata by Route
export const deleteMetadata = async (req, res) => {
  try {
    const deletedMetadata = await Metadata.findOneAndDelete({ route: req.params.route });
    if (!deletedMetadata) {
      return res.status(404).json({ success: false, message: 'Metadata not found' });
    }
    res.status(200).json({ success: true, message: 'Metadata deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting metadata', error: error.message });
  }
};
