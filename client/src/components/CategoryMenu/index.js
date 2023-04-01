import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu({ setCurrentCategory }) {
  const [categories, setCategories] = useState([]);
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData && categoryData.categoryList) {
      setCategories(categoryData.categoryList);
      categoryData.categoryList.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        setCategories(categories);
      });
    }
  }, [categoryData, loading]);

  const handleChange = (event) => {
    const categoryId = event.target.value;
    setCurrentCategory(categoryId);
  };

  return (
    <div>
      <label htmlFor="category-select">Choose a Category:</label>
      <select
        id="category-select"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoryMenu;