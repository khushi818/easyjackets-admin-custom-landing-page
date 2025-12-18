import express from "express";
import {
  activateAndDeactivateProduct,
  brainTreePaymentController,
  braintreeTokenController,
  createDraftProduct,
  createProductController,
  deleteProductController,
  duplicateProduct,
  getProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFiltersController,
  productListController,
  productPhotoController,
  realtedProductController,
  searchProductController,
  updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//routes
router.post(
  "/create/:cid",
  requireSignin,
  isAdmin,
  createDraftProduct
);

router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  // formidable(),
  createProductController
);
//routes
router.put(
  "/update-product/:pid",
  requireSignin,
  isAdmin,
  // formidable({ multiple : true}),
  updateProductController
);

router.put(
  "/active/:pid",
  requireSignin,
  isAdmin,
  activateAndDeactivateProduct
);

//get products
router.get("/get-product", getProductController);

//single product
router.get("/get-product/:id", getSingleProductController);

router.post("/duplicate-product/:id" , duplicateProduct)
//get photo
router.get("/product-photo/:pid/:index", productPhotoController);

//delete rproduct
router.delete("/delete-product/:pid", deleteProductController);

router.get("/product-filters", productFiltersController );

router.get("/product-count", productCountController);

router.get("/product-list/:page", productListController);

router.get("/search/:keyword", searchProductController);

//similar product
router.get("/related-product/:pid/:cid", realtedProductController);

//category wise product
router.get("/product-category/:slug", productCategoryController);

router.get("/braintree/token", braintreeTokenController);

//payments
router.post("/braintree/payment", requireSignin, brainTreePaymentController);

export default router;
