/**
 * skenario pengujian
 *
 * - VoteButton component
 *   - should render upVotes and downVotes count correctly
 *   - should call onUpVote with id when upVote button is clicked
 *   - should call onDownVote with id when downVote button is clicked
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
import VoteButton from './VoteButton';

expect.extend(matchers);

describe('VoteButton component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should render upVotes and downVotes count correctly', () => {
    // Arrange
    render(
      <VoteButton
        id="thread-1"
        upVotesBy={['users-1', 'users-2']}
        downVotesBy={['users-3']}
        authUserId="users-1"
        onUpVote={() => {}}
        onDownVote={() => {}}
      />,
    );

    // Assert
    const upVoteButton = screen.getByRole('button', { name: 'Up vote' });
    const downVoteButton = screen.getByRole('button', { name: 'Down vote' });
    expect(upVoteButton).toHaveTextContent('2');
    expect(downVoteButton).toHaveTextContent('1');
  });

  it('should call onUpVote with id when upVote button is clicked', async () => {
    // Arrange
    const mockUpVote = vi.fn();
    render(
      <VoteButton
        id="thread-1"
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="users-1"
        onUpVote={mockUpVote}
        onDownVote={() => {}}
      />,
    );
    const upVoteButton = screen.getByRole('button', { name: 'Up vote' });

    // Action
    await userEvent.click(upVoteButton);

    // Assert
    expect(mockUpVote).toHaveBeenCalledWith('thread-1');
  });

  it('should call onDownVote with id when downVote button is clicked', async () => {
    // Arrange
    const mockDownVote = vi.fn();
    render(
      <VoteButton
        id="thread-1"
        upVotesBy={[]}
        downVotesBy={[]}
        authUserId="users-1"
        onUpVote={() => {}}
        onDownVote={mockDownVote}
      />,
    );
    const downVoteButton = screen.getByRole('button', { name: 'Down vote' });

    // Action
    await userEvent.click(downVoteButton);

    // Assert
    expect(mockDownVote).toHaveBeenCalledWith('thread-1');
  });
});
