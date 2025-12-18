import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    transactionId : { type : String },
    orderId : { type : String },
    products: [{type : mongoose.ObjectId , ref : "design"}],
    totalAmount : { type : Number },
    totalItems : { type : Number }, 
    currency : { type : String },
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending" , "Processing", "Shipped", "delivered", "cancel"],
    },
    cartData : [{
      id : { type : mongoose.ObjectId , ref : 'Products'} ,
      designId : { type : mongoose.ObjectId , ref : 'designs'},
      name: { type : String },
      quantity: { type : Number },
      price: { type : Number } ,
    }],
    shipping_details : { type : Array },
    billing_Details : { type : Array }
  },
  { timestamps: true }
);

orderSchema.index({ 'buyer.name': 'text' });

export default mongoose.model("Order", orderSchema);
