import React from "react";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form className="formCard" onSubmit={handleSubmit(onSubmit)}>
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
        {errors.productName?.type === "required" && "product name is required"}
      </label>
      <label>
        Description:
        <input type="text" {...register("description", { required: true })} />
        {errors.description?.type === "required" && "description is required"}
      </label>
      <label>
        <select {...register("type")}>
          <option value="">podzespoły</option>
          <option value="">urządzenia peryferyjne</option>
          <option value="">Oprogramowanie</option>
          <option value="">Inne</option>
        </select>
        {errors.type?.type === "required" && "type is required"}
      </label>
      <label>
        Price:
        <input
          type="number"
          {...register("price", { required: true, min: 1, max: 99 })}
        />
        <input type="submit" value="Wyślij" />
        {errors.price?.type === "required" && "price is required"}
      </label>
    </form>
  );
};

export default Form;
