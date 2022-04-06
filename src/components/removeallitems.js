const removeAllItems = (props) => {
    const removeAllItem = () => {
      props.setCompletedForms(() => []);
       props.setProductCounter((props.productCounter = 0));
      };

      return (
        <button onClick={() => removeAllItem()}>remove all items2</button>
      )
}

export default removeAllItems