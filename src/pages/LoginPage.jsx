import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    const success = await dispatch(asyncSetAuthUser({ email, password }));
    if (success) {
      navigate('/');
    }
  };

  return (
    <section className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="navbar__logo-mark navbar__logo-mark--lg">NT</div>
          <h1 className="auth-card__title">Selamat Datang Kembali</h1>
          <p className="auth-card__subtitle">
            Masuk ke akun NusaTalk Anda untuk mulai berdiskusi dan berbagi solusi.
          </p>
        </div>

        <LoginInput login={onLogin} />

        <p className="auth-card__footer">
          Belum memiliki akun?
          {' '}
          <Link to="/register" className="text-link">
            Daftar di sini
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
