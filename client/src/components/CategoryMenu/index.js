import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_CATEGORIES } from "../../utils/queries";
import { idbPromise } from "../../utils/helpers";

function CategoryMenu() {
  const [categories, setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("");

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      setCategories(categoryData.categories);
      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        setCategories(categories);
      });
    }
  }, [categoryData, loading]);

  const handleChange = (event) => {
    setCurrentCategory(event.target.value);
  };

  return (
    <div className="categoryDropDown">
      <label htmlFor="category-select"></label>
      <select
        id="category-select"
        value={currentCategory}
        onChange={handleChange}
      >
        <option value="">Choose a Category:</option>
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
