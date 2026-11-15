import React from 'react';
import VoteButton from '../components/VoteButton';

const stories = {
  title: 'Components/VoteButton',
  component: VoteButton,
  tags: ['autodocs'],
};

export default stories;

function Template(args) {
  return <VoteButton {...args} />;
}

const Default = Template.bind({});
Default.args = {
  id: 'thread-1',
  upVotesBy: ['users-1', 'users-2'],
  downVotesBy: ['users-3'],
  authUserId: 'users-4',
  onUpVote: () => {},
  onDownVote: () => {},
};

const UpVoted = Template.bind({});
UpVoted.args = {
  id: 'thread-1',
  upVotesBy: ['users-1', 'users-2'],
  downVotesBy: [],
  authUserId: 'users-1',
  onUpVote: () => {},
  onDownVote: () => {},
};

const DownVoted = Template.bind({});
DownVoted.args = {
  id: 'thread-1',
  upVotesBy: [],
  downVotesBy: ['users-1', 'users-3'],
  authUserId: 'users-1',
  onUpVote: () => {},
  onDownVote: () => {},
};

export { Default, UpVoted, DownVoted };

