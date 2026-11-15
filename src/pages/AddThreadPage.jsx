import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import ThreadInput from '../components/ThreadInput';
import { asyncAddThread } from '../states/threads/action';

function AddThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThread = async ({ title, body, category }) => {
    const success = await dispatch(asyncAddThread({ title, body, category }));
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="page-narrow">
      <div className="detail-back">
        <Link to="/" className="back-link">
          <FiArrowLeft />
          <span>Kembali ke Beranda</span>
        </Link>
      </div>

      <div className="section-header">
        <h1 className="section-header__title">Buat Diskusi Baru</h1>
        <p className="section-header__subtitle">
          Mulai percakapan baru atau ajukan pertanyaan kepada komunitas.
        </p>
      </div>

      <ThreadInput addThread={onAddThread} />
    </div>
  );
}

export default AddThreadPage;
