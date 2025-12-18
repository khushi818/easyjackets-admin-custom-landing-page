import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/Cart";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Loader from '../components/Loader'
import { Custom_jacket } from "../constants/url";

//design details
const ViewDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading , setLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const getProduct = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`/api/v1/custom/getDesign/${params.id}`);
    
      setProduct(data.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
      e.preventDefault()
        await axios.post('/api/v1/custom/share',{
          name : formData.name,
          email: formData.email,
          design : product
        })

        setShowModal(false)
  };

  let search = window.location.search;
  let query = new URLSearchParams(search);
  useEffect(() => {
    getProduct();
  }, []);
 

  return (
    <Layout>
      {loading ?
      <Loader/> :  
      <div style = {{display : 'flex' , justifyContent : "center" , alignItems : "center" ,gap : '50px' , marginTop : '20px', flexDirection:'column'}}>
      <div className="col-md-12">
          <Carousel showStatus={false} showThumbs={false} autoPlay={true} infiniteLoop={true} interval={3000} >
          <div style={{ width : "12rem" , objectFit : 'contain' ,margin : '0 auto'}}>
            <img src={product?.custom_image} className="product-img" alt={"front custom"} />
          </div>
          <div style={{ width : "8rem" , objectFit : 'contain' ,margin : '0 auto'}}>
            <img src={product?.custom_image_right} className="product-img" alt={"right custom"} width ="20px"/>
          </div>
          <div style={{ width : "12rem" , objectFit : 'contain' , margin : '0 auto'}}>
            <img src={product?.custom_image_back} className="product-img" alt={"back custom"} width ="20px"/>
          </div>
          <div style={{ width : "8rem" , objectFit : 'contain' , margin : '0 auto'}}>
            <img src={product?.custom_image_left} className="product-img" alt={"left custom"} height = "20px"/>
          </div>
          </Carousel>
          <div style={{ textAlign : 'center'}}>
          <button
            className="btn btn-primary btn-lg m-4"
            onClick={handleShowModal}
          >
            Share
          </button>
          <button
            style={{
              marginTop: "5px",
              backgroundColor: "grey",
              color: "white",
            }}
            className="btn btn-lg my-4"
            onClick={(e=> {
              e.preventDefault()
              window.location.href = `${Custom_jacket}/?id=${product?.categoryCode}&designedit=${product?._id}`
            })}
          >
            Edit
          </button>
        </div>
        </div>
        <div className="col-md-6"  style={{ textAlign : 'center'}}>
        <div>
        <p className="mb-3"><strong>Materials:</strong> <br/>{`Body : ${product.materials?.body}`}<br/>{`Sleeves :${product.materials?.sleeves}`}</p>
        
        <p className="mb-3"><strong>Styles:</strong>

        <ul>
          <li><strong>Collar:</strong> {product.styles?.collar}</li>
          <li><strong>Sleeves:</strong> {product.styles?.sleeves}</li>
          <li><strong>Closure:</strong> {product.styles?.closure}</li>
          <li><strong>Pocket:</strong> {product.styles?.pocket}</li>
          <li><strong>Knit:</strong> {product.styles?.knit}</li>
          <li><strong>Lining:</strong> {product.styles?.lining}</li>
          <li><strong>Flap:</strong> {product.styles?.flap ? 'Yes' : 'No'}</li>
          <li><strong>Zipout:</strong> {product.styles?.zipout ? 'Yes' : 'No'}</li>
        </ul>   
        </p>
        </div>
        <div>
        <p className="mb-3"><strong>Colors:</strong>
        <ul className="color-preview-list">
          <li>
            <strong>Body:</strong> 
            <span className="color-preview" style={{ backgroundColor: product.colors?.body }}></span> {product.colors?.body}
          </li>
          <li>
            <strong>Sleeves:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.sleeves }}></span> {product.colors?.sleeves}
          </li>
          <li>
            <strong>Buttons:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.buttons || "#FFFFFF" }}></span> {product.colors?.buttons || "N/A"}
          </li>
          <li>
            <strong>Zip:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.zip }}></span> {product.colors?.zip}
          </li>
          <li>
            <strong>Pockets:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.pockets }}></span> {product.colors?.pockets}
          </li>
          <li>
            <strong>Lining:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.lining }}></span> {product.colors?.lining}
          </li>
          <li>
            <strong>Base:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.base }}></span> {product.colors?.base}
          </li>
          <li>
            <strong>Lines:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.lines || "#FFFFFF" }}></span> {product.colors?.lines || "N/A"}
          </li>
          <li>
            <strong>Border:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.border || "#FFFFFF" }}></span> {product.colors?.border || "N/A"}
          </li>
          <li>
            <strong>Inside:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.inside || "#FFFFFF" }}></span> {product.colors?.inside || "N/A"}
          </li>
          <li>
            <strong>Outside:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.outside || "#FFFFFF" }}></span> {product.colors?.outside || "N/A"}
          </li>
          <li>
            <strong>Stripes:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.stripes }}></span> {product.colors?.stripes}
          </li>
          <li>
            <strong>Piping:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.piping || "#FFFFFF" }}></span> {product.colors?.piping || "N/A"}
          </li>
          <li>
            <strong>Lace:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.lace || "#FFFFFF" }}></span> {product.colors?.lace || "N/A"}
          </li>
          <li>
            <strong>Band:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.band || "#FFFFFF" }}></span> {product.colors?.band || "N/A"}
          </li>
          <li>
            <strong>Inserts:</strong> <span className="color-preview" style={{ backgroundColor: product.colors?.inserts || "#FFFFFF" }}></span> {product.colors?.inserts || "N/A"}
          </li>
        </ul>
        </p>
        </div>
        <div>
        <p className="mb-3"><strong>Size:</strong> {product.sizes?.size} ({product.sizes?.scale})</p>
        <p className="mb-3"><strong>Price:</strong> ${product.custom_price}</p>

        {/* Display other relevant details */}
        <p className="mb-3"><strong>Advance Options:</strong></p>
        <ul>
          <li>Chest Pocket: {product.advance?.chestPocket ? 'Yes' : 'No'}</li>
          <li>Sleeve Pocket: {product.advance?.sleevePocket ? 'Yes' : 'No'}</li>
          <li>Stripes: {product.advance?.stripes ? 'Yes' : 'No'}</li>
          <li>Piping: {product.advance?.piping ? 'Yes' : 'No'}</li>
        </ul>

        <div className="container my-4" style={{  maxWidth : '300px'}}>
      <h2 className="mb-4">Designs Table</h2>
      <div className="table-responsive">
  <Table bordered striped hover>
    <thead className="thead-dark">
      <tr>
        <th>Section</th>
        <th>Done</th>
        <th>Title</th>
        <th>Size</th>
        <th>Font</th>
        <th>Fill Color</th>
        <th>Stroke Color</th>
        <th>Appearance</th>
      </tr>
    </thead>
    <tbody>
      {product && product?.designs && Object.keys(product?.designs).map((section) => (
        typeof product?.designs[section] === "object" && (
          <tr key={section}>
            <td>{section}</td>
            <td>{product?.designs[section].done ? "Yes" : "No"}</td>
            <td>{product?.designs[section]?.name?.title}</td>
            <td>{product?.designs[section]?.name?.size}</td>
            <td>{product?.designs[section]?.name?.font}</td>
            <td>
              <span
                className="d-inline-block"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: product?.designs[section]?.name?.fill,
                  borderRadius: '4px'
                }}
              />
              {" "} {product?.designs[section]?.name?.fill}
            </td>
            <td>
              <span
                className="d-inline-block"
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: product?.designs[section]?.name?.stroke,
                  borderRadius: '4px'
                }}
              />
              {" "} {product?.designs[section]?.name?.stroke}
            </td>
            <td>{product?.designs[section]?.name?.appearance || "None"}</td>
          </tr>
        )
      ))}
    </tbody>
  </Table>
</div>

    </div>
        </div>
        
          
           {showModal && (
            <div className="modal fade show d-block" tabIndex="-1" style={{ marginTop : "100px"}}>
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="modal-title">Share Custom Design</p>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {showModal && <div className="modal-backdrop fade show"></div>}
        </div> 

        
        <style jsx>{`
           .color-preview-list {
  list-style-type: none;
  padding: 0;
}
  ul li {
   list-style-type: none;
  }

.color-preview {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #000;
  margin-left: 8px;
}
        </>`}</style>
       </div>}
    </Layout>
   
  );
};

export default ViewDetails;
