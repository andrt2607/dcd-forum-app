import React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { FiClock } from 'react-icons/fi';
import { postedAt } from '../utils';
import VoteButton from './VoteButton';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
}) {
  return (
    <section className="thread-detail-card">
      <div className="thread-detail__header">
        {category && (
          <span className="thread-card__category">
            #
            {category}
          </span>
        )}
        <h1 className="thread-detail__title">{title}</h1>

        <div className="thread-detail__meta">
          <img
            src={owner.avatar}
            alt={owner.name}
            className="thread-detail__avatar"
          />
          <div className="thread-detail__author-info">
            <span className="thread-detail__author-name">{owner.name}</span>
            <span className="thread-detail__time">
              <FiClock className="inline-icon" />
              Dibuat
              {' '}
              {postedAt(createdAt)}
            </span>
          </div>
        </div>
      </div>

      <div className="thread-detail__body">
        {parse(body)}
      </div>

      <footer className="thread-detail__footer">
        <VoteButton
          id={id}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          authUserId={authUser}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      </footer>
    </section>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

ThreadDetail.defaultProps = {
  category: 'umum',
  authUser: null,
};

export default ThreadDetail;
