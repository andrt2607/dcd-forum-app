import React from 'react';
import PropTypes from 'prop-types';
import { FiSend } from 'react-icons/fi';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim() || !body.trim()) {
      alert('Judul dan isi diskusi wajib diisi.');
      return;
    }
    addThread({ title, body, category });
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="thread-title" className="form-label">
          Judul Diskusi
          <input
            id="thread-title"
            type="text"
            className="form-input"
            placeholder="Apa topik yang ingin Anda diskusikan?"
            value={title}
            onChange={onTitleChange}
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="thread-category" className="form-label">
          Kategori (Opsional)
          <input
            id="thread-category"
            type="text"
            className="form-input"
            placeholder="Contoh: react, redux, javascript, perkenalan"
            value={category}
            onChange={onCategoryChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="thread-body" className="form-label">
          Isi Diskusi
          <textarea
            id="thread-body"
            rows="7"
            className="form-textarea"
            placeholder="Tuliskan pertanyaan, pengalaman, atau gagasan Anda secara lengkap..."
            value={body}
            onChange={onBodyChange}
            required
          />
        </label>
      </div>

      <button type="submit" className="btn btn--primary btn--full">
        <FiSend />
        <span>Terbitkan Diskusi</span>
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
