import React from 'react';
import PropTypes from 'prop-types';
import CommentItem, { commentItemShape } from './CommentItem';

function CommentsList({
  comments,
  authUser,
  onUpVoteComment,
  onDownVoteComment,
}) {
  return (
    <section className="comments-section">
      <h2 className="comments-section__title">
        Komentar (
        {comments.length}
        )
      </h2>

      {comments.length === 0 ? (
        <div className="empty-state empty-state--sm">
          <p className="empty-state__subtitle">
            Belum ada komentar pada diskusi ini.
          </p>
        </div>
      ) : (
        <div className="comments-list">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              {...comment}
              authUser={authUser}
              onUpVote={onUpVoteComment}
              onDownVote={onDownVoteComment}
            />
          ))}
        </div>
      )}
    </section>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUser: PropTypes.string,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
};

CommentsList.defaultProps = {
  authUser: null,
};

export default CommentsList;
