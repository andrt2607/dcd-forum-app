import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async ({ name, email, password }) => {
    const success = await dispatch(asyncRegisterUser({ name, email, password }));
    if (success) {
      navigate('/login');
    }
  };

  return (
    <section className="auth-container">
      <div className="auth-card">
        <div className="auth-card__header">
          <div className="navbar__logo-mark navbar__logo-mark--lg">NT</div>
          <h1 className="auth-card__title">Buat Akun Baru</h1>
          <p className="auth-card__subtitle">
            Bergabunglah bersama ribuan developer Indonesia di komunitas NusaTalk.
          </p>
        </div>

        <RegisterInput register={onRegister} />

        <p className="auth-card__footer">
          Sudah punya akun?
          {' '}
          <Link to="/login" className="text-link">
            Masuk sekarang
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;
