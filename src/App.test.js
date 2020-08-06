import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from './App';
import 'mutationobserver-shim';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });
});

// Initial test included in the template by react-create-app

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
