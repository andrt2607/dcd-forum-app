/**
 * skenario pengujian
 *
 * - categoryReducer function
 *  - should return the initial state when given by unknown action
 *  - should return the selected category when given by SET_CATEGORY action with new category
 *  - should return empty string when given by SET_CATEGORY action with same category (toggle off)
 */

import { describe, it, expect } from 'vitest';
import categoryReducer from './reducer';

describe('categoryReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = '';
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = categoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the selected category when given by SET_CATEGORY action with new category', () => {
    // arrange
    const initialState = '';
    const action = {
      type: 'SET_CATEGORY',
      payload: {
        category: 'react',
      },
    };

    // action
    const nextState = categoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual('react');
  });

  it('should return empty string when given by SET_CATEGORY action with same category (toggle off)', () => {
    // arrange
    const initialState = 'react';
    const action = {
      type: 'SET_CATEGORY',
      payload: {
        category: 'react',
      },
    };

    // action
    const nextState = categoryReducer(initialState, action);

    // assert
    expect(nextState).toEqual('');
  });
});

