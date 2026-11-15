import React from 'react';
import PropTypes from 'prop-types';
import { FiUserPlus } from 'react-icons/fi';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    register({ name, email, password });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="register-name" className="form-label">
          Nama Lengkap
          <input
            id="register-name"
            type="text"
            className="form-input"
            placeholder="Masukkan nama lengkap Anda"
            value={name}
            onChange={onNameChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="register-email" className="form-label">
          Alamat Email
          <input
            id="register-email"
            type="email"
            className="form-input"
            placeholder="nama@email.com"
            value={email}
            onChange={onEmailChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="register-password" className="form-label">
          Kata Sandi (min. 6 karakter)
          <input
            id="register-password"
            type="password"
            className="form-input"
            placeholder="Minimal 6 karakter"
            value={password}
            onChange={onPasswordChange}
            minLength={6}
            required
          />
        </label>
      </div>

      <button type="submit" className="btn btn--primary btn--full">
        <FiUserPlus />
        <span>Daftar Akun</span>
      </button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
