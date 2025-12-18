import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios from 'axios'
import Loader from "../components/Loader";

const OrderPage = () => {
  const [orders, setOrders] = useState({});
  const [productData , setProductData] = useState([])
  const [isLoading , setIsloading] = useState(false)
  const { id } = useParams()
  const fetchOrders = async() => {
    try{
       setIsloading(true)
       const { data } = await axios.get(`/api/v1/order/${id}`)
       if(data.success){
       setProductData([...data.data.cartData])
        setOrders(data.data)
      }
      setIsloading(false)
   } catch (error) {
    console.log(error);
    setIsloading(false)
  }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Format the orders status for cleaner display
  const formatOrderStatus = (status) => {
    switch (status) {
      case status:
        return status;
      default:
        return "Unknown";
    }
  };

  return (
    <Layout>
      { isLoading ? <Loader/> : (
      <Container style={{ marginTop: "40px" }}>
        <h2>Your Orders</h2>
            <Card className="mb-3" key={orders._id}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h5>orders #{orders?.orderId}</h5>
                    <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                      <strong>orders Date:</strong>{" "}
                      {new Date(orders?.createdAt).toLocaleDateString()}
                    </p>
                    <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                      <strong>Total:</strong> ${orders?.totalAmount}
                    </p>
                    <p style={{ fontSize: "14px", marginBottom: "8px" }}>
                      <strong>Status:</strong>{" "}
                      {formatOrderStatus(orders?.status)}
                    </p>
                    <Link to={`/success?session_id=${orders?.transactionId}`}>
                      <Button
                        variant="primary"
                        style={{
                          padding: "6px 12px",
                          fontSize: "14px",
                          borderRadius: "20px",
                        }}
                      >
                        View orders Details
                      </Button>
                    </Link>
                  </Col>

                  <Col md={4} className="text-right">
                    <h6>Track orders</h6>
                    <div style={{ marginBottom: "10px" }}>
                      <span style={{ fontSize: "14px" }}>
                        Status: {formatOrderStatus(orders?.status)}
                      </span>
                    </div>
                  </Col>
                </Row>

                {/* Render each product in the orders */}
                <Row className="mt-4">
                   {productData.length && productData.map((product, index) => (
                    <Col
                      md={3}
                      key={index}
                      className="mb-2"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Card
                        className="product-card"
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          overflow: "hidden",
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src={product?.id ? product?.id?.frontImage : product?.designId?.custom_image}
                          alt={product?.id?.imgAlt}
                          style={{
                            width: "100%",
                          
                            objectFit: "fit",
                          }}
                        />
                        <Card.Body style={{ padding: "10px" }}>
                          <Card.Title
                            style={{
                              fontSize: "14px",
                              fontWeight: "bold",
                              marginBottom: "8px",
                            }}
                          >
                            {product?.name}
                          </Card.Title>
                          <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                            Quantity: {product?.quantity}
                          </p>
                          <p style={{ fontSize: "13px", marginBottom: "5px" }}>
                            Price: ${product?.price}
                          </p>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))} 
                </Row>
              </Card.Body>
            </Card>
      
      </Container>
      )}
    </Layout>
  );
};

export default OrderPage;
