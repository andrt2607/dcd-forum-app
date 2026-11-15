/**
 * skenario pengujian
 *
 * - CommentInput component
 *   - should display login prompt when authUser is null
 *   - should handle comment content typing correctly when authUser is provided
 *   - should call addComment function when submit button is clicked
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
import { MemoryRouter } from 'react-router-dom';
import CommentInput from './CommentInput';

expect.extend(matchers);

describe('CommentInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display login prompt when authUser is null', () => {
    // Arrange
    render(
      <MemoryRouter>
        <CommentInput addComment={() => {}} authUser={null} />
      </MemoryRouter>,
    );

    // Assert
    expect(screen.getByText(/masuk ke akun Anda/i)).toBeInTheDocument();
  });

  it('should handle comment content typing correctly when authUser is provided', async () => {
    // Arrange
    const authUser = { id: 'users-1', name: 'John Doe' };
    render(
      <MemoryRouter>
        <CommentInput addComment={() => {}} authUser={authUser} />
      </MemoryRouter>,
    );
    const commentTextarea = await screen.getByPlaceholderText(
      'Bagikan tanggapan atau solusi Anda...',
    );

    // Action
    await userEvent.type(commentTextarea, 'Komentar pengujian otomatis');

    // Assert
    expect(commentTextarea).toHaveValue('Komentar pengujian otomatis');
  });

  it('should call addComment function when submit button is clicked', async () => {
    // Arrange
    const mockAddComment = vi.fn();
    const authUser = { id: 'users-1', name: 'John Doe' };
    render(
      <MemoryRouter>
        <CommentInput addComment={mockAddComment} authUser={authUser} />
      </MemoryRouter>,
    );
    const commentTextarea = await screen.getByPlaceholderText(
      'Bagikan tanggapan atau solusi Anda...',
    );
    await userEvent.type(commentTextarea, 'Solusi yang sangat membantu!');
    const submitButton = await screen.getByRole('button', { name: /Kirim Komentar/i });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockAddComment).toHaveBeenCalledWith('Solusi yang sangat membantu!');
  });
});
