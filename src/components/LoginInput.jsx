import React from 'react';
import PropTypes from 'prop-types';
import { FiLogIn } from 'react-icons/fi';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    login({ email, password });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="login-email" className="form-label">
          Alamat Email
          <input
            id="login-email"
            type="email"
            className="form-input"
            placeholder="nama@email.com"
            value={email}
            onChange={onEmailChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="login-password" className="form-label">
          Kata Sandi
          <input
            id="login-password"
            type="password"
            className="form-input"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={onPasswordChange}
          />
        </label>
      </div>

      <button type="submit" className="btn btn--primary btn--full">
        <FiLogIn />
        <span>Masuk Sekarang</span>
      </button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
