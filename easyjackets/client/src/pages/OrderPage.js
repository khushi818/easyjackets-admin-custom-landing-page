import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Layout from "../components/layout/Layout";

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading ,setIsLoading] = useState(false)

  // Fetch order details
  const fetchOrderDetails = async () => {
    try {
      setIsLoading(false)
      const { data } = await axios.get(`/api/v1/order/${orderId}`);
      setOrder(data.order);
      setIsLoading(true)
    } catch (error) {
      console.error("Failed to fetch order details", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <p>Loading order details...</p>;
  }

  return (
    <Layout>
      
      <Container style={{ marginTop: "50px" }}>
        <h2>Order #{order._id}</h2>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <h3>Items:</h3>
        {order.items.map((item) => (
          <Card key={item.productId} className="mb-3">
            <Card.Body>
              <Row>
                <Col md={2}>
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    style={{ width: "100px", height: "auto" }}
                  />
                </Col>
                <Col md={6}>
                  <h5>{item.productName}</h5>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price}</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </Layout>
  );
};

export default OrderDetailPage;
