import { useEffect, lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/layout/Layout.js";
import PrivateRoute from "./components/Routes/Private.js";
import AdminRoute from "./components/Routes/AdminRoute.js";
import Loader from "./components/Loader"; // Create a fallback loader component for Suspense
import { ToastContainer } from "react-toastify";
import TermsAndConditions from "./pages/TermsCondition.js";
// import "react-toastify/dist/ReactToastify.css";

// Lazy-loaded components
const HomePage = lazy(() => import("./pages/HomePage.js"));
const About = lazy(() => import("./pages/About.js"));
const Contact = lazy(() => import("./pages/Contact.js"));
const Policy = lazy(() => import("./pages/Policy.js"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.js"));
const Register = lazy(() => import("./pages/Auth/Register.js"));
const Login = lazy(() => import("./pages/Auth/Login.js"));
const Dashboard = lazy(() => import("./pages/user/Dashboard.js"));
const ForgotPassword = lazy(() => import("./pages/Auth/ForgotPassword.js"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.js"));
const CreateCategory = lazy(() => import("./pages/Admin/CreateCategory.js"));
const CreateProduct = lazy(() => import("./pages/Admin/CreateProduct.js"));
const Users = lazy(() => import("./pages/Admin/Users.js"));
const Orders = lazy(() => import("./pages/user/Orders.js"));
const Profile = lazy(() => import("./pages/user/Profile.js"));
const Products = lazy(() => import("./pages/Admin/Products.js"));
const UpdateProduct = lazy(() => import("./pages/Admin/UpdateProduct.js"));
const Search = lazy(() => import("./pages/Search.js"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.js"));
const Categories = lazy(() => import("./pages/Categories.js"));
const CartPage = lazy(() => import("./pages/CartPage.js"));
const AdminOrders = lazy(() => import("./pages/Admin/AdminOrders"));
const OurWork = lazy(() => import("./pages/OurWork.js"));
const AllProducts = lazy(() => import("./pages/AllProducts.js"));
const ViewDetails = lazy(() => import("./pages/ViewDetails.js"));
const CheckoutForm = lazy(() => import("./pages/CheckoutForm.js"));
const PaymentCancel = lazy(() => import("./pages/PaymentCancel.js"));
const PaymentSucess = lazy(() => import("./pages/PaymentSucess.js"));
const Design = lazy(() => import("./pages/Design.js"));
const BulkOrders = lazy(() => import("./pages/BulkOrders.js"));
const VarcityJackets = lazy(() => import("./pages/VarcityJackets.js"));
const SizeChart = lazy(() => import("./pages/SizeChart.js"));
const Patches = lazy(() => import("./pages/Patches.js"));
const Faq = lazy(() => import("./pages/Faq.js"));
const Blogs = lazy(() => import("./pages/Blogs.js"));
const DesignCustomJacket = lazy(() =>
  import("./pages/DesignCustomJacket.js")
);

const OrderPage = lazy(() => import("./pages/Order.js"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.js"));
const ShippingDetails = lazy(() => import("./pages/ShippingDetails.js"));
const CategoryProducts = lazy(() =>import("./pages/CategoryProducts.js"));
const TermsCondition = lazy(() => import("./pages/TermsCondition.js"));

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <>
      <ScrollToTop />
      <ToastContainer />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/terms-condition" element={<TermsCondition />}/>
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/AllProducts" element={<AllProducts />} />
          <Route path="/Design/:id" element={<ViewDetails />} />
          <Route path="/checkout-form" element={<CheckoutForm />} />
          <Route path="/products/:slug" element={<CategoryProducts />} />
          <Route path="/success" element={<PaymentSucess />} />
          <Route path="/cancel" element={<PaymentCancel />} />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="user" element={<Dashboard />} />
            <Route path="user/orders" element={<Orders />} />
            <Route path="user/profile" element={<Profile />} />
          </Route>
          <Route path="/our-work" element={<OurWork />} />
          <Route path="/dashboard" element={<AdminRoute />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/create-category" element={<CreateCategory />} />
            <Route path="admin/create-product/:id" element={<CreateProduct />} />
            <Route path="admin/product/:slug" element={<UpdateProduct />} />
            <Route path="admin/products" element={<Products />} />
            <Route path="admin/users" element={<Users />} />
            <Route path="admin/orders" element={<AdminOrders />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/how-to-design-jacket" element={<Design />} />
          <Route path="/bulkorder" element={<BulkOrders />} />
          <Route path="/varsity" element={<VarcityJackets />} />
          <Route path="/sizechart" element={<SizeChart />} />
          <Route path="/varsity-jackets-patches-embroideries" element={<Patches />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/blog" element={<Blogs />} />
          <Route path="/checkout" element={<CheckoutForm />} />
          <Route path="/design-custom-jacket" element={<DesignCustomJacket />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/shipping" element={<ShippingDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
