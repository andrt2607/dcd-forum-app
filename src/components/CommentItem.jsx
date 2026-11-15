import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { FiClock } from 'react-icons/fi';
import { postedAt } from '../utils';
import VoteButton from './VoteButton';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
}) {
  return (
    <article className="comment-card">
      <header className="comment-card__header">
        <div className="comment-card__author">
          {owner.avatar && (
            <img
              src={owner.avatar}
              alt={owner.name}
              className="comment-card__avatar"
            />
          )}
          <span className="comment-card__author-name">{owner.name}</span>
        </div>
        <span className="comment-card__time">
          <FiClock className="inline-icon" />
          {postedAt(createdAt)}
        </span>
      </header>

      <div className="comment-card__content">
        {parse(content)}
      </div>

      <footer className="comment-card__footer">
        <VoteButton
          id={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </footer>
    </article>
  );
}

const commentOwnerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(commentOwnerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(commentOwnerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  authUser: null,
};

export { commentItemShape };
export default CommentItem;
