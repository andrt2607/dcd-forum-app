/**
 * skenario pengujian
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import {
  describe,
  it,
  expect,
  afterEach,
  vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    // Action
    await userEvent.type(emailInput, 'emailtest@dicoding.com');

    // Assert
    expect(emailInput).toHaveValue('emailtest@dicoding.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Masukkan kata sandi');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    await userEvent.type(emailInput, 'emailtest@dicoding.com');
    const passwordInput = await screen.getByPlaceholderText('Masukkan kata sandi');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: /Masuk Sekarang/i });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'emailtest@dicoding.com',
      password: 'passwordtest',
    });
  });
});
