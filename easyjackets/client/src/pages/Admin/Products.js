import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link , Navigate, useNavigate } from "react-router-dom";
import AdminMenu from "./../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout.js";
import useCategory from "../../hooks/useCategory.js";
import { baseURL , Custom_jacket } from "../../constants/url.js";
const Products = () => {
  const [products, setProducts] = useState([]);
  const categories = useCategory()
  const navigate = useNavigate()
  //getall products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  const handleCreate = async (id, cid) => {
    try {
      const { data } = await axios.post(
        `/api/v1/product/create/${cid}`
      );
      if (!data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        window.location.href =`${Custom_jacket}?id=${id}&product=${data?.product._id}`;
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

   
  const activateProduct = async (isActive,id) => {
    try{
      await axios.put(
            `/api/v1/product/active/${id}`, { isActive }
          );
  
          if(isActive) {
               toast.success('product is active')           
          }
          else {
            toast.success('product is deactivated')  
          }
          getAllProducts();
        }
        catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
  }

  const handleDuplicateProduct = async (id) =>{
    try{
        const {data} =await axios.post(`/api/v1/product/duplicate-product/${id}`)

        if(data.success){
           toast.success("duplicated")
           getAllProducts()
        }
        }
        catch (error) {
          console.log(error);
          toast.error("something went wrong");
        }
  }
  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
        <div className="container-fluid p-3 mt-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-7">
        <div className="d-flex justify-content-between mb-4">
          <h4 className="text-left">Products List</h4>
          <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Create Product
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  {categories?.map((c) => (
                      <li key={c.slug}>
                        <div
                          className="dropdown-item custom-dropdown-item"
                          // to={`http://localhost:3001/?id=${c.code}`}
                          onClick={(e)=>{
                            e.stopPropagation()
                            handleCreate(c.code, c._id)
                          }
                          }
                        >
                          {c.name}
                        </div>
                      </li>
                    ))}
  </ul>
</div>
          </div>
          <div className="row">
            {products?.map((p, index) => (
              <div key={p._id} className="col-md-3 mb-3">
                {" "}
                {/* Each product takes 4 columns on medium screens */}
                
                  <div className="card" style={{ width: "100%" }}>
                    <img
                      src={`${baseURL}/api/v1/product/product-photo/${p._id}/${0}`}
                      className="card-img-top"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <p className="card-title"><strong>{p.name}</strong></p>
                      {/* <small className="card-text">{p.description}</small> */}
                      <div class="dropdown">
  <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
    Info
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li>
    <div className="dropdown-item custom-dropdown-item">
                       {!p.isActive ? <button className="btn btn-primary" onClick={()=>{
                        activateProduct(true,p._id)
                       }}>Publish</button> : <button className="btn btn-primary mx-1" 
                       onClick={()=> {
                        activateProduct(false,p._id)}}>Deactive</button>}
                        </div>
                        </li>
                        <li>
                        <div className="dropdown-item custom-dropdown-item">
                      <button className="btn btn-primary"><Link
                  to={`/dashboard/admin/product/${p._id}`}
                  className="product-link"
                >Edit</Link></button>
                </div>
                    </li>
                    <li>
                      <div className="dropdown-item custom-dropdown-item">
                     <button className="btn btn-primary" onClick={(e) =>{
                       e.stopPropagation() 
                      handleDuplicateProduct(p._id)
                     }}>Duplicate</button>
                     </div>
                     </li>
                
                </ul>
                </div>
                    </div>
                  </div>
              
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Products;
