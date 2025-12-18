import React, { useState, useEffect } from "react";
import { useNavigate, Link, Navigate, NavLink } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useCart } from "../context/Cart";
import "../styles/Homepage.css";
import PhotoGal1 from "../../src/pages/images/PhotoGal1.png";
import PhotoGal2 from "../../src/pages/images/PhotoGal2.png";
import Quality from "../../src/pages/images/quality.png";
import varsity from "../../src/pages/images/varsity-jacket .png";
import CartImage from "../../src/pages/images/cart-fill.svg";
import ReadyToShip from "../../src/pages/images/readytoship.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';
import Loader from "../components/Loader";
import { Revel } from "../components/Animation/Revel";
import { FaCartArrowDown } from "react-icons/fa";
import toast from "react-hot-toast";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [metaData , setMetaData] = useState({})
  const [features , setFeatures] = useState({})


  
  const handleSlideChange = (index) => {
    setActiveIndex(index);
  };
  const checkCart = (pid) => {
    const productexist =
      cart.filter((c) => c._id === pid).length === 0 ? false : true;
    return productexist;
  };
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    // getTotal();
  }, []); 
  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-filters?page=1&limit=8`);
      setProducts(data?.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getMetaTags = async() =>{
       const { data } = await axios.get(`/api/v1/metadata/homepage`)

       setMetaData(data?.metadata)
  }

  const getFeatures = async() =>{
      const { data } = await axios.get('/api/v1/features')

      setFeatures(data?.features[0])
   }

  // filter by cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);

  };

  

  useEffect(() => {
    getAllProducts();
    getMetaTags()
    getFeatures()
  }, []);


  return (
    <div>
      {loading ?
        <Loader /> :
        <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
          <Revel>
            <Carousel
              autoPlay={true}
              infiniteLoop={true}
              interval={3000}
              showStatus={false}
              showThumbs={false}
              transitionTime={800}
              stopOnHover={true}
              dynamicHeight={true}
              swipeable={true}
              emulateTouch={true}
              useKeyboardArrows={true}
              onChange={handleSlideChange}
            >
              { features && features?.banner && features?.banner.length !== 0 && features.banner.map((banner, index) =>(
                    <div className="carousel-image" >
                    <div class="responsive-image-wrapper">
  { index !== 0 ? (<img
    class="responsive-image"
    loading="lazy"
    src={banner}
    alt="First slide"
    width="1920"
    height="1080"
  />)  : <img
  class="responsive-image"
  fetchpriority="high"
  src={banner}
  alt="First slide"
  width="1920"
  height="1080"
/> }
</div>
                  </div>
              ))}
            </Carousel>
          </Revel>
          <div
            className="container-fluid d-flex flex-column justify-content-center align-items-center min-vh-100 home-page"
            style={{ overflowX: "hidden" }}
          >


            {/* section 1/2 */}
            <div className="d-flex flex-lg-row flex-column justify-content-center w-100 align-items-center container-fluid" style={{ marginBottom: "3rem" }}>
              <Revel>
                <div className="text-center border inline-block w-100" onClick={() => navigate("/design-custom-jacket")} style={{ flexBasis: '20%', padding: '20px', cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                  </svg>
                  <h6>Customize</h6>
                  <p>Fully Customise the jacket</p>
                </div>
              </Revel>
              <Revel>
                <div className="text-center border inline-block w-100" onClick={() => navigate("/bulkorder")} style={{ flexBasis: '20%', padding: '20px', cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stack" viewBox="0 0 16 16">
                    <path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z" />
                    <path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z" />
                  </svg>

                  <h6>Bulk Orders</h6>
                  <p>We also cater Bulk orders</p>
                </div>
              </Revel>

              <Revel>
                <div className="text-center border inline-block w-100" onClick={() => navigate("/allproducts")} style={{ flexBasis: '20%', padding: '20px', cursor: "pointer" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock-history" viewBox="0 0 16 16">
                    <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                    <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                    <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                  </svg>
                  <h6>Just arrived</h6>
                  <p>Check out latest item</p>
                </div>
              </Revel>
            </div>

            {/* section3 */}
            <div className="container-fluid">
              <div className="d-flex flex-lg-row flex-column align-items-center ">
                <div className="col-12 col-md-6 d-flex justify-content-center text-center">
                  <div className="image-container position-relative">
                    <Revel>
                      <img
                        src={varsity}
                        alt="banner"
                        className="main-image img-fluid"
                        style={{ maxWidth: "80%" }} // Adjust the max-width as needed
                      />
                    </Revel>
                    <Revel>
                      <img
                        src={CartImage}
                        alt="small"
                        className="small-image position-absolute"
                        style={{ top: "20px", right: "90px", width: "4%" }} // Adjust width and positioning as needed
                        onMouseEnter={() => setShowInfo(true)}
                        onMouseLeave={() => setShowInfo(false)}
                      />
                    </Revel>
                    {showInfo && (
                      <div
                        className="info-box position-absolute"
                        style={{ top: "50px", right: "20px" }}
                      >
                        {" "}
                        {/* Adjust positioning as needed */}
                        <p
                          style={{
                            fontWeight: "700",
                          }}
                        >
                          BLACK VARSITY JACKET
                        </p>
                        <ul>
                          <p>Varsity Jackets |</p>
                          <p>Wool & Leather Varsity Jackets</p>
                          <p
                            style={{
                              marginBottom: 0,
                              fontWeight: "700",
                              fontSize: "larger",
                            }}
                          >
                            From $80.00
                          </p>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-12 col-md-6 mt-4 mt-md-0 text-center">
                  <Revel>
                    <p className="text-uppercase">Classic Style Meets Durability</p>

                    <h1 style={{ fontSize: '36px' }}>
                      The Wool and Leather Varsity Jacket
                    </h1>
                    <p className="text-center mt-4">
                      Embrace timeless elegance and rugged quality with our Wool and
                      Leather varsity jacket. Crafted from premium materials, this
                      jacket combines the warmth of wool with the durability of
                      leather. Stay stylish in any season, whether you're heading to
                      the game or out for a night on the town. A perfect blend of
                      comfort, style, and versatility, this jacket is a must-have for
                      fashion-forward individuals.
                    </p>
                  </Revel>
                </div>
              </div>
            </div>
            {/*section4*/}
            <div className="container-fluid">
              <div className="d-flex flex-lg-row flex-column-reverse align-items-center">
                <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
                  <Revel>
                    <p className="text-uppercase">Customized Varsity Jackets</p>
                    <h1>Wear Your Style With Pride!</h1>
                    <p className="mx-4 m-4">
                      Design your own unique varsity jacket and stand out from the
                      crowd. Our customization options allow you to showcase your
                      personal style and make a statement. From choosing the colors
                      and materials to adding patches, embroidery, and personalized
                      lettering, we'll bring your vision to life. Whether you're
                      representing your school, team, or personal brand, our custom
                      varsity jackets are the perfect canvas for self-expression. Wear
                      your style with pride and create a jacket that's truly
                      one-of-a-kind. Start designing your custom varsity jacket today!
                    </p>
                  </Revel>
                  <Revel>
                    <button
                      className="btn btn-outline-dark mt-3"
                      style={{ fontWeight: 700 }}
                      onClick={() => navigate(`/design-custom-jacket`)}
                    >
                      Customize Your Jacket
                    </button>
                  </Revel>
                </div>

                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <Revel>
                    <Link to="/AllProducts">

                      <img
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.3s ease",
                          margin: "10px",
                          border: "1px solid #ddd",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                          maxWidth: "100%", // Make sure image scales with its container
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        src={ReadyToShip}
                        className="img-fluid"
                        alt="banner"
                      />
                    </Link>
                  </Revel>
                </div>

              </div>
            </div>
            {/* section4 */}
            <div
              className="parent-container"
              style={{
                width: "100%",
              }}
            >
              <Revel>
                <div
                  className="banner-container d-flex justify-content-center align-items-center"
                  style={{
                    width: "70%",
                    paddingLeft: "30%",
                    alignItems: "center",
                  }}
                >

                  <img
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      margin: "10px",
                      border: "1px solid #ddd",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    src={PhotoGal1}
                    className="banner-img img-fluid"
                    alt="banner"
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    onClick={() => navigate(`/our-work`)}
                  />
                  <img
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      margin: "10px",
                      border: "1px solid #ddd",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    src={PhotoGal2}
                    onClick={() => navigate(`/bulkorder`)}
                    className="banner-img img-fluid"
                    alt="banner"
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              </Revel>
            </div>
            {/* section5 */}
            <Revel>
              <div
                className="parent-container"
                style={{
                  width: "100%",
                }}
              >
                <div
                  className="banner-container d-flex justify-content-center align-items-center"
                  style={{
                    width: "100%",
                  }}
                >
                  <img
                    style={{
                      transition: "transform 0.3s ease",
                      margin: "10px",
                      border: "1px solid #ddd",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                    src={Quality}
                    className="banner-img img-fluid"
                    alt="banner"
                  // onMouseOver={(e) =>
                  //   (e.currentTarget.style.transform = "scale(1.05)")
                  // }
                  // onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  // onClick={() => navigate(`/our-work`)}
                  />
                </div>

              </div>
            </Revel>

            <div className="w-100 product-styling "  >
              {products?.map((p, key) => (
                <Revel>
                    <div className="card m-2 product-card py-2 " key={p?._id} style={{}}>
                    {/* Image with hover icons */}
                    <div key={key} className="card-img-container">
                      <Link key={key} to={`/product/${p?.slug}`} >
                        <img src={p?.frontImage} className="card-img-top" alt={p?.imgAlt}
                          onMouseEnter={(e) => {
                            e.stopPropagation()
                            if(p?.otherImages?.length > 2){
                            e.currentTarget.src = `${p?.otherImages[0]}`
                            }
                          }}
                          onMouseOut={(e) => {
                            e.stopPropagation()
                            if(p?.otherImages?.length > 2){
                            e.currentTarget.src = `${p?.frontImage}`
                            }
                          }}
                        />
                      </Link>
                      <div className="hover-icons">
                        <i
                          className="bi bi-cart3 add-to-cart-icon"
                          onClick={() => {
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
                    <div className="card-body">
                      {/* Product Title and Price */}
                      <div className="card-name-price">
                        <h5 className="card-title" style={{ cursor : 'pointer'}} onClick={(e) =>{
                          e.stopPropagation()
                          navigate(`/product/${p?.slug}`)
                        }}>{p?.name.toUpperCase()}</h5>
                        <h5 className="card-title card-price" style={{textAlign:'center'}}>
                          <p style={{ fontWeight: 700 }}>${p?.discountPrice !== 0  ? (<s style={{ color: "red" }}>{p?.standardPrice}</s>) : ''}{"  "}{(p?.standardPrice - (p?.discountPrice * p?.standardPrice / 100)).toFixed(2)}</p>
                        </h5>
                      </div>

                    </div>
                  </div>
                </Revel>

              ))}

            </div>



            {/* section 6 Blogs */}
              {/* <div className="d-flex flex-column justify-content-center w-100 align-items-center container-fluid mt-4" style={{ padding: '20px' }}>
                <Revel>
                  <h1>Latest News</h1>
                </Revel>
                <div className="d-flex flex-lg-row flex-column justify-content-around  align-items-center container-fluid" style={{ marginTop: '30px' }}>
                  <div className="text-center my-4" style={{ flexBasis: '40%' }}>
                    <Revel>
                      <img src="./biker.PNG" alt="biker" style={{ borderRadius: '25px', height: '20rem' }} />
                      <h4 style={{ textDecoration: 'bold', color: 'black', padding: '15px' }}>Fashion Trends for biker 2022</h4>
                      <p>Biker jackets have long been a symbol of rugged style and rebellion, but in recent years, they’ve evolved into a fashion trend that transcends...........</p>
                      <h5>Read More</h5>
                    </Revel>
                  </div>
                  <div className="text-center my-4" style={{ flexBasis: '40%' }}>
                    <Revel>
                      <img src="./biker2.PNG" alt="biker" style={{ borderRadius: '25px', height: '20rem' }} />
                    </Revel>
                    <Revel>
                      <h4 style={{ textDecoration: 'bold', color: 'black', padding: '15px' }}>Hoodies or PullOver? The Better Choice</h4>
                      <p>Biker jackets have long been a symbol of rugged style and rebellion, but in recent years, they’ve evolved into a fashion trend that transcends...........</p>
                      <h5>Read More</h5>
                    </Revel>
                  </div>
                </div>
              </div> */}
            {/* section 7 Testimonials */}

            <div className="d-flex flex-column justify-content-center w-100 align-items-center container-fluid mt-4" style={{ padding: '20px' }}>
              <Revel>
                <h1>What people say about us!</h1>
              </Revel>
              <Revel>
              <div className="container-fluid" style={{ marginTop: '30px', padding: '20px' }}>
  <div className="row">
    { features && features?.review && features?.review.length !== 0  && features?.review.map( (r) =>(
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
      <div className="card shadow-sm p-4 text-center">
        {/* <div className="demo-image mb-3" style={{ width: '80px', height: '80px', backgroundColor: '#ccc', borderRadius: '50%', margin: '0 auto' }}></div> */}
        <p className="review-text">{r.comment}</p>
      </div>
    </div>
    ))}

    
  </div>
</div>


              </Revel>
            </div>



            {/* section 9 */}
           
            <div className="d-flex flex-column justify-content-center align-items-center container-fluid mt-4" style={{ backgroundColor: '#FDF5E2', padding: '40px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
  <div className="sale-content">
  <Revel>
    <h3 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>CLEARANCE SALE</h3>
    <p style={{ fontSize: '1.2rem', color: '#555', marginBottom: '5px' }}>Up to <span style={{ fontWeight: 'bold', color: '#FF6347' }}>50% Off</span>. All Sales are Final!</p>
    <p style={{ fontSize: '1rem', color: '#777', marginBottom: '20px' }}>Last chance to take advantage of our discount!</p>

    <button style={{ width: '10rem', padding: '10px 15px', background: '#FF6347', color: 'white', border: 'none', borderRadius: '25px', fontSize: '1rem', cursor: 'pointer', transition: 'background 0.3s' }} 
      onMouseEnter={(e) => e.target.style.background = '#e55347'}
      onMouseLeave={(e) => e.target.style.background = '#FF6347'}
      onClick={(e) => navigate('/AllProducts')}>
      Shop Now
    </button>
    </Revel>
  </div>
</div>



          </div>
          <style jsx>{`
       /* Styling for the carousel images */
.carousel .carousel-image {
  position: relative;
}

.carousel .carousel-image img {
  width: 100%;
  height: auto; /* Maintain original image height */
  object-fit: cover; /* Ensure the image covers the container without changing height */
  transition: transform 0.3s ease-in-out;
}

/* Styling for the animated text overlay */
.carousel .animated-text {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  opacity: 0; /* Initially hidden */
  transition: opacity 0.5s, transform 0.5s;
  transform: translateY(20px); /* Start slightly below */
}

.carousel .animated-text.active {
  opacity: 1; /* Become visible when active */
  transform: translateY(0); /* Move up to its final position */
  transition: opacity 1s ease-in-out, transform 1s ease-in-out;
}

.carousel .animated-text h2 {
  font-size: 2.5rem;
  margin: 0;
  font-weight: bold;
}

.carousel .animated-text p {
  font-size: 1.2rem;
  margin-top: 10px;
}

/* Hover effect for zoom */
.carousel .carousel-image:hover img {
  transform: scale(1.05);

}
         .product-card {
  position: relative;
  transition: all 0.3s ease-in-out;
  border: 1px solid #eee;
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
  flex-direcrion:column;
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



      `}</style>
        </Layout>
      }
    </div>
  )
};

export default HomePage;



