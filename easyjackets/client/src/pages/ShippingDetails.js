import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Layout from '../components/layout/Layout';

const ShippingDetails = () => {
  return (
    <Layout title={"easyjackets-Shipping details"}>
    <Container className="my-5">
      <Row>
        <Col>
        <h1 style={{ color: "#333"}}>Returns & Exchanges</h1>
                
                <h3 style={{ color: "#555" }}>Custom Made Garments</h3>
                <p>Custom made garments designed using our DESIGN LAB is non-returnable / non-exchangeable. Personalized items are specially made for you and cannot be returned / exchanged / cancelled. There is NO REFUNDS for custom made garments. </p>   
                <h3 style={{ color: "#555" }}>Production & Delivery</h3>
                <p>All custom made jackets with embroidery or patches require 3-4 weeks for production while plain jackets require 2 weeks for production. After shipping from our factory it takes around 4-5 working days for delivery. We always try to meet our internal dead line. Some times when something is out of stock it may take couple of days to get the right material for your jacket. So keep the patience we are here to provide best custom made jackets at affordable price. We ship all orders in the United States and rest of the world by DHL and Fedex.
In order to calculate jacket cost, please use our Jacket Builder to select type of the jacket, then select materials and add decorations. You can view total cost of the jacket on top right. To calculate shipping costs, you can add jacket to your cart and provide shipping address.
Note: Jacket prices vary based on materials, sizes and number of embroideries & patches. All discounts / ongoing offer have already been applied on the jackets.
 </p>
                <h3 style={{ color: "#555" }}>Shipping Rates</h3>
                <ul>
                    <li>US & Canada: $25</li>
                    <li>Japan: $40</li>
                    <li>Rest of the World: $35</li>
                </ul>
                
                <h3 style={{ color: "#555" }}>Returns</h3>
                <ul>
                    <li>Jackets customized using our DESIGN LAB are not returnable.</li>
                    <li>All returns of plain (non-decorated) stock jackets require a prior authorization number and are subject to a 15%-25% restocking fee or $35. (Whichever is greater) and must be returned within 10 days of delivery. Claims for damaged or defective jackets must be made within 10 days of receipt of the jackets. Please submit your request for an authorization number through our contact us page.</li>              <li>Claims for damaged or defective jackets must be made within 10 days of receipt.</li>
                    <li>If decorated jackets have been incorrectly/improperly personalized, our Customer Support Team must be notified within 10 days of receipt of your jacket so that appropriate adjustments or corrective action can be taken.</li>
                    <li>Worn or altered garments are not returnable. Therefore, it's especially important that jackets are inspected upon receipt.</li>
                        <li>If you qualify for a return or exchange please write to us for a return authorization. Write to: help@easyjackets.com. We will give you a return-authorization number to ensure that your return/exchange is accepted.</li>   
                           </ul>
                
                <h3 style={{ color: "#555" }}>Exchanges(In-Stock items)</h3>
                <p>You can exchange In-Stock plain (non-decorated) jackets ONLY! Contact us through our contact page with your order number. Please indicate the jacket you are returning and the new jacket you want us to send. Be as specific as possible when describing the new jacket. The jacket returned will be credited to the original payment method and the new jacket(s) will be charged to the same payment method. Shipping charges for the returned item are not refundable.</p>
                <h3 style={{ color: "#555" }}>Cancellations & Changes</h3>
                <p>If you have ordered a wrong item or you wish to cancel or change your order please inform within 24 hours of placing the order. Cancellation or Change requests made after 24 hours will not be accepted.</p>
             
        </Col>
      </Row>
    </Container>
    </Layout>
  );
};

export default ShippingDetails;
