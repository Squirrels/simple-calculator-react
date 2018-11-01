import React from 'react';

function DisplayBar(props){
    return(
        <div > 
            { props.data.first_line }
            <br/>
            { props.data.operation }
            <br/>
            { props.data.second_line } 
        </div>
    );
}

export default DisplayBar;