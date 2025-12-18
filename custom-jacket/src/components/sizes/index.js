import React from 'react';
import { connect } from 'react-redux';
import { selectSize } from '../../store/actions/index.js';
import { uCase } from '../../utils/index.js';
import SelectBox from '../selectBox/index.js';
import { Select2 } from "../select2Component/select2.tsx";

const replaceKeyName = (array) => {
  return array.map((item) => {
    const { size, ...rest } = item;
    return { label: uCase(size), value: uCase(size), ...rest };
  });
};

const Sizes = ({ defaults, sizes, selectSize }) => {
  const transformedSizeArray = replaceKeyName(defaults.sizes);

  return (
    <div style={{ position: 'relative' }}>
      {/* <p>{JSON.stringify(sizes)}</p> */}
      <label className="select-label">Jacket Size</label>
        <Select2
          data={transformedSizeArray}
          value={sizes.size ? sizes.size : 'M'}
          open={(e) => console.log("Open", e)}
          update={(value) => selectSize("size", value)}
          isOpen={false}
        ></Select2>
      {/* <div
        className="cjd-select-wrapper cjd-single-size"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
      >
        

        {defaults.sizes.map((val, key) => {
          return (
            <SelectBox
              key={key}
              type={'size'}
              label={uCase(val.size)}
              current={sizes.size ? sizes.size : 'M'}
              sizes={true}
              dispatch={(type, val) => selectSize(type, val)}
            />
          );
        })}
      </div> */}

      <div className="cjd-custom-sizer">
        {/* <label htmlFor="cjdCustom" className="cjd-label">
          <input
            id="cjdCustom"
            type="checkbox"
            checked={sizes.custom}
            onChange={() => selectSize('custom', !sizes.custom)}
          />
          <span>I want a custom size</span>
        </label> */}

        <div className={`cjd-custom-form ${sizes.custom || 'cjd-hide'}`}>
          {/* <div className="cjd-btn-group">
            <div onClick={ () => selectSize('scale', 'in') } className={`cjd-btn ${sizes.scale === 'in' || 'cjd-btn-white'}`}>Inches</div>
            <div onClick={ () => selectSize('scale', 'cm') } className={`cjd-btn ${sizes.scale === 'cm' || 'cjd-btn-white'}`}>Centimeters</div>
          </div> */}

          <div className="cjd-form-group">
            <label htmlFor="cjdChest">Chest</label>
            <input
              id="cjdChest"
              type="number"
              min="10"
              max="400"
              value={sizes.chest || ''}
              className="cjd-form-control"
              onChange={(e) => selectSize('chest', e.target.value)}
            />
            <span className="cjd-measurement">{sizes.scale}</span>
          </div>

          <div className="cjd-form-group">
            <label htmlFor="cjdSleeve">Sleeve</label>
            <input
              id="cjdSleeve"
              type="number"
              min="10"
              max="400"
              value={sizes.sleeve || ''}
              className="cjd-form-control"
              onChange={(e) => selectSize('sleeve', e.target.value)}
            />
            <span className="cjd-measurement">{sizes.scale}</span>
          </div>

          <div className="cjd-form-group">
            <label htmlFor="cjdAcrossShoulder">Across Shoulder</label>
            <input
              id="cjdAcrossShoulder"
              type="number"
              min="10"
              max="400"
              value={sizes.ashoulder || ''}
              className="cjd-form-control"
              onChange={(e) => selectSize('ashoulder', e.target.value)}
            />
            <span className="cjd-measurement">{sizes.scale}</span>
          </div>

          <div className="cjd-form-group">
            <label htmlFor="cjdShoulder">Shoulder</label>
            <input
              id="cjdShoulder"
              type="number"
              min="10"
              max="400"
              value={sizes.shoulder || ''}
              className="cjd-form-control"
              onChange={(e) => selectSize('shoulder', e.target.value)}
            />
            <span className="cjd-measurement">{sizes.scale}</span>
          </div>

          <div className="cjd-form-group">
            <label htmlFor="cjdBackLength">Back Length</label>
            <input
              id="cjdBackLength"
              type="number"
              min="10"
              max="400"
              value={sizes.backlength || ''}
              className="cjd-form-control"
              onChange={(e) => selectSize('backlength', e.target.value)}
            />
            <span className="cjd-measurement">{sizes.scale}</span>
          </div>

          <div className="cjd-form-group">
            <label htmlFor="cjdBackLength">Height</label>
            <input
              id="cjdBackLength"
              type="number"
              min="10"
              max="400"
              value={sizes.height || ''}
              className="cjd-form-control"
              onChange={(e) => selectSize('height', e.target.value)}
            />
            <span className="cjd-measurement">{sizes.scale}</span>
          </div>

          <div className="cjd-form-group">
            <label htmlFor="cjdBackLength">Weight</label>
            <input
              id="cjdBackLength"
              type="number"
              min="10"
              max="400"
              value={sizes.weight || ''}
              className="cjd-form-control"
              onChange={(e) => selectSize('weight', e.target.value)}
            />
            <span className="cjd-measurement">KG</span>
          </div>
        </div>

        {/* <div className="cjd-links-wrapper">
          <a href="/size-chart" target="_blank">
            View Size Chart
          </a>
         <a href="/size-chart">How to get Measurements</a>
        </div> */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  defaults: state.defaults,
  sizes: state.sizes,
});

const mapDispatchToProps = (dispatch) => ({
  selectSize: (type, val) => dispatch(selectSize(type, val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sizes);
