import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';

const stories = {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default stories;

function Template(args) {
  return <ThreadItem {...args} />;
}

const DefaultThread = Template.bind({});
DefaultThread.args = {
  id: 'thread-1',
  title: 'Bagaimana cara menguji aplikasi React dengan Vitest dan Cypress?',
  body: '<p>Halo teman-teman! Saya sedang mempelajari Automation Testing menggunakan Vitest, React Testing Library, dan Cypress untuk aplikasi React Redux.</p>',
  category: 'testing',
  createdAt: new Date().toISOString(),
  upVotesBy: ['users-1', 'users-2'],
  downVotesBy: [],
  totalComments: 5,
  user: {
    id: 'users-1',
    name: 'Dicoding Developer',
    email: 'dev@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dicoding+Developer&background=4f46e5&color=fff',
  },
  authUser: 'users-1',
  onUpVote: () => {},
  onDownVote: () => {},
};

export { DefaultThread };

