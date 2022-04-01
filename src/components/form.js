import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const [completedForms, setCompletedForms] = useState([]);
  const {register, formState: { errors }, handleSubmit,} = useForm();
  const onSubmit = (data) => {
    setCompletedForms(oldArray => [...oldArray,data])
    console.log(data);
  } 

  return (
    <div>
      <form className="formCard" onSubmit={handleSubmit( onSubmit )}>
        <label>
          ProductName
          <input
            type="text"
            {...register("productName", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.productName?.type === "required" &&
            "product name is required"}
        </label>
        <label>
          Description:
          <input type="text" {...register("description", { required: true })} />
          {errors.description?.type === "required" && "description is required"}
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
          {errors.type?.type === "required" && "type is required"}
        </label>
        <label>
          Price:
          <input
            type="number"
            {...register("price", { required: true, min: 1, max: 20000 })}
          />
          {errors.price?.type === "required" && "price is required"}
        </label>
        <input type="submit" value="Wyślij" />
      </form>
      
      <ul>
        {completedForms &&
          completedForms.map((form, index) => <li key={index}>
           {form.productName}
           {form.description}
           {form.type}
           {form.price}
          </li>)}
      </ul>
    </div>
  );
};

export default Form;
