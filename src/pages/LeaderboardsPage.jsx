import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiAward } from 'react-icons/fi';
import LeaderboardItem from '../components/LeaderboardItem';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="page-narrow">
      <div className="section-header">
        <div className="section-header__badge">
          <FiAward />
          <span>Klasemen Kontributor</span>
        </div>
        <h1 className="section-header__title">Leaderboard Pengguna Aktif</h1>
        <p className="section-header__subtitle">
          Apresiasi bagi anggota komunitas yang paling aktif berdiskusi dan membantu sesama.
        </p>
      </div>

      <section className="leaderboard-card">
        <div className="leaderboard-card__header">
          <span>Pengguna</span>
          <span>Skor</span>
        </div>

        <div className="leaderboard-list">
          {leaderboards.map((item, index) => (
            <LeaderboardItem
              key={item.user.id}
              user={item.user}
              score={item.score}
              rank={index + 1}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default LeaderboardsPage;
