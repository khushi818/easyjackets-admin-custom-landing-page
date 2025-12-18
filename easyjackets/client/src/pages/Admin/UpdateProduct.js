import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "./../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { baseURL, Custom_jacket} from "../../constants/url";
import Editor from 'react-simple-wysiwyg';
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [product, setProduct] = useState({})
  const [imgAlt, setImageAlt] = useState("")
  const [discountPer,setDiscountPer] = useState(0)

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
   
      setProduct(data.product)
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setDiscountPer(data.product.discountPer)
      setImageAlt(data.product.imgAlt)
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("imgAlt", imgAlt);
      productData.append("discountPer", discountPer);
      for (let i = 0; i < photo.length; i++) {
        productData.append(`photo${i}`, photo[i])
      }
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        // navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
              <div className="mb-3">
                {photo ? ( [...photo]?.reverse().map((p,key) => (
                  <div className="text-center ">
                    <img
                      src={URL.createObjectURL(p)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                  )))
                  : (
                  <div className="text-center">
                {
                   product?.photo?.map((p,key) => (
                    <img
                      src={`${baseURL}/api/v1/product/product-photo/${id}/${key}`}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                   
                   ))
                }
                  </div>
                )}
              </div>
                <label className="btn btn-outline-secondary col-md-12">
                  <input
                    type="file"
                    name="photo"
                    multiple
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files)}
                    hidden
                  />
                  {photo ? photo.name : "Upload Photo"}
                </label>
              </div>
             
              <div className="mb-3">
                <label>Name</label>
                <input
                  type="text"
                  value={name}
                  placeholder="write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <label>Description</label>
              <div className="mb-3">
                <Editor
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
                

              <div className="mb-3">
              <label>ImgAlt</label>
                <input
                  type="text"
                  value={imgAlt}
                  placeholder="write img alt"
                  className="form-control"
                  onChange={(e) => setImageAlt(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label>Discount percentage</label>
                <input
                  type="number"
                  value={discountPer}
                  placeholder="discount in percentage"
                  min= "0"
                  max="100"
                  className="form-control"
                  onChange={(e) => setDiscountPer(e.target.value)}
                />
              </div>
              <div className="mb-3">
              <label>Shipping</label>
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3 text-right" style= {{ border : "2px black solid" , padding :"20px" }}>
                  <img src={product?.designId?.custom_image} alt = "jacket_design" style={{ display : 'block' , marginBottom : "20px"}} />
                  <button className="btn" >
                    <a href ={ `${Custom_jacket}/?designedit=${product.designId?._id}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16">
  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
</svg>                
                   </a>
                  </button>               
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
