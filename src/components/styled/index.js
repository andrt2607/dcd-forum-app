import styled from 'styled-components';

const CategoryCardContainer = styled.aside`
  background: var(--bg-surface, #ffffff);
  border: 1px solid var(--border-subtle, #e2e8f0);
  border-radius: var(--radius-lg, 16px);
  padding: 1.25rem;
  box-shadow: var(--shadow-xs, 0 1px 2px rgba(15, 23, 42, 0.04));
`;

const CategoryPillButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid ${({ $active }) => ($active ? '#4f46e5' : '#e2e8f0')};
  background-color: ${({ $active }) => ($active ? '#4f46e5' : '#f8fafc')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#475569')};

  &:hover {
    border-color: #4f46e5;
    background-color: ${({ $active }) => ($active ? '#4338ca' : '#eef2ff')};
    color: ${({ $active }) => ($active ? '#ffffff' : '#4f46e5')};
  }
`;

const VoteGroupWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledVoteButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
  border: 1px solid ${({ $upActive, $downActive }) => {
    if ($upActive) return '#16a34a';
    if ($downActive) return '#dc2626';
    return '#e2e8f0';
  }};
  background-color: ${({ $upActive, $downActive }) => {
    if ($upActive) return '#dcfce7';
    if ($downActive) return '#fee2e2';
    return '#f8fafc';
  }};
  color: ${({ $upActive, $downActive }) => {
    if ($upActive) return '#15803d';
    if ($downActive) return '#b91c1c';
    return '#475569';
  }};
`;

const LeaderboardRowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border-subtle, #e2e8f0);
  transition: background-color 0.15s ease;

  &:last-child {
    border-bottom: none;
  }
`;

export {
  CategoryCardContainer,
  CategoryPillButton,
  VoteGroupWrapper,
  StyledVoteButton,
  LeaderboardRowContainer,
};

