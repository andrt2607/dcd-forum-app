import React from 'react';
import CategoryList from '../components/CategoryList';

const stories = {
  title: 'Components/CategoryList',
  component: CategoryList,
  tags: ['autodocs'],
};

export default stories;

function Template(args) {
  return <CategoryList {...args} />;
}

const WithCategories = Template.bind({});
WithCategories.args = {
  categories: ['react', 'redux', 'javascript', 'testing', 'ci-cd'],
  selectedCategory: '',
  onSelectCategory: () => {},
};

const WithSelectedCategory = Template.bind({});
WithSelectedCategory.args = {
  categories: ['react', 'redux', 'javascript', 'testing', 'ci-cd'],
  selectedCategory: 'react',
  onSelectCategory: () => {},
};

export { WithCategories, WithSelectedCategory };

