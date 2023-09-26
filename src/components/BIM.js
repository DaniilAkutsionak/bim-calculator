import React, { useState } from 'react'
import BimCalculator from './BimCalculator';

const BIM = () => {
  const [bimValue, setBimValue] = useState(0);

  const getBimClass = bim => {
    if (bim >= 1 && bim <= 18.5) return 'Underweight';
    if (bim >= 18.5 && bim <= 24.9) return 'Normal weight';
    if (bim >= 24.9 && bim <= 29.9) return 'Overweight';
    if (bim >= 30) return 'Obese';
  }

  const bimCategory = getBimClass(bimValue);
  let bimClass = '';
  if (bimValue > 0 && bimCategory) {
    bimClass = bimCategory.split(' ')[0].toLowerCase();
  }

  const bimBackgroundColor = bim =>{
    if (bim >= 1 && bim <= 18.5) return '#FED88B';
    if (bim >= 18.5 && bim <= 24.9) return '#80ff80';
    if (bim >= 24.9 && bim <= 29.9) return '#FF7F50';
    if (bim >= 30) return '#FF5411';
  }

  return (
    <>
      <div className='calculator'
        style={{backgroundColor: bimBackgroundColor(bimValue)}}
      >
        <h3>Body Mass Index Calculator</h3>
        <div className='bim-result-container'>
          <div className='bim-result'>
            <div className='bim-result-number'>
              Body Mass Index (BMI) = {bimValue}
            </div>
            <div className={`bim-category ${bimClass}`} >
              {bimCategory}
            </div>

          </div>

        </div>
        <BimCalculator getBimValue={setBimValue}></BimCalculator>
      </div>
    </>
  )
}

export default BIM;