import React, { useState, useMemo } from "react";

const Filter = (props) => {

  function handleCategoryChange(event) {
    props.setFilteredCategory(event.target.value);
  }
  

  return (
    <select
      name="category-list"
      id="category-list"
      onChange={handleCategoryChange}
    >
      <option value="">Filter by Category</option>
      <option value="Podzespoły">Podzespoły</option>
      <option value="Urządzenia peryferyjne">Urządzenia peryferyjne</option>
      <option value="Oprogramowanie">oprogramowanie</option>
      <option value="Inne">Inne</option>
    </select>
  );
};

export default Filter;
