import React, { useState, useEffect } from 'react';
import { connect, useStore } from 'react-redux';
import { svgAsPngUri } from 'save-svg-as-png';

import { updateDefaults } from '../../store/actions/defaults';
import { apiCall, getPrice, isLocalhost } from '../../utils';
import CartIcon from '../icons/cartIcon';
import PencilIcon from '../icons/pencilIcon';

import Back from '../../assets/images/icon-back.jpg';
import Logo from '../../assets/images/Header-logo.png'

import {
  saveSvg,
  modalState,
  firstJacket,
  currentJacket,
  duplicate,
  replaceMaterials,
  replaceStyles,
  replaceColors,
  replaceDesigns,
  replaceSizes,
  replaceAdvance,
  removeJacket,
  updatePreviousState,
  setActiveJacket,
  renameJacket,
  jacketSnapshot,
  updateGlobals,
  guideModalState,
} from '../../store/actions';

//import './styles.scss';
import '../../css/components/Header/styles.scss'
import NewGuide from '../modal/newguide';
import Required from '../modal/required';
import axiosInstance from '../../utils/axiosConfig';
import Loader from '../loader';

const Header = ({
  globals,
  jackets,
  firstJacket,
  currentJacket,
  duplicate,
  replaceMaterials,
  replaceStyles,
  replaceColors,
  replaceDesigns,
  replaceSizes,
  replaceAdvance,
  updatePreviousState,
  removeJacket,
  styles,
  materials,
  colors,
  designs,
  sizes,
  advance,
  setActiveJacket,
  renameJacket,
  saveSvg,
  jacketSnapshot,
  updateGlobals
}) => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [msg, setMsg] = useState('Please wait while we prepare your order!');
  // const [proceed, setProceed] = useState(false);
  const [guidemodal, setGuidemodal] = useState(false);
  const [requiremodal, setRequiremodal] = useState(false);
  const store = useStore();
  let state = store.getState();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    if (!isLocalhost) {
      window.onbeforeunload = function () {
        if (document.getElementById('cjd-root').classList.contains('cjd-hide')) {
        } else {
          return 'Data will be lost if you leave the page, are you sure?';
        }
      };
    }
  }, []);

  const closeGuideModal = () => {
    setGuidemodal(false);
  };

  const openGuideModal = () => {
    if (document.cookie.match(/^(.*;)?\s*cjdguidesshow\s*=\s*[^;]+(.*)?$/)) {
      copyDefaults();
    } else {
      setGuidemodal(true);
    }
  };

  const proceedAfterGuide = (cookie) => {
    if (cookie) {
      document.cookie = 'cjdguidesshow=nah; expires=Sun, 1 Jan 2025 00:00:00 UTC; path=/';
    } else {
      document.cookie = 'cjdguidesshow=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
    }

    copyDefaults();
  };

  const copyDefaults = async () => {
    // guideModalState('open', true);
    await closeGuideModal();

    if (jackets.length === 1) {
      firstJacket({ materials, styles, colors, designs, sizes, advance }, getPrice(state));
      jacketSnapshot(0);
    }
    duplicate();
    updatePreviousState(
      store.getState().jackets.length - 2,
      { materials, styles, colors, designs, sizes, advance },
      getPrice(state)
    );
    jacketSnapshot(store.getState().jackets.length - 2);
    const newJac = store.getState().jackets[0].data;
    replaceMaterials(newJac.materials);
    replaceStyles(newJac.styles);
    replaceColors(newJac.colors);
    replaceDesigns(newJac.designs);
    replaceSizes(newJac.sizes);
    replaceAdvance(newJac.advance);
    updateGlobals('activeJacket', store.getState().jackets.length - 1);
  };

  const changeJacket = (key, id) => {
    currentJacket(
      globals.activeJacket,
      { materials, styles, colors, designs, sizes, advance },
      getPrice(state)
    );
    jacketSnapshot(key);
    updateGlobals('activeJacket', key);

    setActiveJacket(id);
    replaceMaterials(store.getState().jackets[key].data.materials);
    replaceStyles(store.getState().jackets[key].data.styles);
    replaceColors(store.getState().jackets[key].data.colors);
    replaceDesigns(store.getState().jackets[key].data.designs);
    replaceSizes(store.getState().jackets[key].data.sizes);
    replaceAdvance(store.getState().jackets[key].data.advance);
  };

  const remove = (key, e) => {
    e.stopPropagation();

    removeJacket(key);
    replaceMaterials(jackets[key - 1].data.materials);
    replaceStyles(jackets[key - 1].data.styles);
    replaceColors(jackets[key - 1].data.colors);
    replaceDesigns(jackets[key - 1].data.designs);
    replaceSizes(jackets[key - 1].data.sizes);
    replaceAdvance(jackets[key - 1].data.advance);

    updateGlobals('activeJacket', store.getState().jackets.length);
  };

  const rename = (key, title, e) => {
    e.preventDefault();
    e.stopPropagation();

    var jacket = prompt('Name your Jacket', title);
    if (jacket != null) {
      renameJacket(key, jacket);
    }
  };

  const updateJacket = async (key) => {
    await currentJacket(
      key,
      { materials, styles, colors, designs, sizes, advance },
      getPrice(state)
    );
  };

  const getSvg = (key) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        changeJacket(key, key);
        const options = {
          backgroundColor: '#FFFFFF',
          encoderType: 'image/png',
          encoderOptions: 1
        };
        const svg = document.getElementById('jacketFront');
        const svgBack = document.getElementById('jacketBack');
        const svgRight = document.getElementById('jacketRight');
        const svgLeft = document.getElementById('jacketLeft');

        await svgAsPngUri(svg, options).then(uri => saveSvg(key, 'front', uri));
        await svgAsPngUri(svgBack, options).then(uri => saveSvg(key, 'back', uri));
        await svgAsPngUri(svgRight, options).then(uri => saveSvg(key, 'right', uri));
        await svgAsPngUri(svgLeft, options).then(uri => saveSvg(key, 'left', uri));

        store.getState();
        resolve(store.getState().jackets[key].front);
      }, 1 * key);
    });
  };

  const addData = (data) => {
    return new Promise((resolve, reject) => {
      axiosInstance.post(`/custom/addToCart` ,{ categoryCode: globals?.productId , ...data})
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  };

  function doSomeAsyncStuff(v) {
    return new Promise((resolve, reject) => {
      if ( colors[v] === '' ) {
        setRequiremodal(true);
        reject();
      } else if (sizes.size === '') {
        setRequiremodal(true);
        reject();
      } else {
        resolve();
      }
    });
  }

  const checkIfDirty = async () => {
    let baseCheck = ['size', 'body', 'sleeves', 'pockets'];

    if ( styles.closure === 'Buttons' ) {
      baseCheck.push('buttons');
    }
    if ( styles.closure === 'Zipper' ) {
      baseCheck.push('zip');
    }
    if ( styles.collar === 'Roll Up' || styles.collar === 'Hood' || styles.collar === 'Zipper Hood' ) {
      baseCheck.push('inside');
      baseCheck.push('outside');
    }
    if ( globals.catName !== 'Coach Jackets' ) {
      baseCheck.push('base');
    }
    if ( (styles.knit === 'Single Line' || styles.knit === 'Double Line' || styles.knit === 'Single Line Border' || styles.knit === 'Double Line Border') && globals.catName !== 'Coach Jackets' ) {
      baseCheck.push('lines');
    }
    if ( styles.knit === 'Single Line Border' || styles.knit === 'Double Line Border' ) {
      baseCheck.push('border');
    }
    if (advance.inserts) {
      baseCheck.push('inserts');
    }
    if (advance.piping || advance.sleevesPiping) {
      baseCheck.push('piping');
    }

    const promises = [];
    baseCheck.forEach((v, i) => {
      promises.push(doSomeAsyncStuff(v));
    });

    return new Promise((resolve, reject) => {
      Promise.all(promises)
        .then((results) => {
          resolve();
        })
    })
  }

  const addToCart = async () => {
    const response  = await checkIfDirty();
   
    let data = {}
    // Final Code
    setLoading(true);
    updateJacket(globals.activeJacket);

    let images = [];
    let ids = []
    for (let index = 0; index < store.getState().jackets.length; index++) {
      let svgResult = await getSvg(index);
      images.push(svgResult);
    }

   

    Promise.all(images).then(async () => {
      let promises = [];

      for (let index = 0; index < store.getState().jackets.length; index++) {
        const element = store.getState().jackets[index];

        data = {
          // action: 'cjd_add_to_cart',
          product_qty: 1,
          product_id: globals?.productId, // change to category id 
          title: element.title,
          styles: element.data.styles,
          advance: element.data.advance,
          colors: element.data.colors,
          materials: element.data.materials,
          sizes: element.data.sizes,
          designs: element.data.designs,
          globals,
          jackets: store.getState().jackets,
          custom_price: element.price,
          custom_image: element.front,
          custom_image_back: element.back,
          custom_image_left: element.left,
          custom_image_right: element.right,
        };
        
        let result = await addData(data);

        if(result.status === 200) {
            ids.push(result.data.id)
        }
        promises.push(result);
      }

      Promise.all(promises).then(async (res) => {
        setLoading(false);
        setTimeout(() => {  
      //     window.onbeforeunload = function () {};
      //     window.parent.postMessage({data: JSON.stringify(data) , result: JSON.stringify(res) }, '*');
           window.onbeforeunload = null;
           window.location.href = `http://easyjackets.com/cart?index=${ids.join(',')}`
          // window.location.href = `https://easyjackets.com/cart?index=${ids.join(',')}`;
        }, 0);
      });
    });

    
  };

  const updateCart = async () => {
    // const data = {
    //   action: 'cjd_product_remove_cart',
    //   product_id: globals.cart.productId,
    //   cart_item_key: globals.cart.cartItemKey,
    // };

    const designId = globals.design.designItemKey

    await checkIfDirty();
    // console.log(response)
    let data = {}
    // Final Code
    setLoading(true);
    updateJacket(globals.activeJacket);

    let images = [];
    for (let index = 0; index < store.getState().jackets.length; index++) {
      let svgResult = await getSvg(index);
      images.push(svgResult);
    }

    Promise.all(images).then(async () => {
      let promises = [];

      for (let index = 0; index < store.getState().jackets.length; index++) {
        const element = store.getState().jackets[index];
        
        data = {
          title: element.title,
          styles: element.data.styles,
          advance: element.data.advance,
          colors: element.data.colors,
          materials: element.data.materials,
          sizes: element.data.sizes,
          designs: element.data.designs,
          globals,
          jackets: store.getState().jackets,
          custom_price: element.price,
          custom_image: element.front,
          custom_image_back: element.back,
          custom_image_left: element.left,
          custom_image_right: element.right,
          
        };
        
        let result = await axiosInstance.put(`/custom/updateDesign/${designId}` ,{...data});
        if(result.status === 200) {
          window.onbeforeunload = null;
          window.history.go(-1)
        }
        promises.push(result);
      }
    })

  };

  const saveDesign = async() => {
    const response  = await checkIfDirty();
    // console.log(response)
    let data = {}
    // Final Code
    // setLoading(true);
    updateJacket(globals.activeJacket);

    let images = [];
    let ids = []
    for (let index = 0; index < store.getState().jackets.length; index++) {
      let svgResult = await getSvg(index);
      images.push(svgResult);
    }

   

    Promise.all(images).then(async () => {
      let promises = [];

      for (let index = 0; index < store.getState().jackets.length; index++) {
        const element = store.getState().jackets[index];

        data = {
          // action: 'cjd_add_to_cart',
          product_qty: 1,
          product_id: globals?.productId, // change to category id 
          title: element.title,
          styles: element.data.styles,
          advance: element.data.advance,
          colors: element.data.colors,
          materials: element.data.materials,
          sizes: element.data.sizes,
          designs: element.data.designs,
          globals,
          jackets: store.getState().jackets,
          custom_price: element.price,
          custom_image: element.front,
          custom_image_back: element.back,
          custom_image_left: element.left,
          custom_image_right: element.right,
        };
        
        let result = await axiosInstance.post(`/custom/product-design/?productId=${globals.madeProduct}` ,{categoryCode: globals?.productId,...data});

        if(result.status === 200) {
            ids.push(result.data.id)
        }
        promises.push(result);
      }

      Promise.all(promises).then(async (res) => {
        setLoading(false);
        setTimeout(() => {  
          window.onbeforeunload = null;
          window.history.go(-1)
        }, 0);
      });
    });

  }

  if(loading){
    return <Loader msg="Wait while we prepare the custom experience for you" />;
  }
  return (
   
    <header className='cjd-header'>
      {/* {loading && (
        <div className='cjd-loader'>
          <div className='lds-roller'>
            {' '}
            <div /> <div /> <div /> <div /> <div /> <div /> <div /> <div />{' '}
          </div>
          <div className='cjd-loading-msg'>{msg}</div>
        </div>
      )} */}

      <div className='cjd-mono-wrapper'>
        <a href="https://easyjackets.com/">
          <img src={Logo} alt='Back to Easy Jackets' />
        </a>
        {/* {!isMobile && <div>EJacket</div>}   */}
      </div>

      <div className='cjd-jackets-tabs'>
        <div className='cjd-scroll'>
          {jackets.map((val, key) => {
            return (
              <div
                className={`cjd-jacket-tab-item ${val.active && 'cjd-active'}`}
                key={key}
                onClick={() => changeJacket(key, val.id)}
              >
                <span className='cjd-tab-span' onClick={(e) => rename(val.id, val.title, e)}>
                  {/* <CartIcon fill={'#ff9503'}></CartIcon> */}
                  <PencilIcon></PencilIcon>
                </span>
                <h4>{val.title}</h4>
                {key !== 0 && <div className='cjd-remove' onClick={(e) => remove(key, e)}></div>}
              </div>
            );
          })}
        </div>
        {globals.design.update ? '' :<div className='cjd-jacket-tab-item cjd-add-more' onClick={() => openGuideModal()}></div>}
      </div>

      <div className='cjd-header-actions'>
         <span className='cjd-price-wrapper'>
          <strong className='current'>${getPrice(state)}</strong>
          {/* <strong className='current'>${'00.00'}</strong> */}
        </span>

        <button
          className={`cjd-btn cjd-btn-cart  ${isMobile ? 'cjd-btn-mobile cjd-btn-addtocart-mobile' : ''}`}
          onClick={() => (globals.design.update ? updateCart() : (globals.save ? saveDesign() : addToCart()))} 
        >
           <span className='cjd-card-span'>
            <CartIcon fill={'#17a903'}></CartIcon>
          </span>
          {globals.design.update ? 'Update Design' : (globals.save ?  'SAVE DESIGN' : 'ADD TO CART')}
          {/* <span className='cjd-price-wrapper'>
            <strong className='current'>${getPrice(state)}</strong>
          </span> */}
          <strong className='current-mobile'>${getPrice(state)}</strong>
         
        </button>
      </div>

      <NewGuide
        modal={guidemodal}
        closeGuideModal={closeGuideModal}
        proceedAfterGuide={proceedAfterGuide}
      />
      <Required
        modal={requiremodal}
        jacket={globals.catName}
        styles={styles}
        colors={colors}
        sizes={sizes}
        advance={advance}
        setRequiremodal={(val) => setRequiremodal(val)}
      />
    </header>
  );
};

const mapStateToProps = (state) => ({
  globals: state.globals,
  jackets: state.jackets,
  materials: state.materials,
  styles: state.styles,
  colors: state.colors,
  designs: state.designs,
  sizes: state.sizes,
  advance: state.advance,
  pricing: state.pricing,
  guideModal: state.guideModal,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  modalState: (key, val) => dispatch(modalState(key, val)),
  firstJacket: (obj, price) => dispatch(firstJacket(obj, price)),
  currentJacket: (key, obj, price) => dispatch(currentJacket(key, obj, price)),
  duplicate: (obj) => dispatch(duplicate(obj)),
  replaceMaterials: (obj) => dispatch(replaceMaterials(obj)),
  replaceStyles: (obj) => dispatch(replaceStyles(obj)),
  replaceColors: (obj) => dispatch(replaceColors(obj)),
  replaceDesigns: (obj) => dispatch(replaceDesigns(obj)),
  replaceSizes: (obj) => dispatch(replaceSizes(obj)),
  replaceAdvance: (obj) => dispatch(replaceAdvance(obj)),
  removeJacket: (key) => dispatch(removeJacket(key)),
  updatePreviousState: (key, obj, price) => dispatch(updatePreviousState(key, obj, price)),
  setActiveJacket: (key) => dispatch(setActiveJacket(key)),
  renameJacket: (key, val) => dispatch(renameJacket(key, val)),
  saveSvg: (key, part, svg) => dispatch(saveSvg(key, part, svg)),
  updateDefaults: (key, data) => dispatch(updateDefaults(key, data)),
  updateGlobals: (key, val) => dispatch(updateGlobals(key, val)),
  guideModalState: (key, val) => dispatch(guideModalState(key, val)),
  jacketSnapshot: (key) => dispatch(jacketSnapshot(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
