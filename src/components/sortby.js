const Sort = (props) => {
  const sortProductByCategory = () => {
    props.setCompletedForms(
      props.completedForms.slice().sort((a, b) => (a.type > b.type ? 1 : -1))
    );
  };
  const sortProductByName = () => {
    props.setCompletedForms(
      props.completedForms.slice().sort((a, b) => (a.name < b.name ? 1 : -1))
    );
  };
  const sortProductByDescription = () => {
    props.setCompletedForms(
      props.completedForms
        .slice()
        .sort((a, b) => (a.description > b.description ? 1 : -1))
    );
  };
  const sortProductByPrice = () => {
    props.setCompletedForms(
      props.completedForms.slice().sort((a, b) => (a.price > b.price ? 1 : -1))
    );
  };

  return (
    <div>
      <button onClick={() => sortProductByName()}>Sort by Name</button>
      <button onClick={() => sortProductByDescription()}>
        Sort by Description
      </button>
      <button onClick={() => sortProductByCategory()}>Sort by Category</button>
      <button onClick={() => sortProductByPrice()}>Sort by price</button>
    </div>
  );
};

export default Sort;
