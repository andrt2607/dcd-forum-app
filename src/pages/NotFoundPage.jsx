import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="empty-state">
      <h1 className="empty-state__title">404 — Halaman Tidak Ditemukan</h1>
      <p className="empty-state__subtitle">
        Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
      </p>
      <Link to="/" className="btn btn--primary">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFoundPage;
