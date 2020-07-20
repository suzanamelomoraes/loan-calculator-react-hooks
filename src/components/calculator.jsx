import React, { useState } from 'react';

function Calculator() {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [year, setYear] = useState('');
  return (
    <div>
      <form>
        <input
          type='number'
          value={amount}
          placeholder='amount'
          onChange={(e) => setAmount(e.target.amount)}
        />
        <input
          type='number'
          value={interest}
          placeholder='interest'
          onChange={(e) => setInterest(e.target.interest)}
        />
        <input
          type='number'
          value={year}
          placeholder='year'
          onChange={(e) => setYear(e.target.year)}
        />
      </form>
    </div>
  );
}

export default Calculator;
