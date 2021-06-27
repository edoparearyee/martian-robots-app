import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

// eslint-disable-next-line jest/no-mocks-import
import { input } from './__mocks__/input';

test('runs app', () => {
  render(<App />);
  const linkElement = screen.getByText(/Martian Robots/i);
  expect(linkElement).toBeInTheDocument();
});

test('submits data with valid inputs', async () => {
  render(<App />);

  const inputEl = await screen.findByLabelText(/Enter instructions/i);

  await act(async () => {
    fireEvent.change(inputEl, { target: { value: input } });
  });

  const submitBtn = await screen.findByText(/Submit/);
  await act(async () => {
    fireEvent.click(submitBtn);
  });

  const output = screen.getByTestId('output');
  const expected = `1 1 E 3 3 N LOST 2 3 S`;
  expect(output).toHaveTextContent(expected);
});

test('submits data with invalid input', async () => {
  render(<App />);

  const inputEl = await screen.findByLabelText(/Enter instructions/i);

  await act(async () => {
    const value = `Invalid input`;
    fireEvent.change(inputEl, { target: { value } });
  });

  const submitBtn = await screen.findByText(/Submit/);
  await act(async () => {
    fireEvent.click(submitBtn);
  });

  const result = screen.getByText('Grid size is not valid');
  expect(result).toBeInTheDocument();
});

test('reset form and output', async () => {
  render(<App />);

  let inputEl = await screen.findByLabelText(/Enter instructions/i);

  await act(async () => {
    fireEvent.change(inputEl, { target: { value: input } });
  });

  const submitBtn = await screen.findByText(/Submit/);
  await act(async () => {
    fireEvent.click(submitBtn);
  });

  let output = screen.getByTestId('output');
  const expected1 = `1 1 E 3 3 N LOST 2 3 S`;
  expect(output).toHaveTextContent(expected1);

  const resetBtn = await screen.findByText(/Clear/);
  await act(async () => {
    fireEvent.click(resetBtn);
  });

  inputEl = await screen.findByLabelText(/Enter instructions/i);
  output = screen.getByTestId('output');
  const expected2 = '';
  expect(output).toHaveTextContent(expected2);
  expect((inputEl as HTMLInputElement).value).toBe('');
});
