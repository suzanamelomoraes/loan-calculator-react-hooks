import React from 'react';
// import Calculator from './components/calculator/Calculator';
import CalculatorHookForm from './components/calculator/CalculatorHookForm';
import './App.css';

function App() {
  return (
    <div className='calculator'>
      <div className='container'>
        <h1>Loan Calculator</h1>
        <CalculatorHookForm />
      </div>
    </div>
  );
}

export default App;
