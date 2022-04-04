import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";

const Form = () => {
  let [categoryCounter, setCategoryCounter] = useLocalStorage("categoryCounter",0);
  let [filteredCategory, setFilteredCategory] = useState();
  let [productCounter, setProductCounter] = useLocalStorage("productCounter",0);

  const { register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [completedForms, setCompletedForms] = useLocalStorage(
    "completedForms",
    ""
  );

  const onSubmit = (data) => {
    setCompletedForms((oldArray) => [...oldArray, data]);
    setProductCounter(parseInt(productCounter + 1));
    setCategoryCounter(() => {
      const calculate = categoryCounter + 1;
      return calculate;
    });
    console.log(data);
  };
  const removeProduct = (index) => {
    setCompletedForms([
      ...completedForms.slice(0, index),
      ...completedForms.slice(index + 1),
    ]);
    setProductCounter(productCounter - 1);
  };
  const resetState = () => {
    localStorage.clear();
  };

  function getFilteredList() {
    if (!filteredCategory) {
      return completedForms;
    }
    return completedForms.filter((form) => form.type === filteredCategory);
  }

  var filteredList = useMemo(getFilteredList, [
    filteredCategory,
    completedForms,
  ]);

  function handleCategoryChange(event) {
    setFilteredCategory(event.target.value);
  }
  const sortProductByCategory = () => {
    setCompletedForms(
      completedForms.slice().sort((a, b) => (a.type > b.type ? 1 : -1))
    );
  };
  const sortProductByName = () => {
    setCompletedForms(
      completedForms.slice().sort((a, b) => (a.name < b.name ? 1 : -1))
    );
  };
  const sortProductByDescription = () => {
    setCompletedForms(
      completedForms.slice().sort((a, b) => (a.description > b.description ? 1 : -1))
    );
  };
  const sortProductByPrice = () => {
    setCompletedForms(
      completedForms.slice().sort((a, b) => (a.price > b.price ? 1 : -1))
    );
  };
  return (
    <div className="flex">
      <form className="formCard" onSubmit={handleSubmit(onSubmit)}>
        <h1>New product form</h1>
        <label>
          Product name
          <input
            {...register("productname", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          <p className="error">
            {errors.productname?.type === "required" && "product is required"}
            {errors.productname?.type === "minLength" &&
              "min product length is 3"}
            {errors.productname?.type === "maxLength" &&
              "max product length is 20"}
          </p>
        </label>
        <label>
          Description:
          <input
            onChange={(e) => setCompletedForms(e.target.value)}
            type="text"
            {...register("description", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          <p className="error">
            {errors.description?.type === "required" &&
              "description is required"}
            {errors.productname?.type === "minLength" &&
              "min description length is 3"}
            {errors.productname?.type === "maxLength" &&
              "max description length is 20"}
          </p>
        </label>
        <label>
          Price:
          <input
            type="number"
            {...register("price", { required: true, min: 1, max: 20000 })}
          />
          <p className="error">
            {" "}
            {errors.price?.type === "required" && "price is required"}
          </p>
        </label>
        <label>
          Category:
          <select {...register("type")}>
            <option value="podzespoły">podzespoły</option>
            <option value="urządzenia peryferyjne">
              urządzenia peryferyjne
            </option>
            <option value="Oprogramowanie">Oprogramowanie</option>
            <option value="Inne">Inne</option>
          </select>
          <p className="error">
            {errors.type?.type === "required" && "type is required"}
          </p>
        </label>

        <input type="submit" value="Wyślij" />
      </form>
      <div className="grid">
        <ul>
          {completedForms && completedForms.map((form, index) => (
            <li {...form} key={index}>
              <p> Product name:{form.productname}</p>
              <p> description: {form.description}</p>
              <p> type: {form.type}</p>
              <p> price: {form.price}</p>
              <button onClick={() => removeProduct(index)}>x</button>
            </li>
          ))}
        </ul>
        <div className="flex">
            <h2>
            total price:
            {completedForms && completedForms.reduce(
                (total, form) => total + parseInt(form.price),  0
            )}
            </h2>
        <h2>Liczba produktów: {productCounter}</h2>
        <h2>Liczba produktów kategori: {categoryCounter}</h2>
        </div>
    
        <div>
          <button onClick={() => sortProductByName()}>Sort by Name</button>
          <button onClick={() => sortProductByDescription()}>
            Sort by Description
          </button>
          <button onClick={() => sortProductByCategory()}>
            Sort by Category
          </button>
          <button onClick={() => sortProductByPrice()}>
            Sort by price
          </button>
          <button onClick={() => resetState()}>reset state</button>
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
      </div>
    </div>
  );
};

export default Form;
