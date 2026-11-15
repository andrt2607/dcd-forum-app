/**
 * skenario pengujian
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call addThread function when submit button is clicked
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
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText(
      'Apa topik yang ingin Anda diskusikan?',
    );

    // Action
    await userEvent.type(titleInput, 'Belajar Testing di React');

    // Assert
    expect(titleInput).toHaveValue('Belajar Testing di React');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText(
      'Contoh: react, redux, javascript, perkenalan',
    );

    // Action
    await userEvent.type(categoryInput, 'testing');

    // Assert
    expect(categoryInput).toHaveValue('testing');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const bodyInput = await screen.getByPlaceholderText(
      'Tuliskan pertanyaan, pengalaman, atau gagasan Anda secara lengkap...',
    );

    // Action
    await userEvent.type(bodyInput, 'Ini adalah isi diskusi mengenai unit testing.');

    // Assert
    expect(bodyInput).toHaveValue('Ini adalah isi diskusi mengenai unit testing.');
  });

  it('should call addThread function when submit button is clicked', async () => {
    // Arrange
    const mockAddThread = vi.fn();
    render(<ThreadInput addThread={mockAddThread} />);
    const titleInput = await screen.getByPlaceholderText(
      'Apa topik yang ingin Anda diskusikan?',
    );
    await userEvent.type(titleInput, 'Belajar Testing di React');
    const categoryInput = await screen.getByPlaceholderText(
      'Contoh: react, redux, javascript, perkenalan',
    );
    await userEvent.type(categoryInput, 'testing');
    const bodyInput = await screen.getByPlaceholderText(
      'Tuliskan pertanyaan, pengalaman, atau gagasan Anda secara lengkap...',
    );
    await userEvent.type(bodyInput, 'Ini adalah isi diskusi mengenai unit testing.');
    const submitButton = await screen.getByRole('button', { name: /Terbitkan Diskusi/i });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Belajar Testing di React',
      category: 'testing',
      body: 'Ini adalah isi diskusi mengenai unit testing.',
    });
  });
});
