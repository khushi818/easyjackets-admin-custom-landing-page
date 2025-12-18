import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    slug: {
      type: String,
      required: true,
      unique : true
    },
    standardPrice: {
      type: Number,
      default : 0
    },
    discountPrice: {
      type: Number,
      default : 0
    },
    material : {
      body : {
       type : String
    },
    sleeves : {
       type : String
    }
  },
    color: {
      type: mongoose.ObjectId,
      ref: "color",
    },
    
    description: {
      type: String,
    
    },
    metaTitle :{
        type: String,
        default : ''
    },
    metaDescription : {
       type: String,
       default : ''
    },
    shortdescription: {
      type: String,
      
    },
    imageAlt: {
      type: String,
    },
    frontImage: {
      type: String, // File path or URL of the front image
  
    },
    otherImages: [
      {
        type: String, // File paths or URLs for additional images
        default : []
      },
    ],
    sizes: [
      {
        size: {
          type: String,
        
        },
        price: {
          type: Number,
        },
      },
    ],
    designId :{ 
       type : mongoose.ObjectId,
       ref :'design',
    },
    sku :{
       type : String
    },
    category: {
      type: mongoose.ObjectId,
      ref: "Category",

    },
   
    isActive : {
      type : Boolean,
      default : true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Products", productSchema);
