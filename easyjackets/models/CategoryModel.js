import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    // unique: true,
  },
  image : { type : String },
  code : {
    type : String,
  },
  materials : [{ 
    type : mongoose.ObjectId,
    ref: 'material' 
  }],
  slug: {
    type: String,
    lowercase: true,
  },
});

export default mongoose.model("Category", categorySchema);
