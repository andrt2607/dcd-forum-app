import React from 'react';
import PropTypes from 'prop-types';
import { FiHash } from 'react-icons/fi';
import { CategoryCardContainer, CategoryPillButton } from './styled';

function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  if (categories.length === 0) {
    return null;
  }

  return (
    <CategoryCardContainer className="category-card">
      <div className="category-card__header">
        <h2 className="category-card__title">Kategori Populer</h2>
        <p className="category-card__subtitle">Filter diskusi berdasarkan topik</p>
      </div>
      <div className="category-pills">
        {categories.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <CategoryPillButton
              key={category}
              type="button"
              $active={isActive}
              onClick={() => onSelectCategory(category)}
              className={`category-pill ${isActive ? 'category-pill--active' : ''}`}
            >
              <FiHash className="category-pill__icon" />
              <span>{category}</span>
            </CategoryPillButton>
          );
        })}
      </div>
    </CategoryCardContainer>
  );
}

CategoryList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryList;
