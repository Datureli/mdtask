import React, { useState, useMemo } from "react";

const Filter = () => {
    let [filteredCategory, setFilteredCategory] = useState();

    function handleCategoryChange(event) {
      setFilteredCategory(event.target.value);
    }
    function getFilteredList() {
      if (!filteredCategory) {
        return completedForms;
      }
      return completedForms.filter((item) => item.category === filteredCategory);
    }
    // Avoid duplicate function calls with useMemo
    var filteredList = useMemo(getFilteredList, [filteredCategory, completedForms]);
    
    return (
      <div>
        <select
          name="category-list"
          id="category-list"
          onChange={handleCategoryChange}
        >
          <option value="">Filter by Category</option>
          <option value="podzespoły">Podzespoły</option>
          <option value="urządzenia peryferyjne">Urządzenia peryferyjne</option>
          <option value="oprogramowanie">oprogramowanie</option>
          <option value="Inne">Inne</option>
        </select>
      </div>
    );
    
}


export default Filter