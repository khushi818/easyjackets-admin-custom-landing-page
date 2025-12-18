import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/ProductDetailsStyles.css";
import { useCart } from "../context/Cart";
import toast from "react-hot-toast";
import { baseURL, Custom_jacket } from "../constants/url";
import parse from "html-react-parser";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Loader from "../components/Loader";
import { FaCartArrowDown } from "react-icons/fa";
const ProductDetails = () => {
  const params = useParams();
  console.log(params)
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [selectSize, setSelectSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  //getProduct
  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`,
      );
      setProduct(data?.product);
      getSimilarProduct(data.product.category._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkCart = (pid) => {
    const productexist =
      cart.filter((c) => c._id === pid).length === 0 ? false : true;
    return productexist;
  };
  //get similar product
  const getSimilarProduct = async (category) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-filters?category=${category}&limit=12`,
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  //initalp details
  useEffect(() => {
    getProduct();
  }, [params.slug]);

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <Layout title={product?.metaTitle ? product?.metaTitle : product?.name } description={product?.metaDescription}>
          <div
            className="row container pb-5"
            style={{
              gap: "2.75rem",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {/* Left section with image and carousel */}
            <div className="col-md-5 d-flex justify-conytent-between align-items-center mt-4 rounded border">
              <div>
                {product.otherImages && (
                  <Carousel
                    showStatus={false}
                    showArrows={false}
                    interval={5000}
                    className="mt-2"
                  >
                    <div>
                      <img
                        src={product?.frontImage}
                        className="product-img"
                        alt={product?.imgAlt}
                        style={{
                          width: "100%", // Make sure the image is responsive
                          height: "auto",
                        }}
                      />
                    </div>
                    {product &&
                      [...product?.otherImages].map((p, index) => (
                        <div key={index}>
                          <img
                            src={`${p}`}
                            className="product-img"
                            alt={product?.imgAlt}
                            style={{
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        </div>
                      ))}
                  </Carousel>
                )}
              </div>
            </div>

            {/* Right section with product details */}
            <div className="col-md-5 mt-3">
              {/* Product Title */}
              <h1
                className="mb-4 text-left"
                style={{ fontWeight: "bold", fontSize: "2.5rem" }}
              >
                {product?.name?.toUpperCase()}
              </h1>

              {/* Product Price */}
              <p>
                <h3
                  className="mb-3"
                  style={{ fontWeight: "bold", fontSize: "1.5rem" }}
                >
                  $
                  {selectSize
                    ? (
                        product?.sizes.filter((s) => s?.size === selectSize)[0]
                          ?.price -
                        (product?.discountPrice *
                          product?.sizes.filter(
                            (s) => s?.size === selectSize,
                          )[0]?.price) /
                          100
                      ).toFixed(2)
                    : (
                        product?.standardPrice -
                        (product?.discountPrice * product?.standardPrice) / 100
                      ).toFixed(2)}{" "}
                  <s style={{ color: "red" }}>
                    {product?.discountPrice
                      ? `$${selectSize ? product?.sizes.filter((s) => s?.size === selectSize)[0]?.price : product.standardPrice}`
                      : ""}
                  </s>{" "}
                </h3>
                <span>
                  
                  {product?.discountPrice
                    ? `(${product?.discountPrice}% OFF)`
                    : ""}
                  
                </span>
              </p>
              <p
                className="mb-4"
                style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
              >
                {product?.shortdescription &&
                  parse(`${product?.shortdescription}`)}
              </p>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  e.preventDefault();
                  setQuantity(e.target.value);
                }}
              />

              {/* Size Selector */}
              <div className="my-4">
                <label htmlFor="Size" className="form-label">
                  Size
                </label>
                <select
                  className="form-select"
                  id="Size"
                  onChange={(e) => setSelectSize(e.target.value)}
                  style={{ width: "100%" }}
                >
                  {product?.sizes?.map((s, i) => (
                    <option value={s?.size} key={i}>
                      {s?.size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Add to Cart Button */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "space-between",
                  gap: "20px",
                }}
              >
                <button
                  className="btn btn-dark btn-lg w-100"
                  onClick={() => {
                    if (checkCart(product?._id)) {
                      toast.error("Item Already exists");
                    } else {
                      const cartData =
                        JSON.parse(sessionStorage.getItem("cart")) || [];
                      const cartSize = [...product?.sizes];
                      const sizedetail = cartSize.filter(
                        (s) => s?.size == selectSize,
                      );
                      sessionStorage.setItem(
                        "cart",
                        JSON.stringify([
                          ...cartData,
                          {
                            ...product,
                            size: sizedetail[0]?.size || product.sizes[0]?.size,
                            quantity: quantity,
                            price: selectSize
                              ? (
                                  product?.sizes.filter(
                                    (s) => s?.size === selectSize,
                                  )[0]?.price -
                                  (product?.discountPrice *
                                    product?.sizes.filter(
                                      (s) => s?.size === selectSize,
                                    )[0]?.price) /
                                    100
                                ).toFixed(2)
                              : (
                                  product?.standardPrice -
                                  (product?.discountPrice *
                                    product?.standardPrice) /
                                    100
                                ).toFixed(2),
                            custom: false,
                          },
                        ]),
                      );
                      setCart(JSON.parse(sessionStorage.getItem("cart")));
                      navigate("/cart");
                      toast.success("Item Added to cart");
                    }
                  }}
                  style={{
                    background: "#000",
                    color: "#fff",
                    border: "1px solid #000",
                    borderRadius: "4px",
                    padding: "10px 15px",
                    fontSize: "1.2rem",
                  }}
                >
                  ADD TO CART
                </button>

                {/* Add Patches Button */}
                <button
                  className="btn btn-lg w-100"
                  style={{
                    background:
                      "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                    padding: "10px 15px",
                    fontSize: "1.2rem",
                  }}
                  onMouseOver={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, #5a63e0 0%, #000bd9 100%)";
                    e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.background =
                      "linear-gradient(135deg, #6b73ff 0%, #000dff 100%)";
                    e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <a
                    href={
                      product.designId
                        ? `${Custom_jacket}?id=${product?.category?.code}&design=${product?.designId}`
                        : `${Custom_jacket}?id=${product?.category?.code}`
                    }
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontWeight: 400,
                    }}
                  >
                    ADD PATCHES
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div className="row container pb-5">
            {/* Product Description */}
            <h2 style={{ textAlign : "left"}}>Description</h2>
            <p
              className="mb-4"
              style={{ fontSize: "1rem", lineHeight: "1.5rem" }}
            >
              {parse(`${product?.description}`)}
            </p>
          </div>

          <hr />
          <div className="row similar-products container ">
            <h4>Similar Products ➡️</h4>
            {relatedProducts.length === 0 && (
              <p className="text-center">No Similar Products found</p>
            )}
            <div className="w-100 product-styling">
              <div className="w-100 product-styling">
                {relatedProducts?.map((p) => (  
                  <div
                    className="card product-card m-2 bg-white "
                    key={p?._id}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/product/${p?.slug}`);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {/* Image with hover icons */}
                    <div className="card-img-container">
                      <img
                        src={p?.frontImage}
                        className="card-img-top"
                        alt={p?.imgAlt}
                      />
                      <div className="hover-icons">
                        <i
                          className="bi bi-cart3 add-to-cart-icon"
                          onClick={(e) => {
                            e.stopPropagation()
                            if (checkCart(product?._id)) {
                              toast.error("Item Already exists");
                            } else {
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
                          }}
                        }
                        >
                          <FaCartArrowDown className="cart-icon" />
                        </i>
                      </div>
                    </div>
                    <div className="card-body bg-white">
                      {/* Product Title and Price */}
                      <div className="card-name-price">
                        <h5 className="card-title">{p?.name.toUpperCase()}</h5>
                        <h5 className="card-title card-price">
                          <p style={{ fontWeight: 700 }}>
                            $
                            {p?.discountPrice ? (
                              <s style={{ color: "red" }}>{p?.standardPrice}</s>
                            ) : (
                              ""
                            )}
                            {"  "}
                            {(
                              p?.standardPrice -
                              (p?.discountPrice * p?.standardPrice) / 100
                            ).toFixed(2)}
                          </p>
                        </h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      )}

      <style jsx>{`
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
          transition:
            border 0.3s ease,
            box-shadow 0.3s ease; /* Smooth transition */
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
          transition:
            border 0.3s ease,
            box-shadow 0.3s ease; /* Smooth transition */
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
    </div>
  );
};

export default ProductDetails;
