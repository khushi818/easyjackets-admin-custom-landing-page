import React, { useState, useEffect} from "react";
import Layout from "../components/layout/Layout";
import { Form } from "../components/Form/Form";
import "animate.css"; // Ensure you have installed and imported Animate.css
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [name, setName] = useState({ firstName: "", lastName: "" });
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [metaData , setMetaData] = useState({})
  const [data, setData] = useState({})


  const getWebsiteDetails = async () =>{
    const response = await axios.get('/api/v1/features/website/details'); 
    setData(response.data.website)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic here'
    await axios.post('/api/v1/features/contact' , { firstName : name.firstName, lastName : name.lastName, email, message }); 
    toast.success("contact has been submitted", {position : 'bottom-right' })
    setName({ firstName: "", lastName: "" })
    setMessage("")
    setEmail("")
  };

  const handleNameChange = (e) => {
    setName({ ...name, [e.target.name]: e.target.value });
  };

  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/contact`)

    setMetaData(data?.metadata)
} 


useEffect(() =>{
  getMetaTags()
  getWebsiteDetails()  
},[])
  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <section className="hero-section position-relative text-center pb-5 mt-5" style={{ marginTop : '20px'}}>
        <div className="d-flex flex-column justify-content-center align-items-center position-absolute w-100 h-100">
          {/* Removed the animation class */}
          <h1 className="display-5 text-dark fw-bold pb-5">
            Contact Us
          </h1>
        </div>
      </section>
      
      <Form
        onSubmit={handleSubmit}
        name={name}
        onNameChange={handleNameChange}
        email={email}
        setEmail={setEmail}
        message={message}
        setMessage={setMessage}
        data = {data}
      />

      {/* Additional Content Section */}
      <section className="additional-info mt-5">
        <div className="container">
          {/* Reduced heading size */}
          <h2 className="text-center mb-4 animate__animated animate__fadeInUp" style={{ fontSize: "1.8rem" }}>
            More Information
          </h2>
          <div className="row">
            <div className="col-md-6 mb-4 animate__animated animate__fadeInLeft">
              {/* Reduced heading size */}
              <h3 className="fw-bold" style={{ fontSize: "1.5rem" }}>Our Location</h3>
              <p>Find us at our headquarters:</p>
              <p >A1 : {data?.address}</p> 
              <p>A2 : {data?.address1}</p>
              
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.8046974528537!2d-97.7496220846941!3d30.34796148172066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x865b4fc2b7a2f68f%3A0xeedbba6a6a76b11a!2s5900%20Balcones%20Dr%2C%20Austin%2C%20TX%2078731!5e0!3m2!1sen!2sus!4v1648825661288!5m2!1sen!2sus"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe> */}
            </div>
            <div className="col-md-6 animate__animated animate__fadeInRight">
              {/* Reduced heading size */}
              <h3 className="fw-bold" style={{ fontSize: "1.5rem" }}>FAQs</h3>
              <ul className="list-unstyled">
                <li className="mb-3 animate__animated animate__zoomIn">
                  <strong>How can I track my order?</strong>
                  <p>After placing your order, you will receive a tracking number via email.</p>
                </li>
                <li className="mb-3 animate__animated animate__zoomIn">
                  <strong>What is your return policy?</strong>
                  <p>You can return any item within 30 days of receipt for a full refund.</p>
                </li>
                <li className="mb-3 animate__animated animate__zoomIn">
                  <strong>How can I contact customer support?</strong>
                  <p>For any issues, you can reach out to us through the contact form or call us at +1-718-255-7191.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
