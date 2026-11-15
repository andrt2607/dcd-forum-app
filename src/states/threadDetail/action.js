import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_VOTE_THREAD_DETAIL: 'NEUTRALIZE_VOTE_THREAD_DETAIL',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_VOTE_COMMENT: 'NEUTRALIZE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function neutralizeVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function neutralizeVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
      return true;
    } catch (error) {
      alert(error.message);
      return false;
    } finally {
      dispatch(hideLoading());
    }
  };
}

function asyncToogleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan masuk (login) terlebih dahulu untuk memberikan suara.');
      return;
    }

    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);
    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.neutralizeThreadVote(threadDetail.id);
      } catch (error) {
        alert(error.message);
        dispatch(upVoteThreadDetailActionCreator(authUser.id));
      }
    } else {
      dispatch(upVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.upVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        if (isDownVoted) {
          dispatch(downVoteThreadDetailActionCreator(authUser.id));
        } else {
          dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
        }
      }
    }
  };
}

function asyncToogleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan masuk (login) terlebih dahulu untuk memberikan suara.');
      return;
    }

    const isDownVoted = threadDetail.downVotesBy.includes(authUser.id);
    const isUpVoted = threadDetail.upVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.neutralizeThreadVote(threadDetail.id);
      } catch (error) {
        alert(error.message);
        dispatch(downVoteThreadDetailActionCreator(authUser.id));
      }
    } else {
      dispatch(downVoteThreadDetailActionCreator(authUser.id));
      try {
        await api.downVoteThread(threadDetail.id);
      } catch (error) {
        alert(error.message);
        if (isUpVoted) {
          dispatch(upVoteThreadDetailActionCreator(authUser.id));
        } else {
          dispatch(neutralizeVoteThreadDetailActionCreator(authUser.id));
        }
      }
    }
  };
}

function asyncToogleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan masuk (login) terlebih dahulu untuk memberikan suara.');
      return;
    }

    const targetComment = threadDetail.comments.find((comment) => comment.id === commentId);
    if (!targetComment) return;

    const isUpVoted = targetComment.upVotesBy.includes(authUser.id);
    const isDownVoted = targetComment.downVotesBy.includes(authUser.id);

    if (isUpVoted) {
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    } else {
      dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.upVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        if (isDownVoted) {
          dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
        } else {
          dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      }
    }
  };
}

function asyncToogleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    if (!authUser) {
      alert('Silakan masuk (login) terlebih dahulu untuk memberikan suara.');
      return;
    }

    const targetComment = threadDetail.comments.find((comment) => comment.id === commentId);
    if (!targetComment) return;

    const isDownVoted = targetComment.downVotesBy.includes(authUser.id);
    const isUpVoted = targetComment.upVotesBy.includes(authUser.id);

    if (isDownVoted) {
      dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.neutralizeCommentVote({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    } else {
      dispatch(downVoteCommentActionCreator({ commentId, userId: authUser.id }));
      try {
        await api.downVoteComment({ threadId: threadDetail.id, commentId });
      } catch (error) {
        alert(error.message);
        if (isUpVoted) {
          dispatch(upVoteCommentActionCreator({ commentId, userId: authUser.id }));
        } else {
          dispatch(neutralizeVoteCommentActionCreator({ commentId, userId: authUser.id }));
        }
      }
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addCommentActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralizeVoteThreadDetailActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToogleUpVoteThreadDetail,
  asyncToogleDownVoteThreadDetail,
  asyncToogleUpVoteComment,
  asyncToogleDownVoteComment,
};
