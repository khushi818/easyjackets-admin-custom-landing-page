import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [metaData , setMetaData] = useState({}) 

  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/about`)

    setMetaData(data?.metadata)
  }

  useEffect(() => {
    getMetaTags()
    setIsVisible(true);
  }, []);

  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <div className={`container py-4 ${isVisible ? "fade-in" : ""}`}>
        {/* About Us Section */}
        <div className="row mb-5">
          <div className="col-md-6">
            <img
              src="/PageImage/about-us-jackets.png" // Accessing via URL path
              alt="About Us"
              className={`img-fluid rounded shadow-sm ${isVisible ? "fade-in" : ""}`}
              style={{
                maxHeight: "400px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-md-6 d-flex align-items-center">
            <div>
              <h2 className="fw-bold mb-4 text-primary">About Us</h2>
              <p className="text-justify">
                Welcome to our website! We are proud to offer custom varsity
                jackets for any occasion. Our jackets are made from the finest
                materials and are designed to fit perfectly, giving you a look
                that is comfortable and stylish. Whether you are a student, an
                athlete, or just someone who likes to look their best, we have the
                perfect jacket for you. With our wide selection of colors and
                sizes, you can find the perfect varsity jacket for any event. Get
                ready to look your best and stand out from the crowd with our
                unique varsity jackets!
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-5">
          <p className="text-justify">
            At EASYJACKETS we let our customers design their own varsity jackets
            with premium quality fabric, genuine leather and more. With our
            selection of materials, you can make a truly unique piece that
            reflects your style and personality. We offer cotton twill, sheep
            leather, cotton fleece, melton wool, cowhide leather, satin, faux
            leather taffeta and more so you can create the perfect custom
            letterman jackets or satin jackets. Our website provides a simple
            and user-friendly experience for ordering and designing your own
            varsity jacket. With just a few clicks you can upload your images or
            logo and start creating the perfect varsity jacket design. We take
            pride in providing high-quality jackets at an affordable price, as
            well as excellent customer service. With fast delivery times,
            hassle-free returns, and 100% satisfaction guaranteed, you can rest
            assured that your custom jacket will be delivered quickly and meet
            all of your expectations.
          </p>
          <h3 className="fw-bold mt-4 text-success">
            So don’t wait! Start designing your own varsity jacket today with
            EASYJACKETS and create something truly unique.
          </h3>
        </div>

        {/* Our Story Image Section */}
        <div className="mb-5">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center">
              <div>
                <h2 className="fw-bold mb-4 text-primary">Our Story</h2>
                <p className="text-justify">
                  I was walking through a local street in greater New York City looking at jackets. As I shopped through a few shops, either I could not find the jackets of my choice or the desirable product was priced really high. Next was to explore the available tailors, which again turned out to be pretty expensive. The result that I concluded was, it is really expensive to make varsity or custom jackets for oneself in the US, hence, I decided to provide the US audience with a product that is of high quality, in accordance with their demands and is reasonably priced.
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <img
                src="/PageImage/our-story-1751x2048.png" // Accessing via URL path
                alt="Our Story"
                className={`img-fluid rounded shadow-sm ${isVisible ? "fade-in" : ""}`}
                style={{
                  maxHeight: "400px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div className="mt-5">
            <p className="text-justify">
              Easy Jackets was thus born in the year 2010. Since then, we have been producing extraordinary products, which our clients like countrywide. We use melton wool and cowhide leather in all of our jackets and on top of that, all the products can be designed to the exact likeliness of the clients. We can even incorporate your personal stickers and logos if added to the design. Design your jacket on our website is a tool that we have developed on www.royaltyjacket.com, which allows you to custom make your jackets even to the color and design of the front pocket borders.
            </p>
            <h3 className="fw-bold mt-4 text-success">
              We are committed to excellent customer service and we go to lengths to make sure all our clients get the best possible product and services.
            </h3>
            <h1 className="mt-4 text-center">
              <a href="https://example.com" className="text-dark text-decoration-none">
                Message from our CEO Faisal Munir Butt.
              </a>
            </h1>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 0.5s ease-in forwards;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  );
};

export default About;
