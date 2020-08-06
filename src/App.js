import React from 'react';
import Calculator from './components/calculator/calculator';
import './App.css';

function App() {
  return (
    <div className='calculator'>
      <div className='container'>
        <h1>Loan Calculator</h1>
        <Calculator />
      </div>
    </div>
  );
}

export default App;
