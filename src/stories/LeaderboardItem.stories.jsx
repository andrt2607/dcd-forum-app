import React from 'react';
import LeaderboardItem from '../components/LeaderboardItem';

const stories = {
  title: 'Components/LeaderboardItem',
  component: LeaderboardItem,
  tags: ['autodocs'],
};

export default stories;

function Template(args) {
  return <LeaderboardItem {...args} />;
}

const FirstRank = Template.bind({});
FirstRank.args = {
  user: {
    id: 'users-1',
    name: 'Dimas Saputra',
    email: 'dimas@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dimas+Saputra&background=4f46e5&color=fff',
  },
  score: 150,
  rank: 1,
};

const RegularRank = Template.bind({});
RegularRank.args = {
  user: {
    id: 'users-4',
    name: 'Rizky Pratama',
    email: 'rizky@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Rizky+Pratama&background=0ea5e9&color=fff',
  },
  score: 45,
  rank: 4,
};

export { FirstRank, RegularRank };

