import React from 'react';
import Modal from 'react-modal';

const Required = ({ modal, colors, sizes, setRequiremodal, jacket, styles, advance }) => {
  let requiredColors = ['body', 'sleeves', 'pockets'];

  if ( styles.closure === 'Buttons' ) {
    requiredColors.push('buttons');
  }
  if ( styles.closure === 'Zipper' ) {
    requiredColors.push('zip');
  }
  if ( styles.collar === 'Roll Up' || styles.collar === 'Hood' || styles.collar === 'Zipper Hood' ) {
    requiredColors.push('inside');
    requiredColors.push('outside');
  }
  if ( jacket !== 'Coach Jackets' ) {
    requiredColors.push('base');
  }
  if ( (styles.knit === 'Single Line' || styles.knit === 'Double Line' || styles.knit === 'Single Line Border' || styles.knit === 'Double Line Border') && jacket !== 'Coach Jackets' ) {
    requiredColors.push('lines');
  }
  if ( styles.knit === 'Single Line Border' || styles.knit === 'Double Line Border' ) {
    requiredColors.push('border');
  }
  if (advance.inserts) {
    requiredColors.push('inserts');
  }
  if (advance.piping || advance.sleevesPiping) {
    requiredColors.push('piping');
  }

  return (
    <Modal
      isOpen={modal}
      className='cjd-modal cjd-modal-notifs'
      overlayClassName='cjd-modal-overlay'
      contentLabel={'Create Team (Identical) Jackets'}
      ariaHideApp={false}
    >
      <header className='cjd-modal-header'>
        <h4>Please select all required items</h4>
        <div className='cjd-modal-close' onClick={() => setRequiremodal(false)}>
          ×
        </div>
      </header>

      <div className='cjd-modal-content guides'>
        <ol>
          {sizes.size === '' && <li>Please select size</li>}
          {requiredColors.map((c, i) => {
            if (colors[c] === '') {
              let txt;
              if ( 'inside' === c || 'outside' === c ) {
                txt = (styles.collar === 'Roll Up' ? 'Collar ' : 'Hood ') + c;
              } else {
                txt = c;
              }
              return (
                <li key={i}>
                  Please select <strong>{txt}</strong> color
                </li>
              );
            }
          })}
        </ol>
      </div>

      <div className='cjd-modal-footer'>
        <div className='cjd-btn cjd-btn-primary cjd-btn-ok' onClick={() => setRequiremodal(false)}>
          OK
        </div>
      </div>
    </Modal>
  );
};

export default Required;
