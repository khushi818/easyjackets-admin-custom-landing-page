import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../components/layout/Layout";
import useCategory from "../hooks/useCategory";
import axios from "axios"
import Loader from "../components/Loader";
import Select from 'react-select'
const BulkOrders = () => {
  const [selectedProduct, setSelectedProduct] = useState("Hoodies");
  const [zipoutLining, setZipoutLining] = useState(false);
  const [flapClosure, setFlapClosure] = useState(false);
  const [closure , setClosure] = useState([])
  const [selectedClosure , setSelectedClosure ] = useState("buttons")
  const [lining , setLining] = useState([])
  const [selectedLining , setSelectedLining ] = useState('cotton')
  const category = useCategory()
  const [images, setImages] = useState([]);
  const [metaData , setMetaData] = useState({})
  const [designLocations, setDesignLocations] = useState({
    frontCenter: false,
    rightChest: false,
    leftChest: false,
    rightPocket: false,
    leftPocket: false,
    rightSleeve: false,
    leftSleeve: false,
    rightCuff: false,
    leftCuff: false,
    backTop: false,
    backMiddle: false,
    backBottom: false,
    nickName: false,
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [loader , setLoader] = useState(false)
  const [quantity , setQuantity] = useState(10)
  const [countries, setCountries] = useState([]);
 
  const [selectedCountry, setSelectedCountry] = useState({});



  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);

  const handleToggleLocation = (location) => {
    setDesignLocations((prev) => ({
      ...prev,
      [location]: !prev[location],
    }));
  };

  const getclosures = async() =>{
    await axios.get('api/v1/property/closures')
    .then(response => setClosure(response.data.closures))
    .catch(error => console.error("Error fetching Closures:", error));
  }

  const getLinings = async() =>{
    // await axios.get('api/v1/property/linings')
    // .then(response => setLining(response.data.linings))
    // .catch(error => console.error("Error fetching Closures:", error));

    // setLining([...lining , "quilted lining", 
    //   "Plain cotton Lining",
    //   "Satin sublimated lining"])
  }


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => {
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    });

    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async() =>{
    
    if (
      !name ||
      !email ||
      !phone ||
      !country ||
      images.length === 0 ||
      !selectedProduct ||
      !selectedClosure
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    setLoader(true)
    // Create FormData to handle file uploads and other fields
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("country", country);
    formData.append("selectedProduct", selectedProduct);
    formData.append("zipoutLining", zipoutLining);
    formData.append("flapClosure", flapClosure);
    formData.append("quantity", quantity);
    formData.append("selectedClosure", selectedClosure);
    formData.append("selectedLining", selectedLining);
    formData.append("message", message);

    // Append design locations
    formData.append(`designLocations`, JSON.stringify(designLocations));
    

    // Append images
    for (const image of images) {
      formData.append('images', image.file);
    }

    try {
      // Send data to the backend
      const response = await axios.post("/api/v1/order/bulk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Form submitted successfully!");
      setLoader(false)
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting the form.");
      setLoader(false)
    }
  }
  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/bulkorder`)

    setMetaData(data?.metadata)
}

  useEffect(() => {
    getclosures()
    getLinings()
    getMetaTags()
    const timer = setTimeout(() => setIsVisible(true), 100); // Add a slight delay for animation
    return () => clearTimeout(timer);
      
  }, []);
  
  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      {loader ? <Loader/> :
      <div className="container py-5">
        {/* Heading */}
        <div className={`mt-5 py-5 ${isVisible ? "fade-in" : ""}`}>
          <h1 className="fs-1 fw-bold" style={{ fontSize: "90px" }}>
            Get Free Bulk Orders Quote
          </h1>
          <p>
            Easy Jackets is a leading manufacturer and supplier of custom varsity jackets, letterman jackets, bomber jackets, and hoodies. We supply custom jackets made of melton wool, cowhide leather, cotton fleece, and satin to the USA, Canada, and the rest of the world.
            <br />
            <br />
            Looking for custom varsity jackets for high schools, seniors class of 2020-2021, dance clubs, football and baseball teams? You are at the right place. We produce premium quality, affordable custom jackets. Our turnaround time is fast compared to others. We offer a huge discount on bulk/team orders depending upon the quantity and customizations on a garment. You can use the form below to specify your material requirements and customization on the custom seniors jackets, bomber jackets, hoodies, and sweatshirts. We usually require 2-4 weeks to produce 15-50 jackets depending upon the customization on a garment.
          </p>
        </div>

        {/* Product Selection */}
        <div className={`d-flex justify-content-center ${isVisible ? "fade-in" : ""}`}>
          <div className="w-50 mt-5">
            <div className="row">
              <div className="col-md-6 mb-3 text-uppercase fw-bold text-secondary">
                <label>Select Product:</label>
                <select
                  className="form-select"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  {[
  "Wool and Leather Varsity Jacket",
  "Wool Varsity Jacket",
  "Hooded Letterman Jacket",
  "Retro Letterman Jacket",
  "All Leather Varsity Jacket",
  "Cotton Twill Varsity Jacket",
  "Fleece Varsity Jacket",
  "Satin Varsity Jacket",
  "Softshell Varsity Jacket",
  "Satin Bomber Jacket",
  "Leather Bomber Jacket",
  "Nylon Bomber Jacket",
  "Softshell Bomber Jacket",
  "Cotton Twill Bomber Jacket",
  "Cropped Wool and Leather Varsity Jacket",
  "Cropped Wool Varsity Jacket",
  "Cropped Satin Jacket",
  "Nylon Coach Jacket",
  "Fleece Hoodie"
].map((c, i) => (
                  // <option key={i} value={c.name}>{c.name}</option>
                  <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3 text-uppercase fw-bold text-secondary">
                <label>Product Quantities (Minimum 10):</label>
                <input type="number" className="form-control" min="10" value={quantity} onChange={(e) =>     
                  setQuantity(e.target.value)} />
              </div>

          

              <div className="col-md-6 mb-3 text-uppercase fw-bold text-secondary">
                <label>Add 1/2 Zipout Lining:</label>
                <div className="btn-group d-flex">
                  <button
                    onClick={() => setZipoutLining(true)}
                    className={`btn btn-sm ${zipoutLining ? "btn-primary" : "btn-outline-secondary"} w-50`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setZipoutLining(false)}
                    className={`btn btn-sm ${!zipoutLining ? "btn-primary" : "btn-outline-secondary"} w-50`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="col-md-6 mb-3 text-uppercase fw-bold text-secondary">
                <label>FRONT CLOSURE:</label>
                <select
                  className="form-select"
                  value={selectedClosure}
                  onChange={(e) => setSelectedClosure(e.target.value)}
                >
                  {closure.map((c, i) => (
                  <option key={i} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3 text-uppercase fw-bold text-secondary">
                <label>Add Flap Closure:</label>
                <div className="btn-group d-flex">
                  <button
                    onClick={() => setFlapClosure(true)}
                    className={`btn btn-sm ${flapClosure ? "btn-primary" : "btn-outline-secondary"} w-50`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setFlapClosure(false)}
                    className={`btn btn-sm ${!flapClosure ? "btn-primary" : "btn-outline-secondary"} w-50`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="col-md-6 mb-3 text-uppercase fw-bold text-secondary">
                <label>Linings:</label>
                <select
                  className="form-select"
                  value={selectedLining}
                  onChange={(e) => setSelectedLining(e.target.value)}
                >
                  {["quilted lining", 
      "Plain cotton Lining",
      "Satin sublimated lining"].map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Design Location Selection */}
            <h3 className={`mb-4 ${isVisible ? "fade-in" : ""}`}>Select Custom Design Locations</h3>
            <div className={`row mb-5 ${isVisible ? "fade-in" : ""}`}>
              {Object.keys(designLocations).map((location) => (
                <div className="col-6 col-md-3 mb-3 text-uppercase fw-bold text-secondary" key={location}>
                  <label className="form-label">{location.replace(/([A-Z])/g, " $1")}</label>
                  <div className="btn-group d-flex">
                    <button
                      onClick={() => handleToggleLocation(location)}
                      className={`btn btn-sm ${designLocations[location] ? "btn-primary" : "btn-outline-secondary"} w-50`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => handleToggleLocation(location)}
                      className={`btn btn-sm ${!designLocations[location] ? "btn-primary" : "btn-outline-secondary"} w-50`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload Button spanning across 2 columns */}
              <div className="col-12 col-md-6 mb-3">
      <h6 className="text-uppercase fw-bold text-secondary">Upload Your Design</h6>
      <input 
        type="file" 
        className="form-control w-100" 
        multiple 
        accept="image/*" 
        onChange={handleImageChange} 
      />

      <div className="mt-3">
        {images.length > 0 && (
          <div className="row">
            {images.map((image, index) => (
              <div key={index} className="col-4 mb-2">
                <div style={{ position: 'relative' }}>
                  <img 
                    src={image.preview} 
                    alt={`Preview ${index}`} 
                    className="img-fluid" 
                    style={{ maxHeight: '150px', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: '5px',
                      right: '5px',
                      background: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
            </div>

            {/* Contact Information */}
            <div className="mb-5">
      <h2 className={`mb-4 text-start fw-bold ${isVisible ? 'fade-in' : ''}`}>Contact Information</h2>
      
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Please enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Phone:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Please enter your contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label>Country:</label>
            <Select
      options={countries}
      value={selectedCountry}
      onChange={(selectedOption) => {
        setSelectedCountry(selectedOption)
        setCountry(selectedOption.label)
      }
      }
    />
          </div>

          <div className="col-12 mb-3">
            <label>Message:</label>
            <textarea
              className="form-control"
              rows="3"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>

        <button onClick={handleSubmit} className="btn btn-warning">Get Free Quote</button>
    
       </div>

          </div>
        </div>
      </div>}

      <style jsx>{`
        .fade-in {
          opacity: 0;
          animation: fadeIn 0.5s forwards;
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </Layout>
  );
};

export default BulkOrders;
