// models/Metadata.js
import mongoose from 'mongoose';

const metadataSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String},
  keywords: { type: String},
  route: { type: String, required: true, unique: true }, // Ensure each route has unique metadata
});

const Metadata = mongoose.model('Metadata', metadataSchema);
export default Metadata;
