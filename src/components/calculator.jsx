import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Calculator() {
  const { register, handleSubmit, errors } = useForm();
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
    isResult: false,
  });

  const onSubmit = (data, e) => {
    calculateResults(data);
    e.target.reset();
  };

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
      const newResults = { ...results };
      newResults.monthlyPayment = initialMonthlyPayment;
      newResults.totalPayment = initialTotalPayment;
      newResults.totalInterest = initialTotalInterest;
      newResults.isResult = true;
      setResults(newResults);
    }
  };

  const clearFields = () => {
    const newResults = { ...results };
    newResults.monthlyPayment = '';
    newResults.totalPayment = '';
    newResults.totalInterest = '';
    newResults.isResult = false;
    setResults(newResults);
  };

  return (
    <div>
      <form className='myform' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-items'>
          <div>
            <label id='mylabel'>Amount:</label>
            <input
              name='amount'
              placeholder='Loan amount'
              ref={register({
                required: true,
                validate: {
                  positive: (value) => parseFloat(value, 10) > 0,
                },
              })}
            />
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
            {errors.years?.type === 'required' && <p>Your input is required</p>}
            {errors.years?.type === 'positive' && (
              <p>Please give a valid positive number</p>
            )}
          </div>

          <input type='submit' className='submit' />
        </div>

        {results.isResult && (
          <div className='form-items'>
            <h4>Results:</h4>
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
