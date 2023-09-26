import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import FormInput from './FormInput'

const BimCalculator = props  => {
    const {getBimValue} = props;
    const [heightUnit, setHeightUnit] = useState('cm')
    const [weightUnit, setWeightUnit] = useState('kg')
    const [unit, setUnit] = useState('Metric')
    const [count, setCount] = useState({
        heightCount: '0',
        inchesCount: '0',
        weightCount: '0',
    });

    const{ heightCount, inchesCount, weightCount } = count;

    useEffect(() =>{
        metricBIM(heightCount, weightCount);
        imperialBMI(heightCount, weightCount, inchesCount);
        //eslint-disable-next-line
    }, [heightCount, weightCount, inchesCount]);

    const onChangeInput = e => {
        const { name, value } = e.target;
        setCount(prevState => ({ ...prevState, [name]: value }));
    }

    const onSelectTag = e => {
        setUnit(e.target.value);
        if (e.target.value === 'Metric'){
            setHeightUnit('cm');
            setWeightUnit('kg');
        } else {
            setHeightUnit('ft');
            setWeightUnit('lbs');
        }
    }

    const metricBIM = (height, weight) => {
        if (height > 0 && weight > 0) {
            const heightToMeter = height / 100;
            const bim = weight / Math.pow(heightToMeter, 2);
            getBimValue(Math.round(bim));
        }
    }

    const imperialBMI = (height, weight, inches) => {
        if (height > 0 && weight > 0 && inches > 0) {
            const heightToInches = (height * 12) + parseInt(inches);
            const bim = 703 * (weight / Math.pow(heightToInches, 2));
            getBimValue(Math.round(bim));
        }
    }

    const resetData = e => {
        e.preventDefault();

        getBimValue(0);
        setUnit('Metric');
        setCount({
            heightCount: '0',
            inchesCount: '0',
            weightCount: '0',
        })
        setHeightUnit('cm');
        setWeightUnit('kg');
    }

  return (
    <>
        <div className='bim-inputs'>
            <div className='input-fields'>
                <div>
                    <span className='label-unit'>Unit</span>
                    <div className='unit'>
                        <select
                            name='unit'
                            value={unit}
                            onChange={onSelectTag}
                            className='form-control form-control-sm'
                        >
                            <option value="Metric">Metric</option>
                            <option value="Imperial">Imperial</option>
                        </select>
                    </div>
                </div>
                <FormInput 
                    type='text' 
                    name='heightCount'
                    title={`Height (${heightUnit})`}
                    value={heightCount}
                    onChange={onChangeInput}
                    >

                </FormInput>
                {
                    unit === 'Imperial' ?
                <FormInput 
                    type='text' 
                    name='inchesCount'
                    title={` (in)`}
                    value={inchesCount}
                    onChange={onChangeInput}
                    >

                </FormInput> : ''
                }
                
                <FormInput 
                    type='text' 
                    name='weightCount'
                    title={`Weight (${weightUnit})`}
                    value={weightCount}
                    onChange={onChangeInput}
                    >

                </FormInput>
            </div>

            <button className='button' type='submit' onClick={resetData}>
                Reset
            </button>
        </div>
    </>
  )
}

BimCalculator.propTypes = {
    getBimValue: PropTypes.func.isRequired
}

export default BimCalculator