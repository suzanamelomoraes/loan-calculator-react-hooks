import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Calculator() {
  // Initialise the hook
  // Register your input into the hook by invoking the 'register' function
  // Handle-Submit will validate your input before invoking 'onSubmit'
  // Errors is an object provided by Hook Form you can use to show errors while validating inputs

  const { register, handleSubmit, errors } = useForm();

  // state to
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
    initialData: '',
  });

  // Hook-form registered fields returns a object with key(name): value
  const onSubmit = (data, e) => {
    calculateResults(data);
    e.target.reset();
  };

  // Calculation
  const calculateResults = ({ amount, interest, years }) => {
    const initialAmount = parseFloat(amount),
      calculatedinterest = parseFloat(interest) / 100 / 12,
      calculatedPayments = parseFloat(years) * 12,
      x = Math.pow(1 + calculatedinterest, calculatedPayments),
      monthly = (initialAmount * x * calculatedinterest) / (x - 1);

    if (isFinite(monthly)) {
      const initialMonthlyPayment = monthly.toFixed(2),
        initialTotalPayment = (monthly * calculatedPayments).toFixed(2),
        initialTotalInterest = (
          monthly * calculatedPayments -
          initialAmount
        ).toFixed(2);
      // Set up results to the state
      const newResults = { ...results };
      newResults.monthlyPayment = initialMonthlyPayment;
      newResults.totalPayment = initialTotalPayment;
      newResults.totalInterest = initialTotalInterest;
      newResults.isResult = true;
      newResults.initialData = (
        <h4>
          {' '}
          Loan amount: ${amount} <br /> Interest: {interest}% <br /> Years to
          repay: {years}{' '}
        </h4>
      );
      setResults(newResults);
    }
    return;
  };

  // Clear input fields
  const clearFields = () => {
    const newResults = { ...results };
    newResults.monthlyPayment = '';
    newResults.totalPayment = '';
    newResults.totalInterest = '';
    newResults.isResult = false;
    setResults(newResults);
  };

  // Each field is required to have a unique name, which will be the key for the registration process

  return (
    <div>
      <form className='myform' onSubmit={handleSubmit(onSubmit)}>
        {!results.isResult && (
          <div className='form-items'>
            <div>
              <label id='mylabel'>Amount:</label>
              <input
                name='amount'
                placeholder='Loan amount'
                // Include your validation as an object argument of register method)
                ref={register({
                  required: true,
                  validate: {
                    positive: (value) => parseFloat(value, 10) > 0,
                  },
                })}
              />
              {/* Errors will return when field validation fails. If you have more than one validation type specify the type */}
              {errors.amount?.type === 'required' && (
                <p>Your input is required</p>
              )}
              {errors.amount?.type === 'positive' && (
                <p>Please give a valid positive number</p>
              )}
            </div>
            <div>
              <label id='mylabel'>Interest:</label>
              <input
                name='interest'
                placeholder='Interest'
                ref={register({
                  required: true,
                  validate: {
                    positive: (value) => parseFloat(value, 10) > 0,
                  },
                })}
              />
              {errors.interest?.type === 'required' && (
                <p>Your input is required</p>
              )}
              {errors.interest?.type === 'positive' && (
                <p>Please give a valid positive number</p>
              )}
            </div>
            <div>
              <label id='mylabel'>Years:</label>
              <input
                name='years'
                placeholder='Years to repay'
                ref={register({
                  required: true,
                  validate: {
                    positive: (value) => parseInt(value, 10) > 0,
                  },
                })}
              />
              {errors.years?.type === 'required' && (
                <p>Your input is required</p>
              )}
              {errors.years?.type === 'positive' && (
                <p>Please give a valid positive number</p>
              )}
            </div>

            <input type='submit' className='submit' />
          </div>
        )}

        {results.isResult && (
          <div className='form-items'>
            {results.initialData}
            <div>
              <label id='mylabel'>Monthly Payment:</label>
              <input type='text' value={results.monthlyPayment} disabled />
            </div>
            <div>
              <label id='mylabel'>Total Payment: </label>
              <input type='text' value={results.totalPayment} disabled />
            </div>
            <div>
              <label id='mylabel'>Total Interest:</label>
              <input type='text' value={results.totalInterest} disabled />
            </div>

            <input
              className='clear-field'
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
