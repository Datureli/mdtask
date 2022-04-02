import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
    const { register, formState: { errors }, handleSubmit} = useForm({
        defaultValues: {
            products: [{productName: 'komputer',description: 'opis',type: '',price: 0}]
        }
  });
  const [completedForms, setCompletedForms] = useState([]);

  const onSubmit = (data) => {
    setCompletedForms((oldArray) => [...oldArray, data]);
    console.log(data);
  };
  const removeProduct = (index) => {
    setCompletedForms([...completedForms.slice(0, index), ...completedForms.slice(index + 1)]);
  };
  const totalPrice = () => {

  };

  return (
    <div>
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
           <h1>total price: {completedForms.reduce((total, form) => total+(parseInt(form.price)),0)}</h1>
      </ul>
    </div>
  );
};

export default Form;
