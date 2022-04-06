const removeAllItems = (props) => {
    const remove = () => {
        props.setCompletedForms((oldArray) => []);
        props.setProductCounter( props.productCounter = 0);
       
        localStorage.clear();
      };

      return (
        <button onClick={() => remove(props)}>remove all items</button>
      )
}

export default removeAllItems