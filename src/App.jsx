import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddThreadPage from './pages/AddThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

function App() {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onSignOut = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (isPreload) {
    return (
      <div className="app-shell">
        <Loading />
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Loading />
      <Navigation authUser={authUser} signOut={onSignOut} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/threads/:id" element={<DetailPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route
            path="/new"
            element={authUser ? <AddThreadPage /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" replace /> : <RegisterPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>NusaTalk — Aplikasi Forum Diskusi React &amp; Redux</p>
      </footer>
    </div>
  );
}

export default App;
