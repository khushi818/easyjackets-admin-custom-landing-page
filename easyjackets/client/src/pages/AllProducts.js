import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import {
  AiOutlineReload,
  AiOutlineFilter,
  AiOutlineClose,
} from "react-icons/ai";
import { useNavigate, Link , useSearchParams} from "react-router-dom";
import axios from "axios";
import { baseURL } from "../constants/url";
import useCategory from "../hooks/useCategory";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "../context/Cart";
const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const categories = useCategory();
  const [colors, setColors] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useCart();
  const [metaData , setMetaData] = useState({})
  
  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/shop`)

    setMetaData(data?.metadata)
}

  const checkCart = (pid) => {
    const productexist =
      cart.filter((c) => c._id === pid).length === 0 ? false : true;
    return productexist;
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-filters/?category=${selectedCategory}&color=${selectedColor}&page=${currentPage}&limit=12`,
      );
      setProducts([...data?.products]);
      setTotalPages(data?.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getProperties = async () => {
    const { data } = await axios.get("/api/v1/custom/get-properties");
    setColors(data.colors);
  };

  useEffect(() => {
    handleFilter();
    getProperties();
    setCurrentPage(1)
  }, [selectedCategory, selectedColor]);

  useEffect(() =>{
       handleFilter()
  }, [currentPage])

  useEffect(()=>{
     getMetaTags()
  },[])
  
   
  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <div className="container-fluid">
        <div className="row main text-center">
          {/* Filter Toggle Button for Mobile */}
          <div className="col-12 d-md-none mb-3 text-end">
            <button
             style={ { margin : '10px'}}
              className="btn btn-primary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <AiOutlineFilter className="me-2"  />
              Filter
            </button>
          </div>

          {/* Sidebar */}
          <div
            className={`col-md-2 sidebar bg-light p-3 shadow ${
              showFilters ? "d-block" : "d-none d-md-block"
            }`}
          >
            <div className="d-flex justify-content-between mb-3">
              
              {/* Close Button for Mobile */}
        
            </div>
              <div style = {{ marginTop : '100px' }}>
            <AiOutlineClose
                className="d-md-none"
                style={{ cursor: "pointer" , padding: '5px' , fontSize : "32px" , fontWeight : '700' , borderRadius : '20px' , border : '1px solid black' , color : 'white' , background : 'black' , margin : '10px'}}
                onClick={() => setShowFilters(false)}
              />
            <h5 className="mb-4">Filter by Category</h5>
            <ul className="list-group">
              <li
                className="list-group-item list-group-item-action"
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory("")}
              >
                All
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedCategory(category._id)}
                >
                  {category?.name}
                </li>
              ))}
            </ul>

            <h5 className="mb-3 mt-4">Filter by Color</h5>
            <select
              className="form-select mb-4"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">All Colors</option>
              {colors.map((c, key) => (
                <option key={key} value={c?._id}>
                  {c?.name}
                </option>
              ))}
              {/* Add more colors as needed */}
            </select>
          </div>
          </div>

          {/* Products Section */}
          <div className="col-md-9 ">
            {loading ? (
              <Loader />
            ) : (
              <div className="row product-grid " style={{ marginTop : "50px"}}>
                {products.length !== 0 ? (
                  products?.map((p, key) => (
                    <div className="card p-2 product-card  " key={p?._id} style={{height :  '400px', width : '100%'}} >
                    {/* Image with hover icons */}
                    <div key={key} className="card-img-container">
                      <Link key={key} to={`/product/${p?.slug}`} >
                        <img src={p?.frontImage} className="card-img-top" alt={p?.imgAlt}
                          style={{ width : '100%' , height : 'auto'}}
                        />
                      </Link>
                      <div className="hover-icons">
                        <i
                          className="bi bi-cart3 add-to-cart-icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (checkCart(p?._id)) {
                              toast.error("Item Already exists");
                            } else{
                              const cartData = JSON.parse(sessionStorage.getItem("cart")) || [];

                              sessionStorage.setItem(
                                "cart",
                                JSON.stringify([
                                  ...cartData,
                                  {
                                    ...p,
                                    size: 'M',
                                    quantity: 1,
                                    price: (p?.standardPrice - (p?.discountPrice * p?.standardPrice / 100)).toFixed(2),
                                    custom: false,
                                  },
                                ])
                              );
                              setCart(JSON.parse(sessionStorage.getItem("cart")));
                              toast.success("Item Added to cart");
                            }
                          }
                        }
                        >
                          <FaCartArrowDown className="cart-icon" />
                        </i>

                      </div>
                    </div>
                    
                      {/* Product Title and Price */}
                      <div className="card-name-price" style= {{ padding : '10px'  ,  width :  '100%' , height : '100px' , textAlign: 'center'}}>
                        <h6 className="card-title" style={{ fontSize : '14px'}}>{p?.name.toUpperCase()}</h6>
                        <h6 className="card-title card-price">
                          <p style={{ fontWeight: 700 }}>${p?.discountPrice !== 0 ? (<s style={{ color: "red" }}>{p?.standardPrice}</s>) : ''}{"  "}{(p?.standardPrice - (p?.discountPrice * p?.standardPrice / 100)).toFixed(2)}</p>
                        </h6>
                    </div>
                  </div>
                  ))
                ) : (
                  <p style={{ margin: "0 auto", width: "100%" }}>
                    No product available
                  </p>
                )}
              </div>
            )}
              <div className="pagination" style ={{ display : 'flex' , justifyContent : 'space-between' , alignItems : 'center'  , marginLeft : '6rem' , marginTop : '20px'}}>
            <button 
              className="btn btn-primary" 
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="btn btn-primary"
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>          
          </div>

         
        </div>
       
      </div>
     
      {/* Styling Section */}
      <style jsx>{`
        .sidebar {
          border-radius: 10px;
          position: fixed;
          height: 100vh;
          top: 0;
          left: 0;
          overflow-y: auto;
          z-index: 1000;
        }

        .product-card {
          width: 250px; /* Ensure the card takes up the full width of its grid cell */
          max-width: 300px; /* Optional: Set a max-width if you want to limit the size */
          margin: auto; /* Center the card horizontally within its grid cell */
          border-radius: 15px;
          transition: transform 0.3s ease;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(280px, 1fr));
          gap: 1rem; /* Decreased gap between cards */
          justify-items: center;
        }

        .product-card img {
          width: 100%; /* Ensure the image fills the card width */
          height: auto; /* Maintain the aspect ratio */
          object-fit: contain; /* Ensure the image fits inside the container without distortion */
        }

        .card-body {
          padding: 1rem;
        }

        @media (max-width: 1020px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr); /* Single-column on mobile */
          }
          .sidebar {
            display: none;
          }
        }
   @media (max-width: 1440px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr); /* Single-column on mobile */
          }
          .sidebar {
            display: none;
          }
        }
         @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(1, 1fr); /* Single-column on mobile */
          }
          .sidebar {
            display: none;
          }
        }

        
        @media (min-width: 769px) {
          .sidebar {
            display: block;
            position: relative;
            height: auto;
          }
          .main {
            padding-right: 0px;
          }
                 
       .product-card {
 position: relative;
 transition: all 0.3s ease-in-out;
 border: 1px solid black;
}



.card-img-container {
 position: relative;
 overflow: hidden;
}

.card-img-container img {
 width: 100%;
 height: auto;
 transition: transform 0.3s ease;
}

.card-img-container:hover img {
 transform: scale(1.1); /* Zoom image on hover */
}

.hover-icons {
 position: absolute;
 top: 10px;
 right: 10px;
 display: flex;
 flex-direction: column;
 gap: 10px;
 opacity: 0;
 transition: opacity 0.3s ease;
}

.card-img-container:hover .hover-icons {
 opacity: 1;
}

.add-to-cart-icon,
.add-to-wishlist-icon {
 background: white;
 border-radius: 50%;
 padding: 10px;
 font-size: 1.2rem;
 color: #000;
 cursor: pointer;
}

.add-to-cart-icon:hover,
.add-to-wishlist-icon:hover {
 background: #000;
 color: #fff;
}

.card-name-price {
 
 justify-content: space-between;
 align-items: center;
}

.card-title {
 font-size: 1.1rem;
 font-weight: bold;
}



.card-price {
 color: #000;
}
 .product-card {
 border: 1px solid transparent; /* Space for the border */
 transition: border 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
 border-radius: 5px; /* Optional: rounded corners */
}

.product-card:hover {
 border: 2px solid black; /* Black border on hover */
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: shadow on hover */
}
.card.product-card:hover {
 border: 2px solid black; /* Ensure the selector is specific enough */
}
 .product-card {
 border: 1px solid transparent; /* Space for the border */
 transition: border 0.3s ease, box-shadow 0.3s ease; /* Smooth transition */
 border-radius: 5px; /* Optional: rounded corners */
}

.product-card:hover {
 border: 2px solid black; /* Black border on hover */
 box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: shadow on hover */
}

.card-img-container {
 overflow: hidden; /* Apply overflow hidden only here if necessary */
 border-radius: 5px; /* Optional: keep consistent with the card */
}




        }

      `}</style>
     
    </Layout>
  );
};

export default AllProducts;
