import React from 'react';
import { useSelector } from 'react-redux';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  const loadingBar = useSelector((state) => state.loadingBar);
  const isLoading = Boolean(loadingBar && loadingBar.default > 0);

  return (
    <div className="loading-container">
      <LoadingBar className="redux-loading-bar" />
      {isLoading && (
        <div className="loading-indicator-track" role="status" aria-label="Memuat data">
          <div className="loading-indicator-bar" />
        </div>
      )}
    </div>
  );
}

export default Loading;
