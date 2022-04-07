const TotalPrice = (props) => {
  return (
    <h2>
      total price: {props.completedForms &&
        props.completedForms.reduce(
          (total, form) => total + parseInt(form.price),
          0
        )}
    </h2>
  );
};

export default TotalPrice;
