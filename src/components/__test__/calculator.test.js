import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Calculator from '../calculator/Calculator';
import 'mutationobserver-shim';

describe('Calculator', () => {
  test('renders App component', () => {
    render(<Calculator />);
  });
});
