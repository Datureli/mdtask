const clearState = () => {
    const resetState = () => {
        localStorage.clear();
      };

      return (
        <button onClick={() => resetState()}>clear state</button>
      )
}

export default clearState