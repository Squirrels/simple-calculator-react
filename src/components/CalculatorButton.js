import React from 'react';

// We can just use a functional component, since it just needs to display information
function CalculatorButton(props){
    return(
        <button
            onClick={ props.onClick }
        >
            { props.text }
        </button>
    );
}

export default CalculatorButton;