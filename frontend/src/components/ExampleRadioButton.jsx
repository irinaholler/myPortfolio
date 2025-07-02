import React, { useState } from 'react';
import RadioButtonTracker from './RadioButtonTracker';
import '../styles/ExampleRadioButton.scss';

const ExampleRadioButton = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const onRadioChange = (optionId) => {
        setSelectedOption(optionId);
    };

    return (
        <fieldset className="example-radio-group">
            <legend>Select an option:</legend>

            <RadioButtonTracker buttonId="option1">
                <div className="radio-option">
                    <input
                        type="radio"
                        id="option1"
                        name="example"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={() => onRadioChange('option1')}
                    />
                    <label htmlFor="option1">Option 1</label>
                </div>
            </RadioButtonTracker>

            <RadioButtonTracker buttonId="option2">
                <div className="radio-option">
                    <input
                        type="radio"
                        id="option2"
                        name="example"
                        value="option2"
                        checked={selectedOption === 'option2'}
                        onChange={() => onRadioChange('option2')}
                    />
                    <label htmlFor="option2">Option 2</label>
                </div>
            </RadioButtonTracker>

            <RadioButtonTracker buttonId="option3">
                <div className="radio-option">
                    <input
                        type="radio"
                        id="option3"
                        name="example"
                        value="option3"
                        checked={selectedOption === 'option3'}
                        onChange={() => onRadioChange('option3')}
                    />
                    <label htmlFor="option3">Option 3</label>
                </div>
            </RadioButtonTracker>

            <p>Selected: {selectedOption || 'None'}</p>
        </fieldset>
    );
};

export default ExampleRadioButton;
