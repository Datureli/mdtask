import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useLocalStorage from "use-local-storage";

const Form = () => {
  let [productCounter, setProductCounter] = useLocalStorage(0);
  const {register,formState: { errors }, handleSubmit,} = useForm();
  const [completedForms, setCompletedForms] = useLocalStorage("completedForms","");

  const onSubmit = (data) => {
    setCompletedForms((oldArray) => [...oldArray, data]);
    setProductCounter(productCounter + 1);
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
   // localStorage.clear();
  };

  return (
    <div className="flex">
      <form className="formCard" onSubmit={handleSubmit(onSubmit)}>
        <h1>New product form</h1>
        <label>
          Product name
          <input
            type="text"
            {...register("productName", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          <p className="error">
            {errors.productName?.type === "required" && "product is required"}
            {errors.productName?.type === "minLength" &&
              "min product length is 3"}
            {errors.productName?.type === "maxLength" &&
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
            {errors.productName?.type === "minLength" &&
              "min description length is 3"}
            {errors.productName?.type === "maxLength" &&
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
            {" "}
            {errors.type?.type === "required" && "type is required"}
          </p>
        </label>

        <input type="submit" value="Wyślij" />
      </form>
      <ul>
        {completedForms &&
          completedForms.map((form, index) => (
            <li key={index}>
              <p> Product name:{form.productName}</p>
              <p> description: {form.description}</p>
              <p> type: {form.type}</p>
              <p> price: {form.price}</p>
              <button onClick={() => removeProduct(index)}>remove</button>
            </li>
          ))}
      </ul>
      <h2>
        total price:{" "}
        {completedForms.reduce(
          (total, form) => total + parseInt(form.price),
          0
        )}
      </h2>
      <h2>Liczba produktów: {productCounter}</h2>
      <button onClick={() => resetState}>reset state</button>
    </div>
  );
};

export default Form;
