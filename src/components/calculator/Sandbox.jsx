import React, { useState } from 'react';

const Calculator = () => {
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  const handleSubmitValues = (e) => {
    e.preventDefault();
    console.log(userValues);
  };

  return (
    <form onSubmit={handleSubmitValues}>
      <div>
        <div>
          <label>Amount:</label>
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
};

export default Calculator;
