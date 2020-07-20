import React, { useState } from 'react';

function Calculator() {
  const [amount, setAmount] = useState('');
  const [interest, setInterest] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !interest || !year) return;
  };

  console.log(amount);
  console.log(interest);
  console.log(year);

  return (
    <div>
      <form>
        <input
          type='number'
          value={amount}
          placeholder='amount'
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type='number'
          value={interest}
          placeholder='interest'
          onChange={(e) => setInterest(e.target.value)}
        />
        <input
          type='number'
          value={year}
          placeholder='year'
          onChange={(e) => setYear(e.target.value)}
        />
      </form>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default Calculator;
