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
            onChange={(event) =>
              setUserValues({ ...userValues, amount: event.target.value })
            }
          />
        </div>
        <div>
          <label id='mylabel'>Interest:</label>
          <input
            type='text'
            name='interest'
            placeholder='Interest'
            value={userValues.interest}
            onChange={(event) =>
              setUserValues({ ...userValues, interest: event.target.value })
            }
          />
        </div>
        <div>
          <label id='mylabel'>Years:</label>
          <input
            type='text'
            name='years'
            placeholder='Years to repay'
            value={userValues.years}
            onChange={(event) =>
              setUserValues({ ...userValues, years: event.target.value })
            }
          />
        </div>
        <input type='submit' className='button' />
      </div>
    </form>
  );
}

export default Calculator;
