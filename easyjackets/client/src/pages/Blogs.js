import React,{ useState , useEffect} from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';

const Blogs = () => {
  const [metaData , setMetaData] = useState({})
  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/blogs`)

    setMetaData(data?.metadata)
}
  useEffect(() =>{
    getMetaTags()
 },[])
  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
      <div className="container mt-5">
        {/* Heading */}
        <div className="text-center mb-5">
          <h1 className="display-3 fade-in">The Blog</h1>
          {/* Blog Categories */}
          <div className="d-flex justify-content-center">
            <a href="https:example.com" className="mx-3 text-dark text-decoration-none">ALL</a>
            <a href="https:example.com" className="mx-3 text-dark text-decoration-none">EASY JACKETS</a>
            <a href="https:example.com" className="mx-3 text-dark text-decoration-none">UNCATEGORIZED</a>
          </div>
        </div>

        <div className="row mb-5">
          {/* First Row */}
          <div className="col-lg-8 fade-in">
            <div className="card card-animate">
              <img
                src="/blogImage/Tips-and-Tricks.jpg"
                className="card-img-top"
                alt="Styling Varsity Jackets"
              />
              <div className="card-body">
                <h5 className="card-title">Styling Varsity Jackets in Fall 2023</h5>
                <p className="card-text">
                  A great way to show school spirit and pride, and it is fashionable and...
                </p>
                <a href="https:example.com" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>
                  Continue Reading
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 fade-in">
            <div className="card card-animate mb-4">
              <img
                src="/blogImage/pop-jackets.jpg"
                className="card-img-top"
                alt="The Impact of Varsity Jackets on Pop Culture 2022"
              />
              <div className="card-body">
                <h5 className="card-title">
                  The Impact of Varsity Jackets on Pop Culture 2022
                </h5>
                <a href="https:example.com" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>
                  Continue Reading
                </a>
              </div>
            </div>

            <div className="card card-animate fade-in">
              <img src="/blogImage/Varsity-Jackets-blog.jpg" className="card-img-top" alt="Varsity Jackets" />
              <div className="card-body">
                <h5 className="card-title">Varsity Jackets</h5>
                <a href="https:example.com" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>
                  Continue Reading
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="row">
          <div className="col-lg-4 fade-in">
            <div className="card card-animate">
              <img src="/blogImage/pop-jackets.jpg" className="card-img-top" alt="Test Post" />
              <div className="card-body">
                <h5 className="card-title">Test Post</h5>
                <a href="https:example.com" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>
                  Continue Reading
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 fade-in">
            <div className="card card-animate">
              <img src="/blogImage/edc748b4a4eebaa4a0f786ad7f1910b4-1.jpg" className="card-img-top" alt="News Two" />
              <div className="card-body">
                <h5 className="card-title">News Two</h5>
                <p className="card-text">Lorem ipsum test page blog</p>
                <a href="https:example.com" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>
                  Continue Reading
                </a>
              </div>
            </div>
          </div>

          <div className="col-lg-4 fade-in">
            <div className="card card-animate">
              <img src="/blogImage/4 (1).jpg" className="card-img-top" alt="Varsity Jacket" />
              <div className="card-body">
                <h5 className="card-title">Varsity Jacket</h5>
                <p className="card-text">hhhhhhhhhhhhhh</p>
                <a href="https:example.com" className="btn" style={{ backgroundColor: '#000', color: '#fff' }}>
                  Continue Reading
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .fade-in {
          animation: fadeIn 2s ease-in-out;
        }

        .card-animate {
          transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }

        .card-animate:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem;
          }
          .card {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Blogs