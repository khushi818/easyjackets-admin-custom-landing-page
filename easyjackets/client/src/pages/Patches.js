
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import banner from './images/upper-image.jpg';
import axios from 'axios';
// Array of image URLs
const images = [
  '/gridImage/1177-large_default_110x110@2x - Copy.jpg',
  '/gridImage/1178-large_default_1024x1024@2x.jpg',
  '/gridImage/1179-large_default_110x110@2x.jpg',
  'gridImage/1180-large_default_1024x1024@2x.jpg',
  'gridImage/1181-large_default_1024x1024@2x.jpg',
  '/gridImage/1182-large_default_1024x1024@2x.jpg',

];
const Patches= () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [metaData , setMetaData] = useState({})

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  
  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/patches`)

    setMetaData(data?.metadata)
   }

  const closeModal = () => {
    setSelectedImage(null);
  };

   useEffect(()=>{
    getMetaTags()
   },[])

  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <div className="mt-5">
        <h1 className="text-uppercase text-center">
          <span className="text-danger text-uppercase">Cowhide  </span>Leather
        </h1>
        <p className="text-center">
          Premium Quality Soft Full Grain 100% Real Cowhide Leather.
        </p>
        <div className="container">
          <div className="row">
            {images.map((image, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <img
                  src={image}
                  alt={`Leather ${index + 1}`}
                  className="img-fluid w-100"
                  onClick={() => handleImageClick(image)}
                  style={{ cursor: 'pointer', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>

        {selectedImage && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            onClick={closeModal}
          >
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      {images.map((image, index) => (
                        <div
                          className={`carousel-item ${image === selectedImage ? 'active' : ''}`}
                          key={index}
                        >
                          <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`} />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleIndicators"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Patches