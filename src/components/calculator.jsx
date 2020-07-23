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

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     if (!amount || !interest || !year) return;
  //     calculateResults(amount, interest, year);
  //     setAmount('');
  //     setInterest('');
  //     setYear('');
  //   };

  const calculateResults = ({ amount, interest, year }) => {
    const initialAmount = amount,
      calculatedinterest = interest / 100 / 12,
      calculatedPayments = year * 12,
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
      results.monthlyPayment = initialMonthlyPayment;
      results.totalPayment = initialTotalPayment;
      results.totalInterest = initialTotalInterest;
      setResults({ newResults });
      console.log(results);
    }
  };

  return (
    <div>
      <form className='myform' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-items'>
          <input
            type='number'
            name='amount'
            ref={register({
              required: true,
              validate: {
                positive: (value) => parseInt(value, 10) > 0,
              },
            })}
          />
          <input
            type='number'
            name='interest'
            ref={register({
              required: true,
              validate: {
                positive: (value) => parseInt(value, 10) > 0,
              },
            })}
          />
          <input
            type='number'
            name='year'
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

      {/* // <div>
    //   <form className='myform' onSubmit={handleSubmit}>
    //     <div className='form-items'>
    //       <label>Amount:</label>
    //       <input */}
      {/* //         type='number'
    //         value={amount}
    //         placeholder='Total amount'
    //         onChange={(e) => setAmount(e.target.value)}
    //       />

    //       <label> Interest:</label>
    //       <input */}
      {/* //         type='number'
    //         value={interest}
    //         placeholder='Interest'
    //         onChange={(e) => setInterest(e.target.value)}
    //       />

    //       <label> Years:</label>
    //       <input */}
      {/* //         type='number'
    //         value={year}
    //         placeholder='Years to repay'
    //         onChange={(e) => setYear(e.target.value)}
    //       />
    //     </div> */}

      {/* //     <input type='submit' value='Submit' className='submit' />
    //   </form> */}

      {/* //   <div>
    //     <p>Monthly Payment: {monthlyPayment}</p>
    //     <p>Total Payment: {totalPayment}</p>
    //     <p>Total Interest: {totalInterest}</p>
    //   </div>

    </div> */}
    </div>
  );
}

export default Calculator;
