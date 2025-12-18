import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Custom_jacket } from '../constants/url';
import { useNavigate } from 'react-router-dom';
import useCategory from '../hooks/useCategory';
import axios from 'axios';

 const DesignCustomJacket = () => {
  const  categories = useCategory()
  const [metaData , setMetaData] = useState({})

  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/customdesign`)

    setMetaData(data?.metadata)
}
   
  useState(() =>{
     getMetaTags()
  },[])

  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <div className="m-5">
        <div className="mb-2">
          <h1>Design Your Own Jacket</h1>
          <p className="mb-5">
          EasyJackets leads the state of the art Jacket Design Lab which serves as a unique platform to help you design your very own custom made varsity jackets. Choose your own material and combination, add your favorite colors and names upload patches or add ready to use mascots. 
          This is your place to create your own custom made style. You can select materials, sleeves styles, plain or quilted lining, zip-up or button closure to design for yourself a unique style varsity jacket. We use top premium high quality fabrics and a wide range of colors to construct your creation and help you live the dream! Go creative!    </p>
        </div>
        <hr />
        <div className='mb-5'>
          <h2 className="text-start">Select Jacket Style</h2>
          <p>Select a jacket style and design it.</p>
          <div className="row row-cols-1 row-cols-md-5 g-4">
            {categories.map((category, index) => (
              <JacketCard key={index} jacket={category} />
            ))}
          </div>
        </div>
        <h1>FAQs - How to design a jacket?</h1>
        <BootstrapAccordion/>
        <hr/>
        <div>
<CustomerReviews/>
        </div>
      </div>
    </Layout>
  );
};

const JacketCard = ({ jacket }) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
 const navigate = useNavigate()
  return (
    <div className="col">
      <div
        className="card position-relative text-center shadow-sm"
        style={{ height: '300px', width: '100%', overflow: 'hidden' }}
     
      >
        <img
          src={jacket.image}
          alt={jacket.name}
          className="card-img-top"
          style={{ height: '180px', objectFit: 'contain' }}
        />
       
          <button
            className="btn btn-primary position-absolute"
            style={{
              left: '50%',
              bottom: '30px',
              transform: 'translateX(-50%)',
            }}
            onClick={(e) =>{
              e.preventDefault()
              window.location.href = `${Custom_jacket}/?id=${jacket.code}`
            }}
          >
            DESIGN NOW
          </button>
        
        <div className="card-body">
          <div className="card-title">{jacket.name}</div>
          <div>
            <span className="text-muted text-decoration-line-through">{jacket.originalPrice}</span>{' '}
            {/* <span className="text-danger">{jacket.s}</span> */}
          </div>
        </div>
      </div>
    
    </div>
   
  );
};

const BootstrapAccordion = () => {
  return (
    <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
            How do I start designing?
          </button>
        </h2>
        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Start by selecting a jacket style from the options above. Once you've selected a style, you can begin customizing it by choosing materials, colors, and adding personal touches like names or patches.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            What materials are available?
          </button>
        </h2>
        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            We offer a range of high-quality materials, including fleece, leather, and wool, all available in a variety of colors to suit your design needs.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
            How long does it take to receive my custom jacket?
          </button>
        </h2>
        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
          <div className="accordion-body">
            Typically, it takes around 2-4 weeks to receive your custom jacket, depending on the complexity of your design and our current production schedule.
          </div>
        </div>
      </div>
    </div>
  );
};


export const CustomerReviews = () => {
  const reviews = [
    {
      text: 'Best quality custom jacket and quick turnaround. I love their quality and price. Clothoo is the best!',
      name: 'Melo Luminus MG',
      location: 'United States',
    },
    {
      text: 'Highly recommend for custom letter jacket. I designed letterman jacket online and within 3 weeks I received the jacket. I love the embroidery details.',
      name: 'Torrence Hatch',
      location: 'United States',
    },
    {
      text: 'Great customer service and high quality varsity jacket. They showed us photos prior to shipping. It looked awesome in pictures and my daughter loved her gift!',
      name: 'Connie Mueller',
      location: 'United States',
    },
  ];

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h3 className="mb-4">Customer Reviews</h3>
        </div>
        {reviews.map((review, index) => (
          <div className="col-md-4 mb-3" key={index}>
            <div className="card h-100 p-3" style={{ backgroundColor: '#f8f9fa', border: 'none' }}>
              <p className="card-text">{review.text}</p>
              <div className="mt-4">
                <strong>{review.name}</strong><br />
                <small className="text-muted">{review.location}</small>
              </div>
            </div>
          </div>
        ))}
        <div className="col-12 text-end mt-3">
          <a href="#more-reviews" className="btn btn-link">MORE REVIEWS &gt;</a>
        </div>
      </div>
    </div>
  );
};

export default DesignCustomJacket