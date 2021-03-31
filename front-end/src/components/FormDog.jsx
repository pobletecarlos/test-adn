import React, { useState } from 'react'

function FormDog({ saveDog }) {
    const initialState = {name: '', color: '', breed: ''};
    const [values, setValues] = useState(initialState);
    
    const handleSubmit = (event) => {
      event.preventDefault();
      const { name, color, breed } = values;
      if(!name || !color || !breed) return;
      saveDog(values);
      setValues(initialState);
    };

    const handleInputChange = (event) => {
      const {name, value} = event.target;
      setValues( {...values, [name]: value} );
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nombre</label>
          <input 
            type='text' 
            name='name' 
            className='form-control' 
            value={values.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Color</label>
          <input 
            type='text'
            name='color'
            value={values.color} 
            className='form-control' 
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Raza</label>
          <input 
            type='text' 
            name='breed' 
            className='form-control' 
            value={values.breed}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Agregar</button>
      </form>
    )
}

export default FormDog;