import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import Sort from "./sortby";
import TotalPrice from "./totalprice";
import Filter from "./filter";
import ClearState from "./resetstate";

const Form = (props) => {
  let [productCounter, setProductCounter] = useLocalStorage("productCounter",0);
  let [filteredCategory, setFilteredCategory] = useState();
  let [completedForms, setCompletedForms] = useLocalStorage("completedForms","");
  let { register,formState: { errors },handleSubmit,reset,setValue} = useForm();

  const onSubmit = (data) => {
    setCompletedForms((oldArray) => [...oldArray, data]);
    setProductCounter(productCounter + 1);   
    reset()     
  };
  const removeProduct = (index) => {
    setCompletedForms([
      ...completedForms.slice(0, index),
      ...completedForms.slice(index + 1),
    ]);
    setProductCounter(productCounter - 1);
  };

  const removeAllItem = () => {
    setCompletedForms((oldArray) => []);
    setProductCounter((productCounter = 0));
  };
  function getFilteredList() {
    if (!filteredCategory) {
      return completedForms;
    }
    return completedForms.filter((form) => form.type === filteredCategory);
  }
  const filteredList = useMemo(getFilteredList, [
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
            name="productname"
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
          name="price"
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
            <option value=""></option>
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
          <button>add category</button>
          <Sort
            completedForms={completedForms}
            setCompletedForms={setCompletedForms}

          />
        <button type="button" onClick={() => {
            setValue("productname", "keyboard")
            setValue("description","to jest klawiatura")
            setValue("price",212)
            setValue("type", 'Oprogramowanie');
        }}>
        Fill the input 
      </button>
          <button onClick={props.switchTheme}>
            {props.theme === "light" ? "Dark" : "light"}
          </button>
          <button onClick={() => removeAllItem()}>remove all items</button>
          <ClearState />
          <Filter setFilteredCategory={setFilteredCategory} />
        </div>
        <div className="flex">
          <TotalPrice completedForms={completedForms} />
          <h2>number of products: {productCounter}</h2>
        </div>
        <div className="formContainer">
          <ul>
            {completedForms &&
              filteredList.map((form, index) => (
                <li draggable key={index}>
                  <button
                    className="removeButton"
                    onClick={() => removeProduct(index)}>
                    x
                  </button>
                  <p> <b>Name:</b> {form.productname} </p>
                  <p> <b>Description:</b> {form.description} </p>
                  <p> <b>Type:</b> {form.type} </p>
                  <p> <b>Price:</b> {form.price} </p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Form;
