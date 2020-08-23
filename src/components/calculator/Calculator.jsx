import React, { useState } from 'react';

function Calculator() {
  const [valuesGivenByUser, setValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  return (
    <form className='myform'>
      <div className='form-items'>
        <div>
          <label id='mylabel'>Amount:</label>
          <input type='text' name='amount' placeholder='Loan amount' />
        </div>
        <div>
          <label id='mylabel'>Interest:</label>
          <input type='text' name='interest' placeholder='Interest' />
        </div>
        <div>
          <label id='mylabel'>Years:</label>
          <input type='text' name='years' placeholder='Years to repay' />
        </div>
      </div>
    </form>
  );
}

export default Calculator;
