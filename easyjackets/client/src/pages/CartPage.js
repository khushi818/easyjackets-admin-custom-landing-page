import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useStripe } from "@stripe/react-stripe-js";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart , customCart , setCustomCart] = useCart();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const stripe = useStripe();

  const totalPrice = () => {
    try {
      let total = 0;
      if(cart) {
      cart.map((item) => {
        total += item?.price * item.quantity;
      });
      }
      if(customCart){
      customCart.map((item) => {
        total += item.designId.custom_price * item.quantity;
      });
    }
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const totalShippingcharges = () => {
    try {
      let total = 0;
      if(cart) {
      cart.map((item) => {
        total += 30 * item.quantity;
      });
      }
      if(customCart){
      customCart.map((item) => {
        total += 30 * item.quantity;
      });
    }
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getQuantity = () => {
    let quantity = 0
    if(cart) {
      cart.map((item) => {
        quantity += item.quantity;
      });
      }
      if(customCart){
      customCart.map((item) => {
        quantity +=  item.quantity;
      });
    }

      return quantity
  }

  const getTotalAmount = () => {
    try {
      let total = 0;
      if(cart) {
        cart.map((item) => {
          total += (item?.price * item.quantity) + (30 * item.quantity);
        });
        }
        if(customCart){
        customCart.map((item) => {
          total += (item.designId.custom_price * item.quantity) + (30 * item.quantity);
        });

    }

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    }); 
  }
    catch(err){
      console.log(err)
    }
  }

  const checkCart = (pid) => {
    let productexist  = false
    if(sessionStorage.getItem("customcart")){
    productexist =
      JSON.parse(sessionStorage.getItem("customcart"))?.filter((c) => {
        return c._id === pid;
      }).length === 0
        ? false
        : true;
    }
    
    return productexist;
  };

  const getCarts = async () => {
    try {
      const index = searchParams.get("index").split(",");
      const { data } = await axios.post("/api/v1/custom/getAllCustomCart", {
        carts: [...index],
      });
      data.data.map((product) => {
        checkCart(product?._id);
        if (!checkCart(product?._id)) {
          const cartStorage = JSON.parse(sessionStorage.getItem("customcart")) ? JSON.parse(sessionStorage.getItem("customcart")) : [];
          sessionStorage.setItem(
            "customcart",
            JSON.stringify([
              ...cartStorage,
              {
                ...product,
                size: product.designId.sizes.size,
                quantity: 1,
                custom: true,
              },
            ])
          );
          setCustomCart(JSON.parse(sessionStorage.getItem("customcart")));
          toast.success("Item Added to cart");
        }
      });
   
    } catch (error) {
      console.log(error);
    }
  };


  const updateQuantity = (pid, quantity) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart[index].quantity = quantity;
    setCart(myCart);
    sessionStorage.setItem("cart", JSON.stringify(myCart));
  };

  const updateCustomQuantity = (pid, quantity) => {
    let myCart = [...customCart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart[index].quantity = quantity;
    setCustomCart(myCart);
    sessionStorage.setItem("customcart", JSON.stringify(myCart));
  };

  const removeCustomCartItem = (pid) => {
    let myCart = [...customCart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCustomCart(myCart);
    sessionStorage.setItem("customcart", JSON.stringify(myCart));
    navigate('/cart')
  };


  const removeCartItem = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    sessionStorage.setItem("cart", JSON.stringify(myCart));
  };

  const handleCheckout = async () => {
    const productlist = [...customCart , ...cart].map((c , index) => {
      return {
        id : c?.custom ? null : c?._id ,
        designId :  c?.custom ?  c?.designId?._id : c?.designId ,
        name: c?.custom  ? `custom ${c.designId.globals.catName} {${index +1}`  : c?.name,
        quantity: c?.quantity,
        price: c?.custom ? c?.designId?.custom_price : c?.price ,
        // image : c?.frontImage
      };
    });
    const {
      data: { id },
    } = await axios.post("/api/v1/payment/create-guest-checkout-session", {
      products: productlist,
    });

    const { error } = await stripe.redirectToCheckout({ sessionId: id });
    if (error) {
      console.error("Error during redirect to checkout:", error);
    }
  };

  useEffect(() => {
    const index = searchParams.get("index") ? searchParams.get("index").split(",") : null;
    if(index) {
       getCarts()
    }
  }, []);

  return (
    <Layout>
      <Container style={{ marginTop: "50px" }}>
        <Row>
          <Col md={8}>
           
            <div
              style={{
                maxHeight: "400px",
                overflowY: "auto",
                paddingRight: "10px",
                border: "1px solid #ddd",
                padding: "10px",
                marginTop:'20px'
              }}
            >
              {customCart?.length > 0 &&
              <>
              <p>Custom Jacket</p>
              {customCart?.map((p) =>(
                                  <div
                                  key={p?._id}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "10px 0",
                                    borderBottom: "1px solid #ddd",
                                   
                                  }}
                                >
                                  <Link to={`/Design/${p?.designId?._id}?custom=${p.custom}`}>
                                    <img
                                      src={p.designId?.custom_image}
                                      alt="Design"
                                      style={{
                                        width: "70px",
                                        height: "auto",
                                        borderRadius: "5px",
                                      }}
                                    />
                                  </Link>
                                  <div style={{ flexGrow: 1, paddingLeft: "20px" }}>
                                    <h4>{p.designId?.globals?.catName}</h4>
                                    <p>Size: {p?.designId?.sizes?.size}</p>
                                    <input
                                      type="number"
                                      min="1"
                                      value={p?.quantity}
                                      onChange={(e) => {
                                        e.preventDefault()
                                        updateCustomQuantity(p?._id, parseInt(e.target.value, 10))
                                      }}
                                    />
                                  </div>
                                  <div style={{ display: "flex", alignItems: "center" }}>
                                    <p style={{ marginRight: "20px" }}>${p.designId?.custom_price}</p>
                                    <Button
                                      variant="danger"
                                      onClick={() => removeCustomCartItem(p?._id)}
                                    >
                                      Remove
                                    </Button>
                                  </div>
                                  </div>
              ))} 
              </>
            }
             
              {cart?.length > 0 && (
                cart.map((p) => (
                  <div
                    key={p?._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 0",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    <Link to={`/product/${p?.slug}`}>
                      <img
                        src={p?.frontImage}
                        alt="Design"
                        style={{
                          width: "70px",
                          height: "auto",
                          borderRadius: "5px",
                        }}
                      />
                    </Link>
                    <div style={{ flexGrow: 1, paddingLeft: "20px" }}>
                      <h4>{p?.category?.name}</h4>
                      <p>Size: {p?.size?.toUpperCase()}</p>
                      <input
                        type="number"
                        min="1"
                        value={p?.quantity}
                        onChange={(e) =>
                          updateQuantity(p?._id, parseInt(e.target.value, 10))
                        }
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p style={{ marginRight: "20px" }}>${p?.price}</p>
                      <Button
                        variant="danger"
                        onClick={() => removeCartItem(p?._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                )) 
              )}

              {(cart.length === 0  && customCart.length === 0) && <h4 style ={{ textAlign : 'center'}}>YOUR CART IS EMPTY</h4> }
            </div>
          </Col>

          <Col md={4}>
            <Card style={{ marginTop: "20px" }}>
              <Card.Body>
                <Card.Title>Cart Summary</Card.Title>
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Total Product Charges</p>
                  <p>{totalPrice()}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Total shipping Charges</p>
                  <p>{`${getQuantity()} x $30 = ${totalShippingcharges()}`}</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <p>Total</p>
                  <p>{`${getTotalAmount()}`}</p>
                </div>
                <div style={{ margin: "20px 0" }}>
                  <Form.Control placeholder="Coupon code" />
                  <Button variant="outline-primary" style={{ marginTop: "10px" }}>
                    Apply Coupon
                  </Button>
                </div>
               
                
                <Button variant="primary" onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default CartPage;


