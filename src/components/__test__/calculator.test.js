import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './../calculator/calculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<form></form>, div);
});
