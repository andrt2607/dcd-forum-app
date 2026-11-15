import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import {
  FiMessageSquare,
  FiAward,
  FiPlusCircle,
  FiLogOut,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi';

function Navigation({ authUser, signOut }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__brand">
          <div className="navbar__logo-mark">NT</div>
          <div>
            <span className="navbar__brand-title">NusaTalk</span>
            <span className="navbar__brand-subtitle">Forum Diskusi Komunitas</span>
          </div>
        </Link>

        <nav className="navbar__links" aria-label="Navigasi Utama">
          <Link
            to="/"
            className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
          >
            <FiMessageSquare />
            <span>Diskusi</span>
          </Link>
          <Link
            to="/leaderboards"
            className={`navbar__link ${isActive('/leaderboards') ? 'navbar__link--active' : ''}`}
          >
            <FiAward />
            <span>Leaderboard</span>
          </Link>
          {authUser && (
            <Link
              to="/new"
              className={`navbar__link ${isActive('/new') ? 'navbar__link--active' : ''}`}
            >
              <FiPlusCircle />
              <span>Buat Thread</span>
            </Link>
          )}
        </nav>

        <div className="navbar__auth">
          {authUser ? (
            <div className="navbar__user">
              <img
                src={authUser.avatar}
                alt={authUser.name}
                className="navbar__avatar"
              />
              <span className="navbar__username">{authUser.name}</span>
              <button
                type="button"
                onClick={signOut}
                className="btn btn--ghost btn--sm"
                title="Keluar dari akun"
              >
                <FiLogOut />
                <span>Keluar</span>
              </button>
            </div>
          ) : (
            <div className="navbar__guest">
              <Link to="/login" className="btn btn--ghost btn--sm">
                <FiLogIn />
                <span>Masuk</span>
              </Link>
              <Link to="/register" className="btn btn--primary btn--sm">
                <FiUserPlus />
                <span>Daftar</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape),
  signOut: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
  authUser: null,
};

export default Navigation;
