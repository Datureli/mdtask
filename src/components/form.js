import React, {useState,useMemo} from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import Sort from "./sortby";

const Form = () => {
  let [categoryCounter, setCategoryCounter] = useLocalStorage(
    "categoryCounter",
    0
  );
  let [productCounter, setProductCounter] = useLocalStorage(
    "productCounter",
    0
  );
  let [filteredCategory, setFilteredCategory] = useState();

  function handleCategoryChange(event) {
    setFilteredCategory(event.target.value);
  }



  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  let [completedForms, setCompletedForms] = useLocalStorage(
    "completedForms",
    ""
  );

  const onSubmit = (data) => {
    setCompletedForms((oldArray) => [...oldArray, data]);
    setProductCounter(parseInt(productCounter + 1));
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

  const removeAllItem = () => {
    setCompletedForms((oldArray) => []);
    setProductCounter((productCounter = 0));
    localStorage.clear();
  };
  function getFilteredList() {
    if (!filteredCategory) {
      return completedForms;
    }
    return completedForms.filter(
      (form) => form.type === filteredCategory
    );
  }
  var filteredList = useMemo(getFilteredList, [
    filteredCategory,
    completedForms,
  ]);

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
            {errors.price?.type === "min" && "minimum price is 1"}
            {errors.price?.type === "max" && "maximum price is 20000"}
          </p>
        </label>
        <label>
          Category:
          <select {...register("type")}>
            <option value="Podzespoły">Podzespoły</option>
            <option value="Urządzenia peryferyjne">
              Urządzenia peryferyjne
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
        <div className="buttonsGroup">
          <Sort
            completedForms={completedForms}
            setCompletedForms={setCompletedForms}
          />

          <button onClick={() => resetState()}>toggle dark</button>
          <button onClick={() => removeAllItem()}>remove all items</button>
          <button onClick={() => resetState()}>clear state</button>
          <select
      name="category-list"
      id="category-list"
      onChange={handleCategoryChange}
    >
      <option value="">Filter by Category</option>
      <option value="Podzespoły">Podzespoły</option>
      <option value="Urządzenia peryferyjne">Urządzenia peryferyjne</option>
      <option value="Oprogramowanie">Oprogramowanie</option>
      <option value="Inne">Inne</option>
    </select>
        </div>
        <div className="flex">
          <h2>
            total price:
            {completedForms &&
              completedForms.reduce(
                (total, form) => total + parseInt(form.price),
                0
              )}
          </h2>
          <h2>Liczba produktów: {productCounter}</h2>
          <h2>kategorie: {categoryCounter}</h2>
        </div>
        <div className="formContainer">
          <ul>
            {completedForms &&
              filteredList.map((form, index) => (
                <li draggable key={index}>
                  <button
                    className="removeButton"
                    onClick={() => removeProduct(index)}
                  >
                    x
                  </button>

                  <p><b>Name:</b> {form.productname}</p>
                  <p><b>Description:</b> {form.description}</p>
                  <p><b>Type:</b> {form.type}</p>
                  <p><b>Price:</b> {form.price}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Form;
