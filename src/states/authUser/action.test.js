/**
 * skenario pengujian
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action and store access token correctly when login success
 *  - should dispatch action and call alert correctly when login failed
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action and clear access token correctly
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
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

const fakeToken = 'fake-jwt-token-123';
const fakeAuthUser = {
  id: 'users-1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};
const fakeErrorResponse = new Error('email or password is wrong');

describe('authUser thunk functions', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  it('should dispatch action and store access token correctly when login success', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeToken);
    api.getOwnProfile = () => Promise.resolve(fakeAuthUser);
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    // action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'password123',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeAuthUser));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(true);
  });

  it('should dispatch action and call alert correctly when login failed', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    const result = await asyncSetAuthUser({
      email: 'john@example.com',
      password: 'wrongpassword',
    })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(result).toBe(false);
  });

  it('should dispatch action and clear access token correctly on asyncUnsetAuthUser', () => {
    // arrange
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    // action
    asyncUnsetAuthUser()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});

