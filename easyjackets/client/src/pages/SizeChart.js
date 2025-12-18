import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const SizeChart = () => {
  const [unit, setUnit] = useState('inches');
  const [metaData , setMetaData] = useState({})

  
  const getMetaTags = async() =>{
    const { data } = await axios.get(`/api/v1/metadata/sizechart`)

    setMetaData(data?.metadata)
  }

  const chestChartData = {
    inches: [
      { size: 'XXS', chest: '18', sleeves: '24', acrossShoulder: '16', shoulder: '6', backLength: '23' },
      { size: 'XS', chest: '20', sleeves: '24.5', acrossShoulder: '17', shoulder: '6.3', backLength: '24' },
      { size: 'S', chest: '22', sleeves: '25', acrossShoulder: '18', shoulder: '6.5', backLength: '25' },
      { size: 'M', chest: '24', sleeves: '25.5', acrossShoulder: '19', shoulder: '6.7', backLength: '26.5' },
      { size: 'M/TALL', chest: '24', sleeves: '27', acrossShoulder: '19', shoulder: '6.7', backLength: '28' },
      { size: 'L', chest: '26', sleeves: '26', acrossShoulder: '20', shoulder: '7', backLength: '27.5' },
      { size: 'L/TALL', chest: '26', sleeves: '27.5', acrossShoulder: '20', shoulder: '7', backLength: '29' },
      { size: 'XL', chest: '28', sleeves: '26.5', acrossShoulder: '21', shoulder: '7.2', backLength: '28.5' },
      { size: 'XL/TALL', chest: '28', sleeves: '28', acrossShoulder: '21', shoulder: '7.2', backLength: '30' },
      { size: '2XL', chest: '30', sleeves: '27', acrossShoulder: '22', shoulder: '7.5', backLength: '29.5' },
      { size: '2XL/TALL', chest: '30', sleeves: '28.5', acrossShoulder: '22', shoulder: '7.5', backLength: '31' },
      { size: '3XL', chest: '32', sleeves: '27.5', acrossShoulder: '23', shoulder: '7.8', backLength: '30.5' },
      { size: '4XL', chest: '34', sleeves: '28', acrossShoulder: '24', shoulder: '8', backLength: '31.5' },
      { size: '5XL', chest: '36', sleeves: '28.5', acrossShoulder: '25', shoulder: '8.3', backLength: '32.5' },
      { size: '6XL', chest: '38', sleeves: '29', acrossShoulder: '26', shoulder: '8.5', backLength: '33.5' },
    ],
    centimeters: [
      { size: 'XXS', chest: '45.7', sleeves: '61.0', acrossShoulder: '40.6', shoulder: '15.2', backLength: '58.4' },
      { size: 'XS', chest: '50.8', sleeves: '62.2', acrossShoulder: '43.2', shoulder: '16.0', backLength: '61.0' },
      { size: 'S', chest: '55.9', sleeves: '63.5', acrossShoulder: '45.7', shoulder: '16.5', backLength: '63.5' },
      { size: 'M', chest: '61.0', sleeves: '64.8', acrossShoulder: '48.3', shoulder: '17.0', backLength: '67.3' },
      { size: 'M/TALL', chest: '61.0', sleeves: '68.6', acrossShoulder: '48.3', shoulder: '17.0', backLength: '71.1' },
      { size: 'L', chest: '66.0', sleeves: '66.0', acrossShoulder: '50.8', shoulder: '17.8', backLength: '69.8' },
      { size: 'L/TALL', chest: '66.0', sleeves: '69.8', acrossShoulder: '50.8', shoulder: '17.8', backLength: '73.7' },
      { size: 'XL', chest: '71.1', sleeves: '67.3', acrossShoulder: '53.3', shoulder: '18.3', backLength: '72.4' },
      { size: 'XL/TALL', chest: '71.1', sleeves: '71.1', acrossShoulder: '53.3', shoulder: '18.3', backLength: '76.2' },
      { size: '2XL', chest: '76.2', sleeves: '68.6', acrossShoulder: '55.9', shoulder: '19.1', backLength: '74.9' },
      { size: '2XL/TALL', chest: '76.2', sleeves: '72.4', acrossShoulder: '55.9', shoulder: '19.1', backLength: '78.7' },
      { size: '3XL', chest: '81.3', sleeves: '69.8', acrossShoulder: '58.4', shoulder: '19.8', backLength: '77.5' },
      { size: '4XL', chest: '86.4', sleeves: '71.1', acrossShoulder: '61.0', shoulder: '20.3', backLength: '80.0' },
      { size: '5XL', chest: '91.4', sleeves: '72.4', acrossShoulder: '63.5', shoulder: '21.1', backLength: '82.5' },
      { size: '6XL', chest: '96.5', sleeves: '73.7', acrossShoulder: '66.0', shoulder: '21.6', backLength: '85.1' },
    ],
  };
  
 
  
  
  const westChartData = {
    inches: [
      { size: 'XXS', chest: '28-30', waist: '20-22', sleeve: '28-29', backLength: '23.0' },
      { size: 'XS', chest: '30-32', waist: '24-26', sleeve: '30-31', backLength: '24.0' },
      { size: 'S', chest: '34-36', waist: '28-30', sleeve: '31-32', backLength: '25.0' },
      { size: 'M', chest: '38', waist: '32', sleeve: '32', backLength: '26.5' },
      { size: 'M/TALL', chest: '38', waist: '32', sleeve: '33-34', backLength: '28.0' },
      { size: 'L', chest: '40-42', waist: '34-36', sleeve: '33-34', backLength: '27.5' },
      { size: 'L/TALL', chest: '40-42', waist: '34-36', sleeve: '35-36', backLength: '29.0' },
      { size: 'XL', chest: '44-46', waist: '38-40', sleeve: '34-35', backLength: '28.5' },
      { size: 'XL/TALL', chest: '44-46', waist: '38-40', sleeve: '36.0', backLength: '30.0' },
      { size: '2XL', chest: '48-50', waist: '42-44', sleeve: '35-36', backLength: '29.5' },
      { size: '2XL/TALL', chest: '48-50', waist: '42-44', sleeve: '37.0', backLength: '31.0' },
      { size: '3XL', chest: '52-54', waist: '46-48', sleeve: '36-37', backLength: '30.5' },
      { size: '4XL', chest: '56-58', waist: '50-52', sleeve: '37-38', backLength: '31.5' },
      { size: '5XL', chest: '60-62', waist: '54-56', sleeve: '38-39', backLength: '32.5' },
      { size: '6XL', chest: '64-66', waist: '58-60', sleeve: '39-40', backLength: '33.5' },
    ],
    centimeters: [
      { size: 'XXS', chest: '71-76', waist: '51-56', sleeve: '71-74', backLength: '58.4' },
      { size: 'XS', chest: '76-81', waist: '61-66', sleeve: '76-79', backLength: '61.0' },
      { size: 'S', chest: '86-91', waist: '71-76', sleeve: '79-81', backLength: '63.5' },
      { size: 'M', chest: '96.5', waist: '81.3', sleeve: '81.3', backLength: '67.3' },
      { size: 'M/TALL', chest: '96.5', waist: '81.3', sleeve: '84-86', backLength: '71.1' },
      { size: 'L', chest: '102-107', waist: '86-91', sleeve: '84-86', backLength: '69.8' },
      { size: 'L/TALL', chest: '102-107', waist: '86-91', sleeve: '89-91', backLength: '73.7' },
      { size: 'XL', chest: '112-117', waist: '97-102', sleeve: '86-89', backLength: '72.4' },
      { size: 'XL/TALL', chest: '112-117', waist: '97-102', sleeve: '91.4', backLength: '76.2' },
      { size: '2XL', chest: '122-127', waist: '107-112', sleeve: '89-91', backLength: '74.9' },
      { size: '2XL/TALL', chest: '122-127', waist: '107-112', sleeve: '94.0', backLength: '78.7' },
      { size: '3XL', chest: '132-137', waist: '117-122', sleeve: '91-94', backLength: '77.5' },
      { size: '4XL', chest: '142-147', waist: '127-132', sleeve: '94-97', backLength: '80.0' },
      { size: '5XL', chest: '152-157', waist: '137-142', sleeve: '97-99', backLength: '82.5' },
      { size: '6XL', chest: '163-168', waist: '147-152', sleeve: '99-102', backLength: '85.1' },
    ],
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };

  useEffect(() =>{
      getMetaTags()
  },[])

  return (
    <Layout title={metaData?.title} description={metaData?.description} keywords={metaData?.keywords}>
       <div className='container my-5' style={{ paddingInline : '50px'}} >
      <div className="container my-5" style={{ width : '100%'}}>
        <h1 className=" text-danger mb-4" style={{ textAlign : 'center'}}>BODY MEASUREMENTS</h1>
        <p className="text-center mb-5">
          These are the measurements of your body (NOT JACKET). The sizes that we recommend are only suggestions. We are not responsible if you order an incorrect size. If you are unsure of your size please write to us first. All of our jackets are unisex athletic cut for both male and female. TALL SIZES are 1.5” (4cm) longer in sleeves and body.
        </p>

        

        <div className="row mt-5">
          <div className="col-md-6">
            <div className="timeline">
              {[
                {
                  number: 1,
                  title: 'Chest',
                  description: 'Stand straight and measure the fullest part under the arm in circumference. The tape measure should be snug. Not so tight that it constricts breathing, but not so loose that the tape measure slides down.',
                },
                {
                  number: 2,
                  title: 'Waist',
                  description: 'Measure across your natural waistline.',
                },
                {
                  number: 3,
                  title: 'Sleeve Length',
                  description: 'Stand up straight with your arms down at your side and measure from your neck to where wrist meets your hand.',
                },
                {
                  number: 4,
                  title: 'Back Length',
                  description: 'Measure from the center of the neck at collar seam to the hem edge for back length.',
                },
              ].map((item, index) => (
                <div className="timeline-item mb-4 d-flex align-items-center" key={index}>
                  <div className="circle-number">{item.number}</div>
                  <div className={`line ${index === 3 ? 'last-line' : ''}`}></div>
                  <div className="ml-4">
                    <h3 className="text-primary" style={{ paddingLeft: '10px' }}>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 text-center">
            <img 
              src="/PageImage/body-measurement-1.jpg" 
              alt="Body Measurement Diagram" 
              className="img-fluid"
            />
          </div>
        </div>
      </div>
<div>
<div className="text-center mb-4">
          <button 
            className={`btn btn-${unit === 'inches' ? 'primary' : 'secondary'} mr-2`} 
            onClick={() => handleUnitChange('inches')}
            style={{ width: '50%' }} // Adjusted button width
          >
            Inches
          </button>
          <button 
            className={`btn btn-${unit === 'centimeters' ? 'primary' : 'secondary'}`} 
            onClick={() => handleUnitChange('centimeters')}
            style={{ width: '50%' }} // Adjusted button width
          >
            Centimeters
          </button>
        </div>



        <div className="table-responsive">
  <table className="table table-bordered">
    <thead className="table-dark">
      <tr>
        <th>SIZE</th>
        <th>YOUR CHEST</th>
        <th>YOUR WAIST</th>
        <th>YOUR SLEEVE</th>
        <th>YOUR BACK LENGTH</th>
      </tr>
    </thead>
    <tbody>
      {westChartData[unit].map((row, index) => (
        <tr key={index}>
          <td>{row.size}</td>
          <td>{row.chest}</td>
          <td>{row.waist}</td>
          <td>{row.sleeve}</td>
          <td>{row.backLength}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>



{/* new */}
<div className="container my-5">
        <h1 className=" text-danger mb-4">Jacket Measurements</h1>
        <p className="text-center mb-5">
        Please Note: These measurements are based on measuring a similar garment out flat on a table, and measuring across the 5 points shown in the picture ONLY. Do not measure around a physical body.<br/>

Individual finished garment measurements may vary by +/- .6 inch (1-2 cm). As our garments are custom made to order, we don't offer exchanges or refunds for incorrect sizes or change of mind.<br/>

Please note that Column A shows across chest measurement of the finished garment and not circumferencial measurement. In order to calculate chest size mulitply it by 2.
        </p>

        

        <div className="text-center">

          <div className="">
            <img 
              src="/pageImage/jacket-measurement.png" 
              alt="Body Measurement Diagram" 
              className="img-fluid"
            />
          </div>
        </div>
      </div>
<div>
<div className="text-center mb-4">
          <button 
            className={`btn btn-${unit === 'inches' ? 'primary' : 'secondary'} mr-2`} 
            onClick={() => handleUnitChange('inches')}
            style={{ width: '50%' }} // Adjusted button width
          >
            Inches
          </button>
          <button 
            className={`btn btn-${unit === 'centimeters' ? 'primary' : 'secondary'}`} 
            onClick={() => handleUnitChange('centimeters')}
            style={{ width: '50%' }} // Adjusted button width
          >
            Centimeters
          </button>
        </div>



        <div className="table-responsive">
  <table className="table table-bordered">
    <thead className="table-dark">
      <tr>
        <th>SIZE</th>
        <th>1 – Chest</th>
        <th>2 – Sleeves</th>
        <th>3 – Across Shoulder</th>
        <th>4 – Shoulder</th>
        <th>5 – Back Length</th>
      </tr>
    </thead>
    <tbody>
      {chestChartData[unit].map((row, index) => (
        <tr key={index}>
          <td>{row.size}</td>
          <td>{row.chest}</td>
          <td>{row.sleeves}</td>
          <td>{row.acrossShoulder}</td>
          <td>{row.shoulder}</td>
          <td>{row.backLength}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>
























      <style jsx>{`
        .circle-number {
          width: 50px;
          height: 50px;
          background-color: #007bff;
          color: white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 20px;
          font-weight: bold;
          z-index: 2;
          position: relative;
        }

        .line {
          width: 2px;
          background-color: #007bff;
          margin-left: 24px;
          height: 100px;
          position: relative;
          z-index: 1;
        }

        .last-line {
          height: 50px; /* Adjust this for the last item */
        }

        .timeline-item {
          position: relative;
          padding-left: 60px;
        }

        .ml-4 {
          margin-left: 20px;
        }

        .timeline-item .line {
          height: 100px; /* Adjust the line height as needed */
        }

        .timeline-item .circle-number {
          position: absolute;
          left: -35px;
          top: 0;
        }
      `}</style>
      </div>
    </Layout>
  );
};

export default SizeChart;
