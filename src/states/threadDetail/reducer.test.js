/**
 * skenario pengujian
 *
 * - threadDetailReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the threadDetail when given by RECEIVE_THREAD_DETAIL action
 *  - should return null when given by CLEAR_THREAD_DETAIL action
 *  - should return the threadDetail with the new comment when given by ADD_COMMENT action
 *  - should return the threadDetail with upVoted state when given by UP_VOTE_THREAD_DETAIL action
 *  - should return the threadDetail with downVoted state
 *    when given by DOWN_VOTE_THREAD_DETAIL action
 *  - should return the threadDetail with neutralized vote
 *    when given by NEUTRALIZE_VOTE_THREAD_DETAIL action
 *  - should return the threadDetail with upVoted comment when given by UP_VOTE_COMMENT action
 *  - should return the threadDetail with downVoted comment when given by DOWN_VOTE_COMMENT action
 *  - should return the threadDetail with neutralized comment vote
 *    when given by NEUTRALIZE_VOTE_COMMENT action
 */

import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

describe('threadDetailReducer function', () => {
  const sampleThreadDetail = {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah isi detail thread pertama',
    category: 'General',
    createdAt: '2026-11-12T07:00:00.000Z',
    owner: {
      id: 'users-1',
      name: 'John Doe',
      avatar: 'https://generated-image-url.jpg',
    },
    upVotesBy: [],
    downVotesBy: [],
    comments: [
      {
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2026-11-12T07:05:00.000Z',
        owner: {
          id: 'users-2',
          name: 'Jane Doe',
          avatar: 'https://generated-image-url.jpg',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
  };

  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threadDetail when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: sampleThreadDetail,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(sampleThreadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = sampleThreadDetail;
    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the threadDetail with the new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = sampleThreadDetail;
    const newComment = {
      id: 'comment-2',
      content: 'Komentar baru ditambahkan',
      createdAt: '2026-11-12T07:10:00.000Z',
      owner: {
        id: 'users-3',
        name: 'Budi',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
    };
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: newComment,
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [newComment, ...initialState.comments],
    });
  });

  it('should return the threadDetail with upVoted state when given by UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      ...sampleThreadDetail,
      downVotesBy: ['users-2'],
    };
    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['users-2'],
      downVotesBy: [],
    });
  });

  it('should return the threadDetail with downVoted state when given by DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      ...sampleThreadDetail,
      upVotesBy: ['users-2'],
    };
    const action = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: ['users-2'],
    });
  });

  it('should return the threadDetail with neutralized vote when given by NEUTRALIZE_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      ...sampleThreadDetail,
      upVotesBy: ['users-2'],
    };
    const action = {
      type: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'users-2',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });

  it('should return the threadDetail with upVoted comment when given by UP_VOTE_COMMENT action', () => {
    // arrange
    const initialState = sampleThreadDetail;
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual(['users-3']);
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });

  it('should return the threadDetail with downVoted comment when given by DOWN_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      ...sampleThreadDetail,
      comments: [
        {
          ...sampleThreadDetail.comments[0],
          upVotesBy: ['users-3'],
        },
      ],
    };
    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual([]);
    expect(nextState.comments[0].downVotesBy).toEqual(['users-3']);
  });

  it('should return the threadDetail with neutralized comment vote when given by NEUTRALIZE_VOTE_COMMENT action', () => {
    // arrange
    const initialState = {
      ...sampleThreadDetail,
      comments: [
        {
          ...sampleThreadDetail.comments[0],
          downVotesBy: ['users-3'],
        },
      ],
    };
    const action = {
      type: 'NEUTRALIZE_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState.comments[0].upVotesBy).toEqual([]);
    expect(nextState.comments[0].downVotesBy).toEqual([]);
  });
});
