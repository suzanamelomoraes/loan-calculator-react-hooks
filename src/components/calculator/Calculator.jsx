import React, { useState } from 'react';

function Calculator() {
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  return (
    <form className='myform'>
      <div className='form-items'>
        <div>
          <label id='mylabel'>Amount:</label>
          <input
            type='text'
            name='amount'
            placeholder='Loan amount'
            value={userValues.amount}
          />
        </div>
        <div>
          <label id='mylabel'>Interest:</label>
          <input
            type='text'
            name='interest'
            placeholder='Interest'
            value={userValues.interest}
          />
        </div>
        <div>
          <label id='mylabel'>Years:</label>
          <input
            type='text'
            name='years'
            placeholder='Years to repay'
            value={userValues.years}
          />
        </div>
      </div>
    </form>
  );
}

export default Calculator;
