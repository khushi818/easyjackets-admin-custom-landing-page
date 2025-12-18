import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useNavigate, Link ,  useParams} from "react-router-dom";
import axios from "axios";

import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { FaCartArrowDown } from "react-icons/fa";
import { useCart } from "../context/Cart";

const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [cart, setCart] = useCart();
  const [metaData , setMetaData] = useState({})

  const { slug } = useParams()
  const navigate = useNavigate()


  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/${slug}`)

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
        `/api/v1/product/product-filters/?slug=${slug}&page=${currentPage}&limit=12`,
      );
      setProducts([...data?.products]);
      setTotalPages(data?.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() =>{
       handleFilter()
  }, [currentPage])

  useEffect(()=>{
     getMetaTags()
     handleFilter()
  },[])
  
   
  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <div className="container-fluid " >
        <div className="text-center">
            <h2 style={{marginTop : '40px'}}>{slug.toUpperCase()}</h2>
      
           

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
                      <div className="card-name-price" style= {{ padding : '10px'  ,  width :  '100%' , height : '100px'}}>
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
                     
          </div>
  <div className="pagination" style ={{ display : 'flex' , justifyContent : 'right' , alignItems : 'right'  , gap : '20px', marginTop : '20px'}}>
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

        <div className="description"style={{ textAlign : 'left'}} >
      { slug === 'varsity-jackets' &&  <div style={{  padding: "20px",  color: "#333" }}>
      <h2 style={{ color: "#000" }}>Uplift Your Style with Top Quality Varsity Jackets</h2>
      <p style={{  fontSize: "18px" }}>
        Find out the epitome of classic cool with Top Easy Jackets’ fashionable collection of Varsity Jackets.
        These jackets are not just garments; they’re a timeless symbol of style and achievement.
      </p>
      
      <h3 style={{ paddingBottom: "5px" }}>Top-Feature Varsity Jackets</h3>
      <p>
        Explore our exactly crafted Varsity Jackets, designed with attention to detail and made from top-quality materials.
        Each jacket in our collection is a tribute to the classic varsity style, blending comfort with a touch of nostalgia.
      </p>
      
      <h3 style={{ paddingBottom: "5px" }}>Versatile Styles for Every Event</h3>
      <p>
        Whether you're channeling a retro vibe or aiming for a modern twist, our Varsity Jackets exclusive collection has something for everyone.
        From classic color combinations to up-to-date designs, these jackets effortlessly combine fashion with a sporty edge.
      </p>
      
      <h3 style={{  paddingBottom: "5px" }}>Why Choose Easy Jackets’ Varsity Jackets?</h3>
      <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
        <li><strong>Heritage of Excellence:</strong> Easy Jackets is synonymous with precision and excellence, and our Varsity Jackets carry that heritage.</li>
        <li><strong>Excellence Craftsmanship:</strong> Made with premium materials, our jackets ensure durability and comfort.</li>
        <li><strong>Iconic Style:</strong> A Varsity Jacket from Easy Jackets is more than just clothing; it's a statement of style and achievement.</li>
      </ul>
      
      <h3 style={{  paddingBottom: "5px" }}>Shop Custom Made Varsity Jackets Now!</h3>
      <p>
        Elevate your clothing with Easy Jackets’ Varsity Jackets. Whether you're a fan of the classic varsity look or want to make a bold statement,
        our exclusive jackets are designed to capture your passion and showcase your unique style. Shop now and embrace the spirit of timeless fashion!
      </p>
      
      <div style={{  marginTop: "20px" }}>
        <button className="btn btn-primary" onClick= {() => navigate('/products/varsity-jackets')}>
          Shop Now
        </button> 
      </div>
    </div>}

    { slug === 'bomber-jackets' && (
          <div style={{ padding: "20px", color: "#333" }}>
          <h2 style={{ color: "#000" }}>Easy Jackets Store's Men's Bomber Jacket Collection</h2>
          <p style={{ fontSize: "18px" }}>
            Discover the ultimate Men's Bomber Jacket collection at Easy Jackets online Store! Our jackets are the epitome of style, comfort, and durability, perfect for men who escalate fashion with functionality.
          </p>
          
          <h3 style={{ paddingBottom: "5px" }}>Premium Quality Men's Bomber Jackets</h3>
          <p>
            Dive into a range of Bomber Jackets for men, crafted with accuracy and high-quality premium materials.
            Each bomber jacket in our collection is designed to provide a comfortable fit while showcasing a sophisticated and rugged look that is timeless.
          </p>
          
          <h3 style={{ paddingBottom: "5px" }}>Versatile Bomber Jackets for Every Man</h3>
          <p>
            Whether you prefer a classic leather bomber jacket or a lightweight option for those cooler summer evenings, we have something for every man.
            Our Men's Bomber Jackets are versatile, suitable for casual outings, formal events, or adventurous expeditions.
          </p>
          
          <h3 style={{ paddingBottom: "5px" }}>Why Easy Jackets Men's Bomber Jackets?</h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li><strong>Stylish Designs:</strong> Easy Jackets bomber jackets come in various designs and colors to complement every style and preference.</li>
            <li><strong>Quality Craftsmanship:</strong> Custom made with premium quality fabrics and meticulous attention to detail, our jackets ensure durability and comfort.</li>
            <li><strong>Size Variety:</strong> Find the perfect fit with our wide range of sizes available.</li>
          </ul>
          
          <h3 style={{ paddingBottom: "5px" }}>Shop Men's Bomber Jackets Now!</h3>
          <p>
            Elevate your clothing with Easy Jackets Store's exceptional Men's Bomber Jacket collection.
            With a jacket for every event, your style will certainly be elevated. Shop now and embrace the perfect blend of style and comfort!
          </p>
          
          <div style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={() => navigate('/products/bomber-jackets')}>
              Shop Now
            </button>
          </div>
        </div>
    )}

    {slug === 'ladies-Varsity-Jackets' && (
          <div style={{ padding: "20px", color: "#333" }}>
          <h2 style={{ color: "#000" }}>Women Varsity Jacket for Cold Weather Ventures</h2>
          <p style={{ fontSize: "18px" }}>
            The varsity jacket, an iconic piece of American collegiate fashion, has a rich history dating back to the 1860s. 
            Initially worn by Harvard University's baseball team, it has since become a symbol of team spirit and style. 
            Today, varsity letterman jackets have emerged as a trendy and versatile fashion statement.
          </p>
          
          <h3 style={{ paddingBottom: "5px" }}>Choosing the Right Women Varsity Jacket</h3>
          <p>When selecting the perfect women varsity jacket, consider the following factors:</p>
          
          <h4 style={{ paddingBottom: "5px" }}>Style Options</h4>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li><strong>Womens Varsity Bomber Jacket:</strong> Explore Easy Jackets collection of bomber jackets designed specifically for women, combining classic varsity aesthetics with a bomber jacket's comfort and edge.</li>
            <li><strong>Womens Hooded Varsity Jacket:</strong> For extra warmth and style, opt for a hooded varsity jacket, perfect for cooler seasons.</li>
            <li><strong>Plain Varsity Jacket:</strong> A clean, timeless design for those who prefer an uncluttered approach.</li>
            <li><strong>Wool Varsity Jacket:</strong> Experience elegance and warmth with our premium wool varsity jackets.</li>
          </ul>
          
          <h4 style={{ paddingBottom: "5px" }}>Size Inclusivity</h4>
          <p><strong>Women Varsity Jacket Plus Size:</strong> Style knows no size! Our plus-size collection ensures everyone can make a fashion-forward statement.</p>
          
          <h3 style={{ paddingBottom: "5px" }}>Why Select Women’s Varsity Jackets from Easy Jackets?</h3>
          <ul style={{ listStyleType: "disc", paddingLeft: "20px" }}>
            <li><strong>Quality Craftsmanship:</strong> Our jackets are crafted with precision and dedication to detail, ensuring durability and comfort.</li>
            <li><strong>Influential Designs:</strong> Stay ahead in the fashion game with our latest range of classic and modern styles.</li>
            <li><strong>Inexpensive Luxury:</strong> Enjoy high-quality fashion without breaking the bank.</li>
          </ul>
          
          <h3 style={{ paddingBottom: "5px" }}>Explore Our Full Collection of Women’s Outerwear</h3>
          <p>
            In addition to our women letterman jackets, Easy Jackets offers an extensive collection of jackets to suit every occasion.
            Visit Easy Jackets today and find the perfect style to express your individuality while staying ahead in fashion trends!
          </p>
          
          <div style={{ marginTop: "20px" }}>
            <button className="btn btn-primary" onClick={() => navigate('/products/ladies-Varsity-Jackets')}>
              Shop Now
            </button>
          </div>
        </div>
    )}
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
          grid-template-columns: repeat(5, minmax(280px, 1fr));
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
            grid-template-columns: repeat(3, 1fr); /* Single-column on mobile */
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

export default CategoryProducts;
