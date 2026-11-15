import React from 'react';
import PropTypes from 'prop-types';
import {
  FiThumbsUp,
  FiThumbsDown,
} from 'react-icons/fi';
import { VoteGroupWrapper, StyledVoteButton } from './styled';

function VoteButton({
  id,
  upVotesBy,
  downVotesBy,
  authUserId,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = Boolean(authUserId && upVotesBy.includes(authUserId));
  const isDownVoted = Boolean(authUserId && downVotesBy.includes(authUserId));

  return (
    <VoteGroupWrapper className="vote-group">
      <StyledVoteButton
        type="button"
        $upActive={isUpVoted}
        onClick={() => onUpVote(id)}
        className={`vote-btn ${isUpVoted ? 'vote-btn--up-active' : ''}`}
        aria-label="Up vote"
        title={isUpVoted ? 'Batalkan suka' : 'Sukai'}
      >
        <FiThumbsUp className="vote-icon" />
        <span>{upVotesBy.length}</span>
      </StyledVoteButton>
      <StyledVoteButton
        type="button"
        $downActive={isDownVoted}
        onClick={() => onDownVote(id)}
        className={`vote-btn ${isDownVoted ? 'vote-btn--down-active' : ''}`}
        aria-label="Down vote"
        title={isDownVoted ? 'Batalkan tidak suka' : 'Tidak sukai'}
      >
        <FiThumbsDown className="vote-icon" />
        <span>{downVotesBy.length}</span>
      </StyledVoteButton>
    </VoteGroupWrapper>
  );
}

VoteButton.propTypes = {
  id: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUserId: PropTypes.string,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

VoteButton.defaultProps = {
  authUserId: null,
};

export default VoteButton;
