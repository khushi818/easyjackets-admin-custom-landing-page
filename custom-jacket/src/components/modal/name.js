import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import SelectBox from "../selectBox";
import Fonts from "../dropdown";

import { designColor, chooseName } from "../../store/actions";
import { fixTextSize } from "../../utils";

const Name = ({
  defaults,
  globals,
  part,
  designs,
  colors,
  materials,
  updateColor,
  updateName,
}) => {

  if(Object.keys(designs).length === 4) { 
    designs = { ...designs ,  'Front Center': {},

    'Right Chest': {},
    'Left Chest': {},
  
    // 'Right Chest Verticle': {},
    // 'Left Chest Verticle': {},
  
    'Right Sleeve': {},
    'Left Sleeve': {},
  
    'Right Sleeve End': {},
    'Left Sleeve End': {},
  
    'Right Pocket': {},
    'Left Pocket': {},
  
    'Back Top': {},
    'Back Middle': {},
    'Back Bottom': {}
  }
}

  const svgText = useRef(null);
  const svgText1 = useRef(null);

  const hideNameApp = [
    "Front Center",
    "Back Top",
    "Back Middle",
    "Back Bottom",
  ];

  const [name, setName] = useState(designs[part]?.name?.title);
  const [view, setView] = useState(
    designs[part]?.name?.appearance || "Straight"
  );
  const [cPanel, setCpanel] = useState(false);
  const [colPart, setColPart] = useState("fill");

  let props = {
    width: "240",
    height: "54",
    viewBox: "0 0 73 82",
  };

  if (part === "Front Center") {
    props.width = "267";
    props.height = "44.92";
    props.viewBox = "0 0 267 44.92";
  } else if (part === "Back Top") {
    props.width = "230";
    props.height = "45";
    props.viewBox = "0 0 260 45";
  } 
   else if (part === "Back Bottom"){
    props.width = "230";
    props.height = "45";
    props.viewBox = "0 0 200 48";
   }
  else if (part === "Back Middle") {
    props.width = "190";
    props.height = "190";
    props.viewBox = "0 0 260 45";
  } else if (part === "Left Sleeve" || part === "Right Sleeve") {
    props.width = "178";
    props.height = "200";
    props.viewBox = "0 0 72 72";
  } else if (part === "Left Sleeve End" || part === "Right Sleeve End") {
    props.width = "178";
    props.height = "200";
    props.viewBox = "0 0 42 42";
  }

  useEffect(() => {
    fixTextSize(svgText, svgText1, "name", props.viewBox, view === "Arc", name);
  }, [props.viewBox, view, name]);

  const nameFun = (val) => {
    if (part === "Left Sleeve" || part === "Right Sleeve" || part === "Left Sleeve End" || part === "Right Sleeve End") {
      if (val.length <= 8) {
        setName(val);
        fixTextSize(
          svgText,
          svgText1,
          "name",
          props.viewBox,
          view === "Arc",
          name
        ).then((size) => {
          updateName("title", val, part, size);
        });
      }
      return;
    }
    if (val.length <= 12) {
      setName(val);
      fixTextSize(
        svgText,
        svgText1,
        "name",
        props.viewBox,
        view === "Arc",
        name
      ).then((size) => {
        updateName("title", val, part, size);
      });
    }
  };

  const viewFun = (val) => {
    setView(val);
    fixTextSize(
      svgText,
      svgText1,
      "name",
      props.viewBox,
      val === "Arc",
      name
    ).then((size) => {
      updateName("appearance", val, part, size);
    });
  };

  const fontChange = () => {
    fixTextSize(
      svgText,
      svgText1,
      "name",
      props.viewBox,
      view === "Arc",
      name
    ).then((size) => {
      updateName("size", name, part, size);
    });
  };

  const viewCbox = (val) => {
    val === colPart && cPanel ? setCpanel(false) : setCpanel(true);
    setColPart(val);
  };


  return (
    <div className="cjd-modal-form-wrapper">
      <div className="cjd-row">
        <div className="cjd-modal-half">
          <div className="cjd-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              value={name || ""}
              onChange={(e) => nameFun(e.target.value)}
              className="cjd-form-control"
              placeholder={
                part === "Left Sleeve" || part === "Right Sleeve" || part === "Left Sleeve End" || part === "Right Sleeve End"
                  ? "Write Name (Max 8 Char)"
                  : "Write Name (Max 12 Char)"
              }
            />
          </div>

          <div className="cjd-form-group">
            <label htmlFor="font">Select Font</label>
            <Fonts
              part={part}
              className="cjd-form-control"
              fixFont={() => fontChange()}
            />
          </div>

          {hideNameApp.includes(part) && (
            <div className="cjd-form-group cjd-btn-group">
              <label htmlFor="font">Appearance</label>
              <div
                className={`cjd-btn ${view === "Arc" && "cjd-btn-secondary"}`}
                onClick={() => viewFun("Straight")}
              >
                Straight
              </div>
              <div
                className={`cjd-btn ${
                  view === "Straight" && "cjd-btn-secondary"
                }`}
                onClick={() => viewFun("Arc")}
              >
                Arc
              </div>
            </div>
          )}
        </div>

        <div className="cjd-modal-half">
          <div
            className="cjd-mock-preview"
            style={{
              background:
                part === "Right Sleeve" ||
                part === "Left Sleeve" ||
                part === "Right Sleeve End" ||
                part === "Left Sleeve End"
                  ? colors.sleeves
                  : colors.body,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="cjd-name-area"
              {...props}
            >
              {part === "Back Bottom" ? (
                <path
                  id="modalFrontArt"
                  d="M-90,190.9c26.2,25.9,62.2,41.9,102,41.9c39.8,0,75.8-16,102-41.9"
                  fill="none"
                  style={{ transform: "translate(83px, -182px)" }}
                />
              ) : (
                <path
                  id="modalFrontArt"
                  d="M144.1,100c23.6-30.4,60.5-50,102-50c41.5,0,78.4,19.6,102,50"
                  className="cjd-name-path"
                  style={{ transform: "translate(-112px, -36.86px)" }}
                ></path>
              )}

              {part === "Left Sleeve" || part === "Right Sleeve" ? (
                <>
                  <text
                    x="50%"
                    y="50%"
                    dy={name?.length > 4 ? "-1.25rem" : ""}
                    fontFamily={designs.font}
                    fill={designs.fill}
                    stroke={designs.stroke}
                    strokeWidth="1.5"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    total_char={name?.length || 0}
                    ref={svgText}
                  >
                    <tspan alignmentBaseline="middle">
                      {name?.substr(0, 4)}
                    </tspan>
                  </text>
                  <text
                    x="50%"
                    y="50%"
                    dy="1.0rem"
                    fontFamily={designs.font}
                    fill={designs.fill}
                    stroke={designs.stroke}
                    strokeWidth="1.5"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    total_char={name?.length || 0}
                    ref={svgText1}
                  >
                    <tspan alignmentBaseline="hanging">{name?.substr(4)}</tspan>
                  </text>
                </>
              ) : (
                <text
                  x={view === "Arc" ? "0" : "50%"}
                  y={view === "Arc" ? "0" : "50%"}
                  fontFamily={designs.font}
                  fill={designs.fill}
                  stroke={
                    part === "Front Center" ||
                    part === "Back Middle" ||
                    part === "Back Top" ||
                    part === "Back Bottom" ||
                    part === "Right Sleeve" ||
                    part === "Right Sleeve End" ||
                    part === "Left Sleeve" ||
                    part === "Left Sleeve End"
                      ? designs.stroke
                      : "none"
                  }
                  borderColor={
                    part === 'Front Center' ||
                      part === 'Back Middle'
                      ? designs.border
                      : 'none'
                  }

                  strokeWidth={
                    part === "Front Center" || part === "Back Middle"
                      ? "5.5"
                      : "1.5"
                  }
                  textAnchor="middle"
                  dominantBaseline="middle"
                  total_char={name?.length + 1 || 0}
                  ref={svgText}
                >
                  {view === "Arc" ? (
                    <textPath
                      alignmentBaseline="middle"
                      xlinkHref="#modalFrontArt"
                      startOffset="50%"
                      style={{letterSpacing:'5px'}}
                    >
                      {name}
                    </textPath>
                  ) : (
                    <tspan alignmentBaseline="middle">{name}</tspan>
                  )}
                </text>
              )}
            </svg>
          </div>

          <div
            className="cjd-preview-colors-wrapper cjd-multiple"
            data-color="pink"
          >
            <div
              className="cjd-color-selector"
              onClick={() => viewCbox("fill")}
            >
              <div
                className="cjd-color-pointer"
                style={{ backgroundColor: designs.fill }}
              ></div>
              <span>Fill</span>
            </div>

            {(part === "Front Center" ||
              part === "Back Middle" ||
              part === "Back Top" ||
              part === "Back Bottom" ||
              part === "Right Chest" ||
              part === "Left Chest" ||
              // part === "Right Sleeve" ||
              part === "Right Sleeve End" ||
              // part === "Left Sleeve" ||
              part === "Left Sleeve End") && (
              <div
                className="cjd-color-selector"
                onClick={() => viewCbox("stroke")}
              >
                <div
                  className="cjd-color-pointer"
                  style={{ backgroundColor: designs.stroke }}
                ></div>
                <span>Stroke</span>
              </div>
            )}

            {/* {(part === 'Front Center' ||
              part === 'Back Middle') && (
                <div
                  className="cjd-color-selector"
                  onClick={() => viewCbox('border')}
                >
                  <div
                    className="cjd-color-pointer"
                    style={{ backgroundColor: designs.border }}
                  ></div>
                  <span>Border</span>
                </div>
              )} */}

            {cPanel && (
              <div className="cjd-color-box">
                <label className="cjd-note">
                  <span>Select {colPart} Color</span>
                  <div
                    className="cjd-close-color-box"
                    onClick={() => setCpanel(false)}
                  >
                    {" "}
                    ×{" "}
                  </div>
                </label>

                <div className="cjd-colors-list">
                  <div className="cjd-select-wrapper cjd-single">
                    {defaults.colors.map(({ name, code}, key) => {
                      // const check = JSON.parse(mid);
                      // if (check.includes(materials.body)) {
                      return (
                        <SelectBox
                          key={key}
                          type={colPart}
                          label={code}
                          tooltip={name}
                          current={designs[colPart]}
                          colors={true}
                          dispatch={(type, label) => updateColor(type, label)}
                        />
                      );
                      // } else {
                      //   return null;
                      // }
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  defaults: state.defaults,
  globals: state.globals,
  designs: state.designs,
  colors: state.colors,
  materials: state.materials,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateColor: (key, val) => dispatch(designColor(key, val)),
  updateName: (key, val, part, font, tab = "name") =>
    dispatch(chooseName(key, val, part, font, tab)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Name);
