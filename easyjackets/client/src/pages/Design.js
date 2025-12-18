import React, { useEffect , useState} from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";

const Design = () => {
  const [metaData , setMetaData] = useState({})

  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/design`)

    setMetaData(data?.metadata)
  }

  useEffect(()=>{
     getMetaTags()
  },[])

  return (
    <>
      <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
        <div className="container my-5">
          {/* Section One: Header */}
          <div className="text-center mb-5">
            <h1 className="fw-bold">How To Design Custom Jackets</h1>
          </div>

          {/* Section Two: Introduction */}
          <div className="mb-4">
            <p className="fs-5">
              A very unique and detailed feature has been introduced by
              easyjackets, where all of our customers can design their own
              jackets. Following is a description that helps and guides you as
              to how this amazing tool works and lets you design your dream
              jacket.
            </p>
            <h6>There are four jacket styles and designs to choose from:</h6>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-2">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  className="me-2"
                  width={"20px"}
                />
                Custom varsity jackets
              </li>
              <li className="d-flex align-items-center mb-2">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  className="me-2"
                  width={"20px"}
                />
                Custom bomber jackets
              </li>
              <li className="d-flex align-items-center mb-2">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  className="me-2"
                  width={"20px"}
                />
                Custom fleece jackets
              </li>
              <li className="d-flex align-items-center mb-2">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  className="me-2"
                  width={"20px"}
                />
                Custom coach jackets
              </li>
            </ul>
          </div>

          {/* Section Three: Jacket Image */}
          <div className="text-center mb-5">
            <img
              src="/PageImage/desing-image-1.jpg"
              width={"100%"}
              alt="jacket styles"
              className="rounded"
            />
          </div>

          {/* Section Four: Design Steps */}
          <div className="mb-5">
            <div className="step mb-4">
              <div className="d-flex align-items-center mb-5">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  width={"50px"}
                  className="me-3"
                />

                <div>
                  <h2 className="fw-bold mb-0" style={{ textAlign: "start" }}>
                    Step 1
                  </h2>
                  <p>
                    At first step, the tool will ask the customer which material
                    they want to choose for their jacket; here we will choose the famous cowhide leather.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <img
                  src="/PageImage/2-1.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
            </div>

            <div className="step mb-4">
              <div className="d-flex align-items-center mb-5">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  width={"50px"}
                  className="me-3"
                />

                <div>
                  <h2 className="fw-bold mb-0" style={{ textAlign: "start" }}>
                    Step 2
                  </h2>
                  <p>
                    One has to choose the style of the jacket; 6 different
                    styling options are available from different parts of the
                    jacket itself.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <p>1. Collar type: There are 6 various collar types to choose from; we choose the overlapped collar;</p>
                <img
                  src="/PageImage/3.jpg"
                  alt="Step 2"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p>2. Sleeve Style: Then there are 2 sleeve styles to choose from;</p>
                <img
                  src="/PageImage/4.jpg"
                  alt="Step 2"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p>3. Front Closure: Two options to choose from;</p>
                <img
                  src="/PageImage/5.jpg"
                  alt="Step 2"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p>4. Pocket Style: There are 6 options to choose from;</p>
                <img
                  src="/PageImage/6.jpg"
                  alt="Step 2"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p>5. Knit/Trim: There are 5 options to choose from;</p>
                <img
                  src="/PageImage/7.jpg"
                  alt="Step 2"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p>6. Lining: There are 3 options to choose from;</p>
                <img
                  src="/PageImage/8.jpg"
                  alt="Step 2"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
            </div>

            <div className="step mb-4">
              <div className="d-flex align-items-center mb-5">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  width={"50px"}
                  className="me-3"
                />

                <div>
                  <h2 className="fw-bold mb-0" style={{ textAlign: "start" }}>
                    Step 3
                  </h2>
                  <p>
                    Advance: There are various options available in this
                    particular category;
                  </p>
                </div>
              </div>
              <ol>
                <li>One can add a chest pocket</li>
                <li>Shoulder inserts are also available</li>
                <li>Piping is also available to be added.</li>
                <li>Cuffs pro/simple are also available.</li>
              </ol>
              <div className="text-center">
                <img
                  src="/PageImage/10.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
            </div>

            <div className="step mb-4">
              <div className="d-flex align-items-center mb-5">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  width={"50px"}
                  className="me-3"
                />

                <div>
                  <h2 className="fw-bold mb-0" style={{ textAlign: "start" }}>
                    Step 4
                  </h2>
                  <p>
                    The whole jacket’s body can be colored in accordance with
                    the customer choice.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <img
                  src="/PageImage/11.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p>
                  After choosing various colors for all options the following
                  could be a desired result;
                </p>
                <img
                  src="/PageImage/12.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
            </div>

            <div className="step mb-4">
              <div className="d-flex align-items-center mb-5">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  width={"50px"}
                  className="me-3"
                />

                <div>
                  <h2 className="fw-bold mb-0" style={{ textAlign: "start" }}>
                    Step 5
                  </h2>
                  <p>
                    Customers can also add their custom designs or patches on
                    certain areas of the jackets like the shoulder and arm area,
                    collar, etc.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <img
                  src="/PageImage/13.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p>
                  After choosing various colors for all options the following
                  could be a desired result;
                </p>
                <img
                  src="/PageImage/14.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
              <div className="text-center">
                <p > 
                  After choosing various colors for all options the following
                  could be a desired result;
                </p>
                <img
                  src="/PageImage/14.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
            </div>

            <div className="step mb-4">
              <div className="d-flex align-items-center mb-5">
                <img
                  src="/PageImage/check (1).png"
                  alt="check"
                  width={"50px"}
                  className="me-3"
                />

                <div>
                  <h2 className="fw-bold mb-0" style={{ textAlign: "start" }}>
                    Step 6
                  </h2>
                  <p>
                    Finally, customers can see their designed jacket and place
                    the order for the jacket to be made and delivered.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <img
                  src="/PageImage/15.jpg"
                  alt="Step 1"
                  className="img-fluid mb-4"
                  style={{ maxWidth: "80%", height: "auto" }} // Adjust size
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
export default Design