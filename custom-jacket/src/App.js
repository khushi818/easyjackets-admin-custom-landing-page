import React from "react";
import { connect } from "react-redux";
import WebFont from "webfontloader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tab, Tabs,   TabList, TabPanel } from "react-tabs";

import {
  currentTab,
  changePose,
  selectMaterial,
  activeSidebar,
  updateGlobals,
  modalState,
} from "./store/actions";

import Header from "./components/Header";

import Loader from "./components/loader";
import Jacket from "./components/Jacket";
import JacketBack from "./components/Jacket/back";
import JacketLeft from "./components/Jacket/left";
import JacketRight from "./components/Jacket/right";

import Coach from "./components/coach";
import CoachBack from "./components/coach/back";
import CoachLeft from "./components/coach/left";
import CoachRight from "./components/coach/right";

import Styles from "./components/styles";
import Materials from "./components/materials";
import Colors from "./components/colors";
import Designs from "./components/designs";
import Sizes from "./components/sizes";
import Advance from "./components/advance";
import PopUp from "./components/modal/popup";
import SaveDesign from "./components/modalSave";

import ViewFront from "./assets/images/view-front.svg";
import ViewBack from "./assets/images/view-back.svg";
import ViewSide from "./assets/images/view-side.svg";

import BadgeIcon from "./components/icons/badgeIcon";
import StyleIcon from "./components/icons/styleIcon";
import AdvanceIcon from "./components/icons/advanceIcon";
import ColorIcon from "./components/icons/colorsIcon";
import DesignIcon from "./components/icons/designIcon";
import SizeIcon from "./components/icons/sizeIcon";
import HamburgerIcon from "./components/icons/hamburgerIcon";
import JacketIcon from "./components/icons/jacketIcon";

import "./css/App.scss";
import { faCoffee, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

WebFont.load({
  google: {
    families: [
      "Source+Sans+Pro",
      "Courgette",
      "Cutive",
      "Graduate",
      "Lobster+Two",
      "Merienda+One",
      "Montserrat",
      "Open+Sans",
      "Oswald",
      "Pinyon+Script",
      "Satisfy",
    ],
  },
});

const App = ({
  globals,
  jackets,
  styles,
  materials,
  colors,
  designs,
  sizes,
  activeTab,
  changePose,
  popup,
  selectMaterial,
  pricing,
  activeSidebar,
  advance,
  updateGlobals,
  modalState,
  defaults,
}) => {
  if (globals.loading)
    return <Loader msg="Wait while we prepare the custom experience for you" />;
  const [openSideBar, setOpenSideBar] = React.useState(true);
  const svgContainerStyle = { paddingRight: "10px", paddingLeft: "20px" };
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768);
  const [currentTab, setCurrentTab] = React.useState();
  const [isActive, setIsActive] = React.useState(true);

  const onClickTab = (value) => {
    if (value == currentTab) {
      setCurrentTab(0);
    } else {
      setCurrentTab(value);
    }
  };

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header />
      <div className="cjd-main">
        <div
          className="panel-desktop"
          style={{ width: "40%" }}
        >
          <div
            className={
              currentTab === 1 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(1)}
          >
            <span class="step-title">
              <strong>Materials</strong> Style
            </span>
            <FontAwesomeIcon icon={currentTab === 1 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 1 && (
            <div className="control-box-control">
              <Materials />
            </div>
          )}

          {globals.catName === "Hoodies" ||
          globals.catName === "Coach Jackets" ? (
            <></>
          ) : (
            <>
              <div
                className={
                  currentTab === 2 ? "control-box activeBox" : "control-box"
                }
                onClick={() => onClickTab(2)}
              >
                <span class="step-title">
                  <strong>Advance</strong> Options
                </span>
                <FontAwesomeIcon icon={currentTab === 2 ? faMinus : faPlus} />
              </div>
              {isActive && currentTab === 2 && (
                <div className="control-box-control">
                  <Advance />
                </div>
              )}
            </>
          )}  

          <div
            className={
              currentTab === 3 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(3)}
          >
            <span class="step-title">
              <strong>Add</strong> Colors
            </span>
            <FontAwesomeIcon icon={currentTab === 3 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 3 && (
            <div className="control-box-control">
              <Colors />
            </div>
          )}
          <div
            className={
              currentTab === 4 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(4)}
          >
            <span class="step-title">
              <strong>Add</strong> Design
            </span>
            <FontAwesomeIcon icon={currentTab === 4 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 4 && (
            <div className="control-box-control">
              <Designs />
            </div>
          )}
          <div
            className={
              currentTab === 5 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(5)}
          >
            <span class="step-title">
              <strong>Select</strong> Size
            </span>
            <FontAwesomeIcon icon={currentTab === 5 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 5 && (
            <div className="control-box-control">
              <Sizes />
            </div>
          )}
        </div> 

        <div className="cjd-content-wrapper">
          <div className="cjd-jacket-guides">
            <span>Guides</span>
            <div
              href="#"
              className={`cjd-toggle-guides ${
                globals.guides && "cjd-guides-on"
              }`}
              onClick={() => updateGlobals("guides", !globals.guides)}
            >
              {globals.guides ? "ON" : "OFF"}
            </div>
          </div>

          {globals.catName === "Coach Jackets" ? (
            <>
              {<Coach pose={globals.pose === "front"}/>}
              {<CoachBack pose={globals.pose === "back"}/>}
              {<CoachLeft pose={globals.pose === "left"}/>}
              {<CoachRight pose={globals.pose === "right"}/>}
            </>
          ) : (
            <>
              <Jacket pose={globals.pose === "front"} />
              <JacketBack pose={globals.pose === "back"} />
              <JacketLeft pose={globals.pose === "left"} />
              <JacketRight pose={globals.pose === "right"} />
            </>
          )}
        </div> 

        <div className="cjd-jacket-nav outer">
          <div
            className={`cjd-nav-item ${
              globals.pose === "front" && "cjd-active-nav"
            }`}
            onClick={() => changePose("front")}
          >
            <img src={ViewFront} alt="Front View" />
          </div>
          <div
            className={`cjd-nav-item ${
              globals.pose === "back" && "cjd-active-nav"
            }`}
            onClick={() => changePose("back")}
          >
            <img src={ViewBack} alt="Front Back" />
          </div>
          <div
            className={`cjd-nav-item ${
              globals.pose === "left" && "cjd-active-nav"
            }`}
            onClick={() => changePose("left")}
          >
            <img src={ViewSide} alt="Left Side" />
          </div>
          <div
            className={`cjd-nav-item ${
              globals.pose === "right" && "cjd-active-nav"
            }`}
            onClick={() => changePose("right")}
          >
            <img
              src={ViewSide}
              alt="Right Side"
              style={{ transform: "scaleX(-1)" }}
            />
          </div>
        </div> 

        <div className="panel-mbl">
          <div
            className={
              currentTab === 1 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(1)}
          >
            <span class="step-title">
              <strong>Materials</strong> Style
            </span>
            <FontAwesomeIcon icon={currentTab === 1 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 1 && (
            <div className="control-box-control">
              <Materials />
            </div>
          )}

          <div
            className={
              currentTab === 2 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(2)}
          >
            <span class="step-title">
              <strong>Advance</strong> Options
            </span>
            <FontAwesomeIcon icon={currentTab === 2 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 2 && (
            <div className="control-box-control">
              <Advance />
            </div>
          )} 
               
          <div
            className={
              currentTab === 3 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(3)}
          >
            <span class="step-title">
              <strong>Add</strong> Colors
            </span>
            <FontAwesomeIcon icon={currentTab === 3 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 3 && (
            <div className="control-box-control">
              <Colors />
            </div>
          )} 

          <div
            className={
              currentTab === 4 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(4)}
          >
            <span class="step-title">
              <strong>Add</strong> Design
            </span>
            <FontAwesomeIcon icon={currentTab === 4 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 4 && (
            <div className="control-box-control">
              <Designs />
            </div>
          )}

          <div
            className={
              currentTab === 5 ? "control-box activeBox" : "control-box"
            }
            onClick={() => onClickTab(5)}
          >
            <span class="step-title">
              <strong>Select</strong> Size
            </span>
            {currentTab === 5}
            <FontAwesomeIcon icon={currentTab === 5 ? faMinus : faPlus} />
          </div>
          {isActive && currentTab === 5 && (
            <div className="control-box-control">
              <Sizes />
            </div>
          )} 
        </div> 
      </div> 

      <PopUp />
      <SaveDesign />
      
    </>
  );
};

const mapStateToProps = (state) => ({
  globals: state.globals,
  defaults: state.defaults,
  jackets: state.jackets,
  designs: state.designs,
  styles: state.styles,
  materials: state.materials,
  colors: state.colors,
  sizes: state.sizes,
  popup: state.popup,
  pricing: state.pricing,
  advance: state.advance,
});

const mapDispatchToProps = (dispatch) => ({
  activeTab: (tab) => dispatch(currentTab(tab)),
  changePose: (val) => dispatch(changePose(val)),
  selectMaterial: (val) => dispatch(selectMaterial(val)),
  activeSidebar: (idx) => dispatch(activeSidebar(idx)),
  updateGlobals: (key, val) => dispatch(updateGlobals(key, val)),
  modalState: (key, val) => dispatch(modalState(key, val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
