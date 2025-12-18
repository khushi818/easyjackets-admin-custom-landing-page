import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/Cart";
import { useState } from "react";
import { Badge } from "antd";
import logoMain from "../../pages/images/Header-logo.png";
import "../../styles/Homepage.css";
import { FaCartArrowDown } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import styles from '../styles/layout/Header.module.css';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, _ ,customCart] = useCart();
  const categories = useCategory();
  const [isHovered, setIsHovered] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    sessionStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <>
      <div className="text-white bg-black " style={{ width : '100%' , padding : '5px' }}>
        <span style={{ display : 'flex' , flexDirection : 'row' , alignItems : 'center' , gap : '10px'}}> 
          <FaLocationDot/>{" "}123 Main Street Chicago, IL 60601 United States
          </span>
          </div>
      <nav className="navbar navbar-expand-lg bg-white glassy-navbar">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logoMain} alt="Logo" className="navbar-logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon navbar-dark" style= {{ color : '#000'}} />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav mb-2 mb-lg-0 mx-auto">
              <li className="nav-item">
                <NavLink to="/" className="nav-link custom-nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/AllProducts" className="nav-link custom-nav-link">
                  Shop
                </NavLink>
              </li>

              <li
                className="nav-item dropdown"
                onMouseEnter={() => handleMouseEnter("designJacket")}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`nav-link dropdown-toggle custom-nav-link ${activeDropdown === "designJacket" ? "show" : ""
                    }`}
                  aria-expanded={activeDropdown === "designJacket"}
                  style={{ cursor: "pointer" }}
                >
                  Design Your Jacket
                </div>
                <ul className={`dropdown-menu ${activeDropdown === "designJacket" ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item custom-dropdown-item" to="/how-to-design-jacket">
                      How To Design
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item custom-dropdown-item" to="/design-custom-jacket">
                      Design Custom Jacket
                    </Link>
                  </li>
                </ul>
              </li>

              <li
                className="nav-item dropdown"
                onMouseEnter={() => handleMouseEnter("guides")}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`nav-link dropdown-toggle custom-nav-link ${activeDropdown === "guides" ? "show" : ""
                    }`}
                  aria-expanded={activeDropdown === "guides"}
                  style={{ cursor: "pointer" }}
                >
                  Guides
                </div>
                <ul className={`dropdown-menu ${activeDropdown === "guides" ? "show" : ""}`}>
                  <li>
                    <Link className="dropdown-item custom-dropdown-item" to="/sizechart">
                      Size Chart
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item custom-dropdown-item" to="/varsity">
                      Varsity Jackets
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item custom-dropdown-item" to="/varsity-jackets-patches-embroideries">
                      Patches/Embroideries
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item custom-dropdown-item" to="/faq">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link to="/bulkorder" className="nav-link custom-nav-link">
                  Bulk Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link custom-nav-link">
                  About us
                </Link>
              </li>
              <li className="nav-item">
                <a href="https://blog.easyjackets.com" className="nav-link custom-nav-link">
                  Blogs
                </a>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link custom-nav-link">
                  Contact Us
                </Link>
              </li>
            </ul>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {auth?.user && (
                <li className="nav-item dropdown">
                  <NavLink
                    className="nav-link dropdown-toggle custom-nav-link"
                    to="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    style={{ cursor: "pointer" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                  </NavLink>
                  <ul className="dropdown-menu custom-dropdown-menu">
                    <li>
                      <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item custom-dropdown-item">
                      <button className={styles.pbutton}> Dashboard</button>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink onClick={handleLogout} to="/login" className="dropdown-item custom-dropdown-item">
                      <button className={styles.sbutton}>Logout</button>
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
                {/* Cart Icon */}
                <li className="nav-item" style={{ paddingRight : '10px'}}>
                <Badge count={cart?.length + customCart?.length} showZero style={{ marginTop :'15px'}}>
                  <NavLink to="/cart" className="nav-link custom-nav-link cart-link">
                    <FaCartArrowDown className="cart-icon" />
                  </NavLink>
                </Badge>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link custom-nav-link">
                      <button className={styles.pbutton}>Register</button>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link custom-nav-link">
                    <button className={styles.sbutton}>Login</button>
                    </NavLink>
                  </li>
                </>
              ) : null}

            
            </ul>
          </div>
        </div>
      </nav>

      {/* Add Glassy Navbar Styles */}
      <style jsx>{`
       

        .custom-nav-link.cart-link {
          display: flex;
          align-items: center;
        }

        .cart-icon {
          font-size: 1.2rem; /* Adjust size as needed */
          /* Adjust margin to balance spacing */
          vertical-align: baseline;
          margin-top :15px;
        }

        .custom-nav-link {
          transition: color 0.3s ease;
        }

        .custom-nav-link:hover {
          color: #007bff; /* Change to your desired hover color */
        }

        .custom-dropdown-item {
          transition: background-color 0.3s ease;
        }

        .custom-dropdown-item:hover {
          background-color: #f1f1f1; /* Change to your desired hover background color */
        }

        .custom-dropdown-menu {
          position: absolute;
          z-index: 1000;
        }
          .glassy-navbar {
  position: sticky;
  top: 0;
  z-index: 9999;
  width: 100%;
backdrop-filter: blur(10px); /* Glassy effect */
  border-bottom: 1px solid rgba(0, 0, 0, 0.5); /* Semi-transparent black bottom border */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
}

      `}</style>
    </>
  );
};

export default Header;
