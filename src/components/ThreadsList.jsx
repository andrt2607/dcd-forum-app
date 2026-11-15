import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './ThreadItem';

function ThreadsList({ threads, onUpVote, onDownVote }) {
  if (threads.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Belum ada diskusi pada kategori ini.</p>
        <p className="empty-state__subtitle">
          Jadilah yang pertama memulai diskusi baru!
        </p>
      </div>
    );
  }

  return (
    <div className="threads-list">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          {...thread}
          onUpVote={onUpVote}
          onDownVote={onDownVote}
        />
      ))}
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

export default ThreadsList;
