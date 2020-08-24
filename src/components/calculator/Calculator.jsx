import React, { useState } from 'react';

function Calculator() {
  // state to storage the values given by the user when filling the input fields
  const [userValues, setUserValues] = useState({
    amount: '',
    interest: '',
    years: '',
  });

  // state to storage the results of the calculation
  const [results, setResults] = useState({
    monthlyPaymentUI: '',
    totalPaymentUI: '',
    totalInterestUI: '',
    isResult: false,
  });

  const handleSubmitValues = (e) => {
    e.preventDefault();
    console.log('user values', userValues);
    calculateResults(userValues);
  };

  // Calculation
  const calculateResults = ({ amount, interest, years }) => {
    const userAmount = parseFloat(amount),
      calculatedInterest = parseFloat(interest) / 100 / 12,
      calculatedPayments = parseFloat(years) * 12,
      x = Math.pow(1 + calculatedInterest, calculatedPayments),
      monthly = (userAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
      const monthlyPayment = monthly.toFixed(2),
        totalPayment = (monthly * calculatedPayments).toFixed(2),
        totalInterest = (monthly * calculatedPayments - userAmount).toFixed(2);

      // Set up results to the state to display them to the user
      const newResults = { ...results };
      newResults.monthlyPaymentUI = monthlyPayment;
      newResults.totalPaymentUI = totalPayment;
      newResults.totalInterestUI = totalInterest;
      newResults.isResult = true;
      setResults(newResults);
      console.log('results after calculation', newResults);
      console.log('results after set the state', results);
    }
    return;
  };

  // Clear input fields
  const clearFields = () => {
    const clearUserValues = { ...userValues };
    clearUserValues.amount = '';
    clearUserValues.interest = '';
    clearUserValues.years = '';
    setUserValues(clearUserValues);

    const newResults = { ...results };
    newResults.monthlyPaymentUI = '';
    newResults.totalPaymentUI = '';
    newResults.totalInterestUI = '';
    newResults.isResult = false;
    setResults(newResults);
  };

  return (
    <form className='myform' onSubmit={handleSubmitValues}>
      {!results.isResult ? (
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
      ) : (
        //   Display the results to the user
        <div className='form-items'>
          <h4>
            Loan amount: ${userValues.amount} <br /> Interest:
            {userValues.interest}% <br /> Years to repay: {userValues.years}
          </h4>
          <div>
            <label id='mylabel'>Monthly Payment:</label>
            <input type='text' value={results.monthlyPaymentUI} disabled />
          </div>
          <div>
            <label id='mylabel'>Total Payment: </label>
            <input type='text' value={results.totalPaymentUI} disabled />
          </div>
          <div>
            <label id='mylabel'>Total Interest:</label>
            <input type='text' value={results.totalInterestUI} disabled />
          </div>
          <input
            className='button'
            value='Calculate again'
            type='button'
            onClick={() => clearFields()}
          />
        </div>
      )}
    </form>
  );
}

export default Calculator;
