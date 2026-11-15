import React from 'react';
import PropTypes from 'prop-types';
import { LeaderboardRowContainer } from './styled';

function LeaderboardItem({ user, score, rank }) {
  const isTopThree = rank <= 3;

  return (
    <LeaderboardRowContainer
      className={`leaderboard-row ${isTopThree ? `leaderboard-row--top-${rank}` : ''}`}
    >
      <div className="leaderboard-row__user">
        <span className={`leaderboard-row__rank ${isTopThree ? 'leaderboard-row__rank--highlight' : ''}`}>
          #
          {rank}
        </span>
        <img
          src={user.avatar}
          alt={user.name}
          className="leaderboard-row__avatar"
        />
        <div className="leaderboard-row__info">
          <span className="leaderboard-row__name">{user.name}</span>
          {user.email && (
            <span className="leaderboard-row__email">{user.email}</span>
          )}
        </div>
      </div>

      <div className="leaderboard-row__score">
        <span className="leaderboard-row__score-value">{score}</span>
        <span className="leaderboard-row__score-label">Poin</span>
      </div>
    </LeaderboardRowContainer>
  );
}

const leaderboardUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

LeaderboardItem.propTypes = {
  user: PropTypes.shape(leaderboardUserShape).isRequired,
  score: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
};

export { leaderboardUserShape };
export default LeaderboardItem;
