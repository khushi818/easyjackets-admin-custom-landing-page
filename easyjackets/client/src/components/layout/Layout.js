import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children, title, description, keywords, author }) => {
  const location = useLocation();
  const [inProp, setInProp] = useState(true);

  useEffect(() => {
    setInProp(false);
    const timeoutId = setTimeout(() => setInProp(true), 300); // Wait for fade-out to complete

    return () => clearTimeout(timeoutId);
  }, [location]);

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>

      <Header />

      {/* Main Content with Smooth Transition */}
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <div className="content-wrapper">{children}</div>
          </CSSTransition>
        </TransitionGroup>
      </main>

      <Footer />

      <style jsx>{`
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecommerce jackets - shop now",
  description: "Get Your Customised Jackets",
  keywords: "customised, classy, jackets",
  author: "Ecommerce Jackets",
};

export default Layout;
