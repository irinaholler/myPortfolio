import React, { useState } from 'react';
import RadioButtonTracker from './RadioButtonTracker';
import '../styles/ExampleRadioButton.scss';

const ExampleRadioButton = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div className="example-radio-group">
            <h3>Select an option:</h3>

            <RadioButtonTracker buttonId="option1">
                <div className="radio-option">
                    <input
                        type="radio"
                        id="option1"
                        name="example"
                        value="option1"
                        checked={selectedOption === 'option1'}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                    <label htmlFor="option3">Option 3</label>
                </div>
            </RadioButtonTracker>

            <p>Selected: {selectedOption || 'None'}</p>
        </div>
    );
};

export default ExampleRadioButton; 