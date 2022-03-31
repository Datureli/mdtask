import {useForm} from 'react-hook-form'

const Form = () => {
    return (
        <form onSubmit={this.handleSubmit}>
        <label>
          Imię:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    )
}

export default Form