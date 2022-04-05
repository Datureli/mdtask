const RemoveItem = (props) => {
  const removeProduct = (index) => {
    props.setCompletedForms([
      ...props.completedForms.slice(0, index),
      ...props.completedForms.slice(index + 1),
    ]);
  };

  return (
    <button onClick={() => removeProduct()}>x</button>
  )
};

export default RemoveItem;
