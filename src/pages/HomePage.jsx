import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlusCircle, FiMessageSquare } from 'react-icons/fi';
import CategoryList from '../components/CategoryList';
import ThreadsList from '../components/ThreadsList';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToogleUpVoteThread,
  asyncToogleDownVoteThread,
} from '../states/threads/action';
import { setCategoryActionCreator } from '../states/category/action';

function HomePage() {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);
  const selectedCategory = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id) => {
    dispatch(asyncToogleUpVoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncToogleDownVoteThread(id));
  };

  const onSelectCategory = (category) => {
    dispatch(setCategoryActionCreator(category));
  };

  const categories = Array.from(
    new Set(threads.map((thread) => thread.category).filter(Boolean)),
  );

  const filteredThreads = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId) || {
      id: thread.ownerId,
      name: 'Pengguna',
      avatar: 'https://ui-avatars.com/api/?name=Pengguna&background=random',
    },
    authUser: authUser ? authUser.id : null,
  }));

  return (
    <div className="home-layout">
      <section className="hero-banner">
        <div className="hero-banner__content">
          <span className="hero-banner__badge">
            <FiMessageSquare />
            <span>Ruang Diskusi Terbuka</span>
          </span>
          <h1 className="hero-banner__title">
            Bertanya, Berbagi Ilmu, dan Tumbuh Bersama Developer Indonesia
          </h1>
          <p className="hero-banner__desc">
            Temukan beragam topik pemrograman, bagikan pengalaman belajar, dan
            bantu sesama anggota komunitas memecahkan masalah teknis.
          </p>
        </div>
        <div className="hero-banner__cta">
          {authUser ? (
            <Link to="/new" className="btn btn--primary btn--lg">
              <FiPlusCircle />
              <span>Mulai Diskusi Baru</span>
            </Link>
          ) : (
            <Link to="/login" className="btn btn--primary btn--lg">
              <span>Masuk untuk Membuat Diskusi</span>
            </Link>
          )}
        </div>
      </section>

      <div className="home-grid">
        <div className="home-sidebar">
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
          />
        </div>

        <div className="home-feed">
          <div className="feed-header">
            <h2 className="feed-header__title">
              {selectedCategory ? `Diskusi Kategori #${selectedCategory}` : 'Diskusi Terbaru'}
            </h2>
            {selectedCategory && (
              <button
                type="button"
                onClick={() => onSelectCategory(selectedCategory)}
                className="btn btn--ghost btn--sm"
              >
                Tampilkan Semua
              </button>
            )}
          </div>

          <ThreadsList
            threads={threadList}
            onUpVote={onUpVote}
            onDownVote={onDownVote}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
