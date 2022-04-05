import React, { useState, useMemo } from "react";

const Filter = (props) => {
    let [filteredCategory, setFilteredCategory] = useState();

    function handleCategoryChange(event) {
      setFilteredCategory(event.target.value);
    }
    function getFilteredList() {
      if (!filteredCategory) {
        return props.completedForms;
      }
      return props.completedForms.filter((form) => form.type === filteredCategory);
    }
  
    var filteredList = useMemo(getFilteredList, [
      props.filteredCategory,
      props.completedForms,
    ]);
  
    
    return (
      <div>
          <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            <option value="">Filter by Category</option>
            <option value="Podzespoły">Podzespoły</option>
            <option value="Urządzenia peryferyjne">
              Urządzenia peryferyjne
            </option>
            <option value="Oprogramowanie">oprogramowanie</option>
            <option value="Inne">Inne</option>
          </select>
      </div>
    );
    
}


export default Filter