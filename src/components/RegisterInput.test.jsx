/**
 * skenario pengujian
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
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
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Masukkan nama lengkap Anda');

    // Action
    await userEvent.type(nameInput, 'Dicoding User');

    // Assert
    expect(nameInput).toHaveValue('Dicoding User');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    // Action
    await userEvent.type(emailInput, 'user@dicoding.com');

    // Assert
    expect(emailInput).toHaveValue('user@dicoding.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Minimal 6 karakter');

    // Action
    await userEvent.type(passwordInput, 'rahasia123');

    // Assert
    expect(passwordInput).toHaveValue('rahasia123');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Masukkan nama lengkap Anda');
    await userEvent.type(nameInput, 'Dicoding User');
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    await userEvent.type(emailInput, 'user@dicoding.com');
    const passwordInput = await screen.getByPlaceholderText('Minimal 6 karakter');
    await userEvent.type(passwordInput, 'rahasia123');
    const registerButton = await screen.getByRole('button', { name: /Daftar Akun/i });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'Dicoding User',
      email: 'user@dicoding.com',
      password: 'rahasia123',
    });
  });
});
