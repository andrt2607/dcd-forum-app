/**
 * skenario pengujian
 *
 * - asyncAddThread thunk
 *  - should dispatch action correctly when createThread success
 *  - should dispatch action and call alert correctly when createThread failed
 * - asyncToogleUpVoteThread thunk
 *  - should dispatch optimistic upVote and rollback when api.upVoteThread failed
 */

import {
  describe,
  beforeEach,
  afterEach,
  it,
  vi,
  expect,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncAddThread,
  asyncToogleUpVoteThread,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
} from './action';

const fakeNewThread = {
  id: 'thread-1',
  title: 'Thread Baru',
  body: 'Isi thread baru',
  category: 'react',
  createdAt: '2026-11-12T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: [],
  downVotesBy: [],
  totalComments: 0,
};

const fakeErrorResponse = new Error('Gagal memproses permintaan thread');

describe('threads thunk functions', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
    api._upVoteThread = api.upVoteThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    api.upVoteThread = api._upVoteThread;

    delete api._createThread;
    delete api._upVoteThread;
  });

  it('should dispatch action correctly when createThread success', async () => {
    // arrange
    api.createThread = () => Promise.resolve(fakeNewThread);
    const dispatch = vi.fn();

    // action
    const result = await asyncAddThread({
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'react',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addThreadActionCreator(fakeNewThread));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(true);
  });

  it('should dispatch action and call alert correctly when createThread failed', async () => {
    // arrange
    api.createThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    const result = await asyncAddThread({
      title: 'Thread Baru',
      body: 'Isi thread baru',
      category: 'react',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(false);
  });

  it('should dispatch optimistic upVote and rollback when api.upVoteThread failed', async () => {
    // arrange
    api.upVoteThread = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();
    const getState = () => ({
      authUser: { id: 'users-1', name: 'John Doe' },
      threads: [fakeNewThread],
    });

    // action
    await asyncToogleUpVoteThread('thread-1')(dispatch, getState);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      upVoteThreadActionCreator({ threadId: 'thread-1', userId: 'users-1' }),
    );
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(
      neutralizeVoteThreadActionCreator({ threadId: 'thread-1', userId: 'users-1' }),
    );
  });
});

