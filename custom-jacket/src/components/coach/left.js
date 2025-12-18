import React from "react";
import { connect } from "react-redux";

import { modalState, activeSidebar, colorPicker } from "../../store/actions";
import BadgeTemp from "../Jacket/badge";

const CoachLeft = ({
  globals,
  advance,
  activeSidebar,
  colorPicker,
  modalState,
  styles,
  materials,
  colors,
  designs,
  pose
}) => {
  const openModal = (tab) => {
    modalState("title", tab);
    modalState("open", true);
    activeSidebar(3);

    if (designs[tab]?.done) {
      if (designs[tab]?.name) modalState("index", 0);
      else if (designs[tab]?.letters) modalState("index", 1);
      else if (designs[tab]?.editables) modalState("index", 1);
      else if (designs[tab]?.symbol) modalState("index", 2);
    } else {
      modalState("index", 0);
    }
  };

  return (
    <svg
      id="jacketLeft"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -28 225 602"
      className={pose ? "" : "cjd-hide"}
    >
      <g
        fill={colors.body ? colors.body : "#ffffff"}
        className="cjd-color-hover"
        onClick={() => colorPicker("body")}
      >
        <path
          d="M29.33,527.62c-12.95-3.41-19.48-10.86-16.89-24.89C14.3,492.64,1.52,369,3.34,333.13,5,300,7.61,266.54,4.74,233.66c-4.11-47,8-89.22,27.82-130.38,9.19-19.06,18.84-37.9,28.06-56.95,1-2,114.76-31.84,124.8-15.82,38.44,61.32,48,127.16,38.23,197.43-9.2,66.48-15.53,265.53-15.15,273.41.5,10.22-3.63,16.11-12.48,20.67-25.67,13.23-53.6,16-81.58,17.48C74.13,540.5,32.4,528.43,29.33,527.62Z"
          transform="translate(-2.66 -1.76)"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.44,500c31.72,36.92,171.44,14.43,195.93-4.46"
          transform="translate(-2.66 -1.76)"
          stroke="#000"
          strokeMiterlimit="10"
        />
      </g>

      {styles.sleeves === "Set-In" && (
        <g
          fill={colors.sleeves ? colors.sleeves : "#ffffff"}
          className="cjd-color-hover"
          onClick={() => colorPicker("sleeves")}
        >
          <path
            d="M90.91,98.53c-8.4,10.68-15.37,26.29-17.53,49-6.6,68.93-5.28,186.36-4,194.29s-7.93,46.59-7.93,46.59L28.71,542l59.92,21.85s41.79-90.78,56.92-155.75c8-34.7,20-98,29.42-149.5,8.28-44.91,18.61-128.84-7.09-160.06-4.68-5.77-19-16.94-36.38-16.94C119.49,81.59,98.6,88.68,90.91,98.53Z"
            transform="translate(-2.66 -1.76)"
            stroke="#000"
            strokeMiterlimit="10"
          />
          <path
            d="M91.78,556.75c-2.64,6-4.42,11-7.11,15.54a8,8,0,0,1-6.26,3.12c-6.47-.4-13.14-.85-19.28-2.73-9.31-2.84-18.34-6.7-27.31-10.54-4.83-2.06-6.65-6-5-11.39,1.14-3.75,1.72-7.67,2.74-12.38C49.1,548.25,68.75,556.2,91.78,556.75Z"
            transform="translate(-2.66 -1.76)"
            stroke="#000"
            strokeMiterlimit="10"
          />
        </g>
      )}

      {styles.sleeves === "Raglan" && (
        <g
          id="sleeve-raglan"
          fill={colors.sleeves ? colors.sleeves : "#ffffff"}
          className="cjd-color-hover"
          onClick={() => colorPicker("sleeves")}
        >
          <path
            d="M91.78,556.75c-2.64,6-4.42,11-7.11,15.54a8,8,0,0,1-6.26,3.12c-6.47-.4-13.14-.85-19.28-2.73-9.31-2.84-18.34-6.7-27.31-10.54-4.83-2.06-6.65-6-5-11.39,1.14-3.75,1.72-7.67,2.74-12.38C49.1,548.25,68.75,556.2,91.78,556.75Z"
            transform="translate(-2.66 -1.76)"
            stroke="#000"
            stroke-miterlimit="10"
          />
          <path
            d="M28.71,542l59.92,21.85C113.74,504.31,138,446,144,414.43,166.4,307,190.24,196.64,184.2,146.08,178.78,108.59,164,69.49,142.7,29.27l-27.53,3.26c-19.38,45.91-19.63,85.08-39,123a43.13,43.13,0,0,0-4.7,17c-3.73,64.4-5.31,124-1.11,170.9a6.68,6.68,0,0,1-.12,2.09Z"
            transform="translate(-2.66 -1.76)"
            stroke="#000"
            stroke-miterlimit="10"
          />
        </g>
      )}

      {styles.sleeves === "Set-In" && (
        <path
          d="M131.5,81.59a266.9,266.9,0,0,0-10.89-50.26"
          transform="translate(-2.66 -1.76)"
          stroke="#c6c6c6"
          strokeMiterlimit="10"
        />
      )}

      {styles.collar === "Shirt Collar" && (
        <path
          d="M184.5,29.5l-5-19.75s.36-6.52-6.06-7.38c-5.57-.72-39.72,2.23-62.34,3.36S72,5.77,62.27,6.2C57.86,18.65,60.5,45.5,60.5,45.5,108.71,34.06,138.75,25.34,184.5,29.5Z"
          transform="translate(-2.66 -1.76)"
          fill={colors.outside ? colors.outside : "#ffffff"}
          stroke="#000"
          strokeMiterlimit="10"
          className="cjd-color-hover"
          onClick={() => colorPicker("outside")}
        />
      )}

      {styles.collar === "Hood" && (
        <path
          id="hood"
          d="M125.77,69.7c4.84,8.61,23.9,90.21,27.55,81,8.75-22,8.2-87.79-5.37-110.47-4.45-7.43-12-14.68-18-20.43-5-4.86-12.77-9.86-24.8-15.11C80-2.35,70.77,15.24,50.45,35.67,38,48.21.73,61.21,2.64,78.23,32.26,70.53,56.82,52.9,87.24,50,114,47.48,114.07,48.9,125.77,69.7Z"
          transform="translate(-2.32 -2.88)"
          fill={colors.outside ? colors.outside : "#ffffff"}
          stroke="#231f20"
          strokeMiterlimit="2.61"
          strokeWidth="1"
          fillRule="evenodd"
          style={{ transform: "translate(46px, -31.4px) scale(1.2)" }}
          className="cjd-color-hover"
          onClick={() => colorPicker("outside")}
        />
      )}

      {styles.pocket === "Slash Pocket" && (
        <polygon
          points="31.46 439.76 38.03 438.46 24.37 356.2 17.8 357.5 31.46 439.76"
          fill={colors.pockets ? colors.pockets : "#e6e6e6"}
          stroke="#231f20"
          strokeMiterlimit="10"
          className="cjd-color-hover"
          onClick={() => colorPicker("pockets")}
        />
      )}

      {styles.pocket === "Snap Pocket" && (
        <g
          id="pockets-2"
          data-name="pockets"
          fill={colors.pockets ? colors.pockets : "#e6e6e6"}
          className="cjd-color-hover"
          onClick={() => colorPicker("pockets")}
        >
          <g id="pocket_flap_right-2" data-name="pocket flap right-2">
            <polygon
              points="26.85 354.02 11.42 356.47 25.17 440.73 40.59 438.29 26.85 354.02"
              stroke="#404041"
              strokeMiterlimit="10"
            />
            <path
              d="M24.63,396.52a4.75,4.75,0,1,1,1.11,6.63h0A4.76,4.76,0,0,1,24.63,396.52Z"
              transform="translate(-2.66 -1.76)"
              stroke="#404041"
              strokeMiterlimit="10"
            />
          </g>
        </g>
      )}

      {designs["Left Sleeve"]?.done && (
        <g id="leftSleeveArt" style={{ transform: "translate(-40px, 0px)" }}>
          {designs["Left Sleeve"]?.name && (
            <g style={{ transform: "translate(158px, 214px)" }}>
              <text
                x="0"
                y="0"
                dy="-1.25rem"
                fontFamily={designs["Left Sleeve"]?.name.font}
                fill={designs["Left Sleeve"]?.name.fill}
                stroke={designs["Left Sleeve"]?.name?.stroke}
                fontSize={
                  designs["Left Sleeve"]?.name.size === 19.25
                    ? 35.75
                    : designs["Left Sleeve"]?.name.size
                }
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan alignmentBaseline="middle">
                  {designs["Left Sleeve"]?.name.title.substr(0, 4)}
                </tspan>
              </text>
              <text
                x="0"
                y="0"
                dy="1rem"
                fontFamily={designs["Left Sleeve"]?.name.font}
                fill={designs["Left Sleeve"]?.name.fill}
                stroke={designs["Left Sleeve"]?.name?.stroke}
                fontSize={
                  designs["Left Sleeve"]?.name.size == 19.25
                    ? 35.75
                    : designs["Left Sleeve"]?.name.size
                }
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan alignmentBaseline="middle">
                  {designs["Left Sleeve"]?.name.title.substr(4)}
                </tspan>
              </text>
            </g>
          )}

          {designs["Left Sleeve"]?.letters && (
            <>
              {designs["Left Sleeve"]?.letters.type === "Type Your Own" && (
                <g style={{ transform: "translate(162px, 214px)" }}>
                  <text
                    x="0"
                    y="0"
                    fontFamily={designs["Left Sleeve"]?.letters.font}
                    fill="none"
                    fontSize={designs["Left Sleeve"]?.letters.size}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="8"
                    stroke={designs["Left Sleeve"]?.letters.border}
                    style={{ paintOrder: "stroke fill" }}
                  >
                    {designs["Left Sleeve"]?.letters.title}
                  </text>

                  <text
                    x="0"
                    y="0"
                    fontFamily={designs["Left Sleeve"]?.letters.font}
                    fill={designs["Left Sleeve"]?.letters.fill}
                    fontSize={designs["Left Sleeve"]?.letters.size}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="4"
                    stroke={designs["Left Sleeve"]?.letters.stroke}
                    style={{ paintOrder: "stroke fill" }}
                  >
                    {designs["Left Sleeve"]?.letters.title}
                  </text>
                </g>
              )}
            </>
          )}

{designs["Left Sleeve"]?.letters && (
  <>
{designs["Left Sleeve"]?.letters.type === 'Ready To Use' && (
             <g transform="translate(120, 180)">
                <svg
                  width="73"
                  height="70"
                  viewBox={designs["Left Sleeve"]?.letters.path.match(/viewBox="(.*?)"/)[1]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {designs["Left Sleeve"]?.letters.path.match(/(<path.*?><\/path>)/g).map((li, idx) => {
                    const pClass = li.match(/class="(.*?)"/)[1];
                    const pShape = li.match(/d="(.*?)"/)[1];
                    let color;

                    if (pClass === 'cjd-fill') {
                      color = designs["Left Sleeve"]?.letters.fill || '#fff';
                    } else if (pClass === 'cjd-stroke') {
                      color = designs["Left Sleeve"]?.letters.stroke || '#8089a2';
                    } else {
                      color = designs["Left Sleeve"]?.letters.border || '#525a6f';
                    }
                    return <path key={idx} d={pShape} fill={color}></path>;
                  })}
                </svg>
                </g>
          )}
          </>
        )}

          {designs["Left Sleeve"]?.symbol && (
            <g style={{ transform: "translate(125px, 175px)" }}>
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                preserveAspectRatio="xMidYMid meet"
              >
                {designs["Left Sleeve"]?.symbol.type === "Badges" && (
                  <g style={{ transform: "translate(0px, 0px)" }}>
                    <svg
                      width="72"
                      height="72"
                      viewBox="0 0 72 72"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <BadgeTemp
                        fill={designs["Left Sleeve"]?.symbol.fill}
                        stroke={designs["Left Sleeve"]?.symbol.stroke}
                        border={designs["Left Sleeve"]?.symbol.border}
                      />
                    </svg>
                  </g>
                )}

                {designs["Left Sleeve"]?.symbol.type === "Mascots" && (
                  <g style={{ transform: "translate(0px, 0px)" }}>
                    <svg
                      width="72"
                      height="72"
                      viewBox="0 0 72 72"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <image
                        width="72"
                        height="72"
                        xlinkHref={require(`../../assets/images/mascots/${designs["Left Sleeve"]?.symbol.flag}.svg`)}
                      />
                    </svg>
                  </g>
                )}

                {designs["Left Sleeve"]?.symbol.type === "Flags" && (
                  <g style={{ transform: "translate(0px, 0px)" }}>
                    <svg
                      width="72"
                      height="72"
                      viewBox="0 0 72 72"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <image
                        width="72"
                        height="72"
                        xlinkHref={require(`../../assets/images/flags/${designs["Left Sleeve"]?.symbol.flag}.svg`)}
                      />
                      <rect
                        x="1"
                        y="14"
                        width="70"
                        height="43.5"
                        fill="none"
                        strokeWidth="2"
                        stroke={designs.fill}
                      ></rect>
                    </svg>
                  </g>
                )}
              </svg>
            </g>
          )}

          {designs["Left Sleeve"]?.upload && (
            <g style={{ transform: "translate(125px, 175px)" }}>
              <image
                xlinkHref={designs["Left Sleeve"]?.upload.file}
                width="72"
                height="72"
              />
            </g>
          )}
        </g>
      )}

      {designs["Left Sleeve End"]?.done && (
        <g
          id="leftSleeveEndArt"
          style={{ transform: `translate(246px, 2px) rotate(31deg) scaleX(1)` }}
        >
          {designs["Left Sleeve End"]?.name && (
            <g transform="translate(104, 510)">
              <text
                x="0"
                y="0"
                fontFamily={designs["Left Sleeve End"]?.name?.font}
                fill={designs["Left Sleeve End"]?.name?.fill}
                stroke={designs["Left Sleeve End"]?.name?.stroke}
                fontSize={designs["Left Sleeve End"]?.name?.size}
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan alignmentBaseline="middle">
                  {designs["Left Sleeve End"]?.name?.title}
                </tspan>
              </text>
            </g>
          )}

          {designs["Left Sleeve End"]?.letters?.type === "Type Your Own" && (
            <g transform="translate(108, 520)">
              <text
                x="0"
                y="0"
                fontFamily={designs["Left Sleeve End"]?.letters.font}
                fill="none"
                fontSize={designs["Left Sleeve End"]?.letters.size}
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="8"
                stroke={designs["Left Sleeve End"]?.letters.border}
                style={{ paintOrder: "stroke fill" }}
              >
                {designs["Left Sleeve End"]?.letters.title}
              </text>

              <text
                x="0"
                y="0"
                fontFamily={designs["Left Sleeve End"]?.letters.font}
                fill={designs["Left Sleeve End"]?.letters.fill}
                fontSize={designs["Left Sleeve End"]?.letters.size}
                textAnchor="middle"
                dominantBaseline="middle"
                strokeWidth="4"
                stroke={designs["Left Sleeve End"]?.letters.stroke}
                style={{ paintOrder: "stroke fill" }}
              >
                {designs["Left Sleeve End"]?.letters.title}
              </text>
            </g>
          )}

{designs["Left Sleeve End"]?.letters && (
  <>
{designs["Left Sleeve End"]?.letters.type === 'Ready To Use' && (
             <g transform="translate(70, 500)">
                <svg
                  width="73"
                  height="44"
                  viewBox={designs["Left Sleeve End"]?.letters.path.match(/viewBox="(.*?)"/)[1]}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {designs["Left Sleeve End"]?.letters.path.match(/(<path.*?><\/path>)/g).map((li, idx) => {
                    const pClass = li.match(/class="(.*?)"/)[1];
                    const pShape = li.match(/d="(.*?)"/)[1];
                    let color;

                    if (pClass === 'cjd-fill') {
                      color = designs["Left Sleeve End"]?.letters.fill || '#fff';
                    } else if (pClass === 'cjd-stroke') {
                      color = designs["Left Sleeve End"]?.letters.stroke || '#8089a2';
                    } else {
                      color = designs["Left Sleeve End"]?.letters.border || '#525a6f';
                    }
                    return <path key={idx} d={pShape} fill={color}></path>;
                  })}
                </svg>
                </g>
          )}
          </>
        )}
          {designs["Left Sleeve End"]?.symbol && (
            <g transform="translate(85, 500)">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                preserveAspectRatio="xMidYMin meet"
              >
                {designs["Left Sleeve End"]?.symbol.type === "Badges" && (
                  <g transform="translate(0, 0)">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <BadgeTemp
                        fill={designs["Left Sleeve End"]?.symbol.fill}
                        stroke={designs["Left Sleeve End"]?.symbol.stroke}
                        border={designs["Left Sleeve End"]?.symbol.border}
                      />
                    </svg>
                  </g>
                )}

                {designs["Left Sleeve End"]?.symbol.type === "Mascots" && (
                  <g transform="translate(0, 0)">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <image
                        width="42"
                        height="42"
                        xlinkHref={require(`../../assets/images/mascots/${designs["Left Sleeve End"]?.symbol.flag}.svg`)}
                      />
                    </svg>
                  </g>
                )}

                {designs["Left Sleeve End"]?.symbol.type === "Flags" && (
                  <g transform="translate(0, 0)">
                    <svg
                      width="42"
                      height="42"
                      viewBox="0 0 42 42"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <image
                        width="42"
                        height="42"
                        xlinkHref={require(`../../assets/images/flags/${designs["Left Sleeve End"]?.symbol.flag}.svg`)}
                      />
                      <rect
                        x="1"
                        y="8"
                        width="40"
                        height="26"
                        fill="none"
                        strokeWidth="2"
                        stroke={designs.fill}
                      ></rect>
                    </svg>
                  </g>
                )}
              </svg>
            </g>
          )}

          {designs["Left Sleeve End"]?.upload && (
            <g transform="translate(88, 500)">
              <image
                xlinkHref={designs["Left Sleeve End"]?.upload.file}
                width="42"
                height="42"
              />
            </g>
          )}
        </g>
      )}

      <rect
        x="125"
        y="175"
        width="72"
        height="72"
        style={{ transform: "translate(-40px, 0px)" }}
        className={`cjd-guides ${!globals.guides && "cjd-guides-hide"}`}
        onClick={() => openModal("Left Sleeve")}
      />

      <rect
        x="100"
        y="420"
        width="42"
        height="42"
        className={`cjd-guides ${!globals.guides && "cjd-guides-hide"}`}
        onClick={() => openModal("Left Sleeve End")}
        style={{ transform: "translate(-375px, 400px) rotate(-61.94deg)" }}
      />
    </svg>
  );
};

const mapStateToProps = (state) => ({
  globals: state.globals,
  materials: state.materials,
  styles: state.styles,
  colors: state.colors,
  designs: state.designs,
  advance: state.advance,
});

const mapDispatchToProps = (dispatch) => ({
  modalState: (key, val) => dispatch(modalState(key, val)),
  activeSidebar: (idx) => dispatch(activeSidebar(idx)),
  colorPicker: (part) => dispatch(colorPicker(part)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CoachLeft);
