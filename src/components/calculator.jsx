import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function Calculator() {
  const { register, handleSubmit } = useForm();
  const [results, setResults] = useState({
    monthlyPayment: '',
    totalPayment: '',
    totalInterest: '',
  });

  const onSubmit = (data) => calculateResults(data);

  const calculateResults = ({ amount, interest, year }) => {
    const initialAmount = parseFloat(amount),
      calculatedinterest = parseFloat(interest) / 100 / 12,
      calculatedPayments = parseFloat(year) * 12,
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
          <label>Years:</label>
          <input
            name='year'
            placeholder='Years to repay'
            ref={register({
              required: true,
              validate: {
                positive: (value) => parseInt(value, 10) > 0,
              },
            })}
          />
          <input type='submit' className='submit' />
        </div>
      </form>

      <div>
        <p>Monthly Payment: {results.monthlyPayment}</p>
        <p>Total Payment: {results.totalPayment}</p>
        <p>Total Interest: {results.totalInterest}</p>
      </div>
    </div>
  );
}

export default Calculator;
