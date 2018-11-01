import React, { Component, Fragment } from 'react';
import './App.css';
import CalculatorButton from './components/CalculatorButton';
import DisplayBar from './components/DisplayBar';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_line: null,
      second_line: 0,
      operation: "",
      total: 0
    };
    // Bind this
    this.handleNumberButtonClick = this.handleNumberButtonClick.bind(this);
    this.handleOperationButtonClick = this.handleOperationButtonClick.bind(this);
    this.handleEqualButtonClick = this.handleEqualButtonClick.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
  }

  handleNumberButtonClick(value){
    // Second line is always active
    const currentValue = this.state.second_line;
    // Multiply it by 10 then add new number
    var newValue = (currentValue*10) + value;
    this.setState({
      second_line: newValue
    });
  }

  handleOperationButtonClick(operation){
    // Is there a previous operation?
    var oldValue = 0;
    if(this.state.first_line != null){
      oldValue = calculateResult(this.state.first_line, this.state.second_line, this.state.operation);
    }
    else{
      oldValue = this.state.second_line;
    }
    this.setState({
      first_line: oldValue,
      operation: operation,
      second_line: 0
    });
  }

  handleEqualButtonClick(){
    // Get values
    const firstValue = this.state.first_line;
    const secondValue = this.state.second_line;
    const operation = this.state.operation;
    // Calculate it
    var result = calculateResult(firstValue, secondValue, operation);
    this.setState({
      first_line: null,
      operation: "",
      second_line: result
    });
  }

  
  handleClearButtonClick(){
    this.setState({
      first_line: null,
      operation: "",
      second_line: 0
    });
  }

  render() {
    // Display all numbers
    const validNumbers = [1,2,3,4,5,6,7,8,9,0];
    const numberButtons = validNumbers.map( number => {
        return (
            <CalculatorButton
            key={"number" + number}
            text={number}
            onClick={() => this.handleNumberButtonClick(number)}
          />
        );
    });
    const validOperations = ["+", "-", "*", "/"];
    const operationButtons = validOperations.map( operation => {
        return (
            <CalculatorButton
            key={"operation" + operation}
            text={operation}
            onClick={() => this.handleOperationButtonClick(operation)}
          />
        );
    });
    return (
      <div className="App">
        <DisplayBar 
          data={this.state}
        />
        <Fragment>
          {numberButtons}
        </Fragment>
        <br />
        <Fragment>
          {operationButtons}
        </Fragment>
        <Fragment>
          <CalculatorButton
            key="operation="
            text="="
            onClick={() => this.handleEqualButtonClick()}
          />
          <CalculatorButton
            key="operation_clear"
            text="clr"
            onClick={() => this.handleClearButtonClick()}
          />
        </Fragment>
      </div>
    );
  }
}

function calculateResult(firstValue, secondValue, operation){
  var result = 0;
  // Instead of eval...
  if(operation === '+'){
    result = firstValue + secondValue;
  }
  else if(operation === '-'){
    result = firstValue - secondValue;
  }
  else if(operation === '*'){
    result = firstValue * secondValue;
  }
  else if(operation === '/' && secondValue !== 0){ // Handle exceptions
    result = firstValue/secondValue;
  }
  return result;
}

export default App;
