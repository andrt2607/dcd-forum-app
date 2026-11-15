import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  NEUTRALIZE_VOTE_THREAD: 'NEUTRALIZE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category = '' }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToogleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Silakan masuk (login) terlebih dahulu untuk memberikan suara.');
      return;
    }

    const targetThread = threads.find((thread) => thread.id === threadId);
    if (!targetThread) return;

    const isUpVoted = targetThread.upVotesBy.includes(authUser.id);
    const isDownVoted = targetThread.downVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.neutralizeThreadVote(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.upVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        if (isDownVoted) {
          dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
        } else {
          dispatch(neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      }
    }
  };
}

function asyncToogleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    if (!authUser) {
      alert('Silakan masuk (login) terlebih dahulu untuk memberikan suara.');
      return;
    }

    const targetThread = threads.find((thread) => thread.id === threadId);
    if (!targetThread) return;

    const isDownVoted = targetThread.downVotesBy.includes(authUser.id);
    const isUpVoted = targetThread.upVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.neutralizeThreadVote(threadId);
      } catch (error) {
        alert(error.message);
        dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      }
    } else {
      dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
      try {
        await api.downVoteThread(threadId);
      } catch (error) {
        alert(error.message);
        if (isUpVoted) {
          dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
        } else {
          dispatch(neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
        }
      }
    }
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(neutralizeVoteThreadActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeVoteThreadActionCreator,
  asyncAddThread,
  asyncToogleUpVoteThread,
  asyncToogleDownVoteThread,
  asyncNeutralizeVoteThread,
};
