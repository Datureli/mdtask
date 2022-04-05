import React from "react";
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
  let [completedForms, setCompletedForms] = useLocalStorage(
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
  const onDragStart = (ev, id) => {
    ev.dataTransfer.setCompletedForms("id", id);
  };
const removeAllItem = () => {
    setCompletedForms((oldArray) => [])
    setProductCounter(productCounter = 0)
}
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
        <div className="formContainer">
          <ul>
            {completedForms &&
              completedForms.map((form, index) => (
                <li
                  onDrop={(e) => this.onDrop(e, "complete")}
                  onDragStart={(e) => this.onDragStart(e, form.productname)}
                  draggable
                  key={index}
                >
                    <div className="flex">
                    <select>
                  
                    <option> {form.productname}</option>
                    <option> Description: {form.description}</option>
                    <option> Type: {form.type}</option>
                    <option> Price: {form.price}</option>
                  </select>

                  <button className="removeButton" onClick={() => removeProduct(index)}>x</button>
                    </div>
              
                </li>
              ))}
          </ul>
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

        <div className="buttonsGroup">
          <Sort
            completedForms={completedForms}
            setCompletedForms={setCompletedForms}
          />

          <button onClick={() => resetState()}>toggle dark</button>
          <button onClick={() => removeAllItem()}>remove all items</button>
          <button onClick={() => resetState()}>clear state</button>
          <Filter />
        </div>
      </div>
    </div>
  );
};

export default Form;
