import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { FiMessageCircle, FiClock } from 'react-icons/fi';
import { postedAt } from '../utils';
import VoteButton from './VoteButton';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  totalComments,
  user,
  authUser,
  onUpVote,
  onDownVote,
}) {
  return (
    <article className="thread-card">
      <div className="thread-card__top">
        {category && (
          <span className="thread-card__category">
            #
            {category}
          </span>
        )}
        <div className="thread-card__author">
          {user && user.avatar && (
            <img
              src={user.avatar}
              alt={user.name}
              className="thread-card__avatar"
            />
          )}
          <span className="thread-card__author-name">
            {user ? user.name : 'Anonim'}
          </span>
          <span className="thread-card__dot">•</span>
          <span className="thread-card__time">
            <FiClock className="inline-icon" />
            {postedAt(createdAt)}
          </span>
        </div>
      </div>

      <h3 className="thread-card__title">
        <Link to={`/threads/${id}`} className="thread-card__title-link">
          {title}
        </Link>
      </h3>

      <div className="thread-card__body">
        {parse(body)}
      </div>

      <footer className="thread-card__footer">
        <VoteButton
          id={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />

        <Link to={`/threads/${id}`} className="thread-card__comments">
          <FiMessageCircle className="comment-icon" />
          <span>
            {totalComments}
            {' '}
            Komentar
          </span>
        </Link>
      </footer>
    </article>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string,
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadItem.defaultProps = {
  category: 'umum',
  authUser: null,
};

export { threadItemShape };
export default ThreadItem;
