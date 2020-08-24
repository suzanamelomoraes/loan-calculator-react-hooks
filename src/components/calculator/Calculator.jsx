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

  const [error, setError] = useState('');

  const validate = () => {
    let actualError = '';
    // Validate if there are values
    if (!userValues.amount || !userValues.interest || !userValues.years) {
      actualError = 'All the values are required';
    }
    // Validade if the values are numbers
    if (
      isNaN(userValues.amount) ||
      isNaN(userValues.interest) ||
      isNaN(userValues.years)
    ) {
      actualError = 'Please give a positive number';
    }
    // Validade if the values are positive numbers
    if (
      parseFloat(userValues.amount) <= 0 ||
      parseFloat(userValues.interest) <= 0 ||
      parseFloat(userValues.years) <= 0
    ) {
      actualError = 'Please give a positive number';
    }
    if (actualError) {
      setError(actualError);
      return false;
    }
    return true;
  };

  // Handle the data submited by the user by sending it to the calculateResults function
  const handleSubmitValues = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      setError('');
      calculateResults(userValues);
    }
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

      // Set up results to the state to be displayed to the user
      const newResults = { ...results };
      newResults.monthlyPaymentUI = monthlyPayment;
      newResults.totalPaymentUI = totalPayment;
      newResults.totalInterestUI = totalInterest;
      newResults.isResult = true;
      setResults(newResults);
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
    <div>
      <p className='error'>{error}</p>
      <form className='myform' onSubmit={handleSubmitValues}>
        {/* ternary operator manages when the calculator and results will be displayed to the user */}
        {!results.isResult ? (
          //   Form to collect data from the user
          <div className='form-items'>
            <div>
              <label id='mylabel'>Amount:</label>
              <input
                type='text'
                name='amount'
                placeholder='Loan amount'
                value={userValues.amount}
                //   onChange sets the values given by the user as input to the userValues state
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
          //   Form to display the results to the user
          <div className='form-items'>
            <h4>
              Loan amount: ${userValues.amount} <br /> Interest:{' '}
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
            {/* Button to clear fields */}
            <input
              className='button'
              value='Calculate again'
              type='button'
              onClick={() => clearFields()}
            />
          </div>
        )}
      </form>
    </div>
  );
}

export default Calculator;
