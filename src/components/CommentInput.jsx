import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import useInput from '../hooks/useInput';

function CommentInput({ addComment, authUser }) {
  const [content, onContentChange, setContent] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!content.trim()) {
      alert('Komentar tidak boleh kosong.');
      return;
    }
    addComment(content);
    setContent('');
  }

  if (!authUser) {
    return (
      <div className="comment-login-prompt">
        <p>
          Silakan
          {' '}
          <Link to="/login" className="text-link">
            masuk ke akun Anda
          </Link>
          {' '}
          untuk berpartisipasi memberikan komentar pada diskusi ini.
        </p>
      </div>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <h3 className="comment-form__title">Beri Komentar</h3>
      <label htmlFor="comment-content" className="sr-only">
        Tulis komentar
        <textarea
          id="comment-content"
          rows="4"
          className="form-textarea"
          placeholder="Bagikan tanggapan atau solusi Anda..."
          value={content}
          onChange={onContentChange}
          required
        />
      </label>
      <div className="comment-form__actions">
        <button type="submit" className="btn btn--primary">
          <FiSend />
          <span>Kirim Komentar</span>
        </button>
      </div>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

CommentInput.defaultProps = {
  authUser: null,
};

export default CommentInput;
