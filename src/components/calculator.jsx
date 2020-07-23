import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Calculator() {
  const { register, handleSubmit, errors, reset } = useForm();
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
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
      setResults(newResults);
    }
  };

  return (
    <div>
      <form className='myform' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-items'>
          <label>Amount:</label>
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
          {errors.amount?.type === 'required' && <p>Your input is required</p>}
          {errors.amount?.type === 'positive' && (
            <p>Please give a valid positive number</p>
          )}
          <label>Interest:</label>
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
          <label>Years:</label>
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
          <input type='submit' className='submit' />
        </div>
      </form>

      <div>
        <h4>Results:</h4>
        <label>Monthly Payment:</label>
        <input type='text' value={results.monthlyPayment} disabled />
        <label>Total Payment: </label>
        <input type='text' value={results.totalPayment} disabled />
        <label>Total Interest:</label>
        <input type='text' value={results.totalInterest} disabled />
      </div>
    </div>
  );
}

export default Calculator;
