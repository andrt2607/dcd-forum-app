import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FiArrowLeft } from 'react-icons/fi';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommentsList';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToogleUpVoteThreadDetail,
  asyncToogleDownVoteThreadDetail,
  asyncToogleUpVoteComment,
  asyncToogleDownVoteComment,
} from '../states/threadDetail/action';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteThread = () => {
    dispatch(asyncToogleUpVoteThreadDetail());
  };

  const onDownVoteThread = () => {
    dispatch(asyncToogleDownVoteThreadDetail());
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToogleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToogleDownVoteComment(commentId));
  };

  if (!threadDetail) {
    return (
      <div className="detail-container">
        <div className="empty-state">
          <p className="empty-state__title">Memuat detail diskusi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-container">
      <div className="detail-back">
        <Link to="/" className="back-link">
          <FiArrowLeft />
          <span>Kembali ke Daftar Diskusi</span>
        </Link>
      </div>

      <ThreadDetail
        {...threadDetail}
        authUser={authUser ? authUser.id : null}
        onUpVote={onUpVoteThread}
        onDownVote={onDownVoteThread}
      />

      <CommentInput
        addComment={onAddComment}
        authUser={authUser}
      />

      <CommentsList
        comments={threadDetail.comments}
        authUser={authUser ? authUser.id : null}
        onUpVoteComment={onUpVoteComment}
        onDownVoteComment={onDownVoteComment}
      />
    </div>
  );
}

export default DetailPage;
