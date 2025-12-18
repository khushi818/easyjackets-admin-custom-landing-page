import React from "react";
import Layout from "../components/layout/Layout";
import "../styles/Homepage.css";
import W1 from "../../src/pages/images/w1.webp";
import W2 from "../../src/pages/images/w2.webp";
import W3 from "../../src/pages/images/w3.webp";
import W4 from "../../src/pages/images/w4.webp";
import W5 from "../../src/pages/images/w5.webp";
import W6 from "../../src/pages/images/w6.webp";
const OurWork = () => {
  return (
    <Layout title={"Our Work "}>
      <div
        style={{
          width: "100%",
          fontFamily: "'Times New Roman', Times, serif",
          color: "#333",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "3em",
            margin: "20px 0",
            letterSpacing: "2px",
          }}
        >
          Our Work
        </h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2%",
          }}
        >
          <img
            style={{
              width: "30%",
              margin: "10px",
              transition: "transform 0.3s ease",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            src={W1}
            alt="banner"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            style={{
              width: "30%",
              margin: "10px",
              transition: "transform 0.3s ease",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            src={W2}
            alt="banner"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            style={{
              width: "30%",
              margin: "10px",
              transition: "transform 0.3s ease",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            src={W3}
            alt="banner"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "2%",
            marginTop: "20px",
          }}
        >
          <img
            style={{
              width: "30%",
              margin: "10px",
              transition: "transform 0.3s ease",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            src={W4}
            alt="banner"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            style={{
              width: "30%",
              margin: "10px",
              transition: "transform 0.3s ease",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            src={W5}
            alt="banner"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <img
            style={{
              width: "30%",
              margin: "10px",
              transition: "transform 0.3s ease",
              border: "1px solid #ddd",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            src={W6}
            alt="banner"
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </div>
      </div>
    </Layout>
  );
};

export default OurWork;
