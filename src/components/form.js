import React, { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";
import Filter from "./filter";
import Sort from "./sortby";

const Form = () => {
  let [categoryCounter, setCategoryCounter] = useLocalStorage(
    "categoryCounter",
    [0, 0, 0, 0]
  );
  let [productCounter, setProductCounter] = useLocalStorage(
    "productCounter",
    0
  );

  const {
    register,
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
    setCategoryCounter();
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
          {completedForms &&
            completedForms.map((form, index) => (
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
            {completedForms &&
              completedForms.reduce(
                (total, form) => total + parseInt(form.price),
                0
              )}
          </h2>
          <h2>Liczba produktów: {productCounter}</h2>

          <h2>Liczba produktów kategori: {categoryCounter}</h2>
        </div>

        <div>
          <Sort completedForms={completedForms} setCompletedForms={setCompletedForms} />
          <Filter />
          <button onClick={() => resetState()}>clear state</button>
        </div>
      </div>
    </div>
  );
};

export default Form;
