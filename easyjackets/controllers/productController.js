import productModel from "../models/productModel.js";
import CategoryModel from "../models/CategoryModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import dotenv from "dotenv";
import orderModel from "../models/orderModel.js";
import  Design from "../models/design.js";
import randomString from 'randomstring'
import formidable from "formidable";
import uploadToS3 from "../helpers/fileUpload.js";
import addWatermark from "../helpers/watermark.js";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createDraftProduct = async (req,res) => {
  try {
     const createProduct = await productModel.create({category : req.params.cid , sku : randomString.generate({
      length : 7, 
      charset : ['alphanumeric', '-']
     })}) 
    
      return res.status(201).send({
        success: true,
        message: "Product Created Successfully",
        product : createProduct
      });
  }
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in crearing product",
    });
  }
}

export const createProductController = async (req, res) => {
  const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send('Error parsing the files.');
      }
  
     
      try {
        // Handle front image
       let data;
        if(files.frontImage || files.otherImages )
          {
          let frontImageUrl = ''
          if(files.frontImage){
           const buffer = await addWatermark(files.frontImage[0])
          const frontImageFile = files.frontImage[0];
          const url = await uploadToS3(frontImageFile , null ,buffer)
          frontImageUrl = `${process.env.AWS_FILE_PATH}${url}`;
          }
          // Handle additional images
          let additionalImageUrls = [];
          if(files.otherImages){
            
          const additionalImageFiles = [...files.otherImages] || [];
        
          for (const file of additionalImageFiles) {
            const buffer = await addWatermark(file)
            const url = await uploadToS3(file, null , buffer)
            additionalImageUrls.push(process.env.AWS_FILE_PATH + url);
          }
        }
         data = {
            name: fields.name[0],
            slug: slugify(fields.name[0]),
            description: fields.description[0],
            shortdescription: fields.shortdescription[0],
            metaTitle : fields.metaTitle[0],
            metaDescription:fields.metaDescription[0],
            sku : fields.name[0] + randomString.generate({
              length : 7, 
              charset : ['alphanumeric', '-']
             }),
              standardPrice: fields.standardPrice[0],
              discountPrice: fields.discountPrice[0],
              color: fields.color[0] || null,
              imageAlt: fields.imageAlt[0] ,
              category: fields.category[0],
              material: {
                  body :  JSON.parse(fields.material[0]).body,
                  sleeves : JSON.parse(fields.material[0]).sleeves  
              },
              sizes: [...JSON.parse(fields.sizes[0])]
          }
  
          if(frontImageUrl) {
          data.frontImage = frontImageUrl
          }
          if(additionalImageUrls?.length !== 0){
          data.otherImages = [...additionalImageUrls]
          }
        
        }
        else {
          data = {
            name: fields.name[0],
            slug: slugify(fields.name[0]),
            description: fields.description[0],
            shortdescription: fields.shortdescription[0],
            metaTitle : fields.metaTitle[0],
            metaDescription:fields.metaDescription[0],
            sku :  randomString.generate({
              length : 7, 
              charset : ['alphanumeric', '-']
             }),
              standardPrice: Number(fields.standardPrice[0]),
              discountPrice: Number(fields.discountPrice[0]),
              color: fields.color[0] || null,
              imageAlt: fields.imageAlt[0],
              category: fields.category[0],
              material: {
                  body :  JSON.parse(fields.material[0]).body,
                  sleeves : JSON.parse(fields.material[0]).sleeves  
              },
              sizes: [...JSON.parse(fields.sizes[0])]
          }
        }
        await productModel.create(data);
        

        return res.status(200).json({
           success : true,
           message : "product created successfully"
        });
      } catch (err) {
        console.log(err)
        res.status(500).send('Error uploading files to S3.');
      }
    });
};

//get all products
export const getProductController = async (req, res) => {
  try {
    const { page , limit , category , color , sku } = req.query

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (color) {
      filter.color = color;
    }

    if(sku) {
      filter.sku = sku
    }
    const products = await productModel.find(filter).skip(page ? (page - 1) * limit : 1).limit( limit ? limit : 8).populate('color').populate('category').sort({ createdAt : -1});
    const totalProducts = await productModel.countDocuments(filter);
    res.status(200).send({
      success: true,
      totalPages: Math.ceil(totalProducts / limit),
      products,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting products",
      error: error.message,
    });
  }
};

export const duplicateProduct = async (req, res) => {
   try {
       const { id } = req.params
       const product = await productModel
       .findOne({ _id: id })
       .select('-_id')
       .populate("category").populate('designId', '-_id')
         
        if(product.designId) {
           const newDesign = await Design.create({...product.designId.toObject(), _id : undefined})

          newDesign.new = true

         const newproduct = await productModel
         .findOne({ _id: id })
         .select('-_id -designId -createdAt')
       
         
         const duplicateproduct = await productModel.create({...newproduct.toObject() ,  _id : undefined , designId : newDesign._id})

       duplicateproduct.new = true

        }

        else{
        const newproduct = await productModel
        .findOne({ _id: id })
        .select('-_id -createdAt')
        
          
        const duplicateproduct = await productModel.create({...newproduct.toObject() ,  _id : undefined })
 
        duplicateproduct.new = true
        
        }
       return res.status(200).send({
        success: true,
        message: "duplicate product"
      });   
   } catch(error)  {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "duplicate single product",
      error,
    });  
   }
}
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.id })
      .populate("category")
      .populate("color")

    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    const { index } = req.params
    if (product.photo[index].data) {
      res.set("Content-type", product.photo[index].contentType);
      return res.status(200).send(product.photo[index].data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    const deleteProduct = await productModel.findOneAndDelete({_id : req.params.pid})

    if(deleteProduct?.designId){
    await Design.findOneAndDelete({ _id : deleteProduct.designId})
    }
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate products
export const updateProductController = async (req, res) => {
    const form = formidable({});
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).send('Error parsing the files.');
      }

      let data  = {}
      try {
        // Handle front image
        if(files.frontImage || files.otherImages )
        {
        let frontImageUrl = ''
        if(files.frontImage){
        const frontImageFile = files.frontImage[0];
        const buffer = await addWatermark(files.frontImage[0])
        const url = await uploadToS3(frontImageFile, null , buffer)
        frontImageUrl = `${process.env.AWS_FILE_PATH}${url}`;
        }
        // Handle additional images
        let additionalImageUrls = [];
        if(files.otherImages){
        const additionalImageFiles = [...files.otherImages] || [];
      
        for (const file of additionalImageFiles) {
          const buffer = await addWatermark(file)
          const url = await uploadToS3(file, null , buffer)
      
          additionalImageUrls.push(process.env.AWS_FILE_PATH + url);
        }
      }
         data = {
          name: fields.name[0],
          slug: slugify(fields.name[0]),
          description: fields.description[0],
          shortdescription: fields.shortdescription[0],
          metaTitle : fields.metaTitle[0],
          metaDescription:fields.metaDescription[0],
          sku : fields.name[0] + randomString.generate({
            length : 7, 
            charset : ['alphanumeric', '-']
           }),
            standardPrice: Number(fields.standardPrice[0]),
            discountPrice: Number(fields.discountPrice[0]),
            color: fields.color[0],
            imageAlt: fields.imageAlt[0],
            category: fields.category[0],
            material: {
                body :  JSON.parse(fields.material[0]).body,
                sleeves : JSON.parse(fields.material[0]).sleeves  
            },
            sizes: [...JSON.parse(fields.sizes[0])]
        }

        

        if(frontImageUrl) {
        data.frontImage = frontImageUrl
        }
        if(additionalImageUrls?.length !== 0){
        data.otherImages = [...additionalImageUrls]
        }
      }
      else{
        data = {
          name: fields.name[0],
          slug: slugify(fields.name[0]),
          description: fields.description[0],
          metaTitle :  fields.metaTitle[0],
          metaDescription:fields.metaDescription[0],
          shortdescription: fields.shortdescription[0],
          sku : fields.name[0] + randomString.generate({
            length : 7, 
            charset : ['alphanumeric', '-']
           }),
            standardPrice: Number(fields.standardPrice[0]),
            discountPrice: Number(fields.discountPrice[0]),
            color: fields.color[0],
            imageAlt: fields.imageAlt[0],
            category: fields.category[0],
            material: {
                body :  JSON.parse(fields.material[0]).body,
                sleeves : JSON.parse(fields.material[0]).sleeves  
            },
            sizes: [...JSON.parse(fields.sizes[0])]
        }
      }

    
  const products = await productModel.findByIdAndUpdate(
    req.params.pid,
    { ...data },
    { new: true }
  );

    return res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      products,
    });
  } 
  catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
    })};


export const activateAndDeactivateProduct = async (req,res) =>{
      try {
        const { isActive } = req.body
        const products = await productModel.findByIdAndUpdate(
          req.params.pid,
          {isActive},
          { new: true }
        )

        return res.status(201).send({
          success: true,
          message: "Product Updated Successfully",
         
        });
      }catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in Update product",
        });
      }
}

export const productFiltersController = async (req, res) => {
  try {
    const { page , limit , category , color , slug } = req.query

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (color) {
      filter.color = color;
    }

   
     if(slug) {
      let category;
      if(slug === 'ladies-Varsity-Jackets'){
        category = await CategoryModel.findOne({ code : 4893 })
      }
      else{
     category = await CategoryModel.findOne({slug})
      }
    filter.category = category?._id
     }

    const products = await productModel.find(filter).sort({ createdAt : -1}).skip(page ? (page - 1) * limit : 1).limit( limit ? limit : 8);

    const totalProducts = await productModel.countDocuments(filter);
    res.status(200).send({
      success: true,
      totalPages: Math.ceil(totalProducts / limit),
      products,
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};

// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const { isActive } = req.query
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({isActive})
      .populate("category").populate('designId')
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      products
    });
    
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Product API",
      error,
    });
  }
};

// similar products
export const realtedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error while geting related product",
      error,
    });
  }
};

// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
