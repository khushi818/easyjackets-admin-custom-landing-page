import express from "express";
import {
  encryptUser,
  forgotPasswordController,
  getAllOrdersController,
  getAllUsers,
  getOrdersController,
  loginController,
  orderStatusController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register || Method Post

router.post("/register", registerController);

//LOGIN || POST

router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

router.get("/encrypt", requireSignin, encryptUser);

router.get("/test", requireSignin, isAdmin, testController);

router.get("/allusers",  getAllUsers);
//Protected User route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin Route auth
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignin, updateProfileController);

router.get("/orders", requireSignin, getOrdersController);

//all orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);

export default router;
