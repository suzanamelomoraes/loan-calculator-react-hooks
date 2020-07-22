import React, { useState } from 'react';

function Calculator() {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [year, setYear] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [totalInterest, setTotalInterest] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !interest || !year) return;
    calculateResults(amount, interest, year);
    setAmount('');
    setInterest('');
    setYear('');
  };

  const calculateResults = (amount, interest, year) => {
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
      setMonthlyPayment(initialMonthlyPayment);
      setTotalPayment(initialTotalPayment);
      setTotalInterest(initialTotalInterest);
    }
  };

  return (
    <div>
      <form className='myform'>
        <div className='form-items'>
          <label>
            Amount:
            <input
              type='number'
              value={amount}
              placeholder='Total amount'
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <label>
            {' '}
            Interest:
            <input
              type='number'
              value={interest}
              placeholder='Interest'
              onChange={(e) => setInterest(e.target.value)}
            />
          </label>
          <label>
            {' '}
            Years:
            <input
              type='number'
              value={year}
              placeholder='Years to repay'
              onChange={(e) => setYear(e.target.value)}
            />
          </label>
        </div>

        <button onClick={handleSubmit}>Submit</button>
      </form>

      <div>
        <p>Monthly Payment: {monthlyPayment}</p>
        <p>Total Payment: {totalPayment}</p>
        <p>Total Interest: {totalInterest}</p>
      </div>
    </div>
  );
}

export default Calculator;
