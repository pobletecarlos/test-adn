import React, { useState } from 'react';

function EditFormDog({ currentDog, updateDogAction }) {
    const [dog, setDog] = useState(currentDog);
    
    const handleSubmit = (event) => {
      event.preventDefault();
      updateDogAction(dog.id, dog);
    };

    const handleInputChange = (event) => {
      const {name, value} = event.target;
      setDog({ ...dog, [name]: value });
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label>Nombre</label>
          <input 
            type='text'
            name='name' 
            className='form-control' 
            value={dog.name} 
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Color</label>
          <input 
            type='text'
            name='color' 
            className='form-control' 
            value={dog.color}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-group'>
          <label>Raza</label>
          <input 
            type='text' 
            name='breed' 
            className='form-control' 
            value={dog.breed}
            onChange={handleInputChange}>
          </input>
        </div>
        <button type="submit" className="btn btn-primary">Modificar</button>
      </form>
    )
}

export default EditFormDog;