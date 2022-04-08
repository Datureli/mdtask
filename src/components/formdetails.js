const FormDetails = (props) => {
    return (
        <div className="formContainer">
        <ul>
          {props.completedForms &&
            props.filteredList.map((form, index) => (
              <li draggable key={index}>
                <button
                  className="removeButton"
                  onClick={() => props.removeProduct(index)}>
                  x
                </button>
                <p> <b>Name:</b> {form.productname} </p>
                <p> <b>Description:</b> {form.description} </p>
                <p> <b>Type:</b> {form.type} </p>
                <p> <b>Price:</b> {form.price} </p>
                <p> <b>Date of purchase:</b> {form.data} </p>
              </li>
            ))}
        </ul>
      </div>
    )
}

export default FormDetails