import React from 'react'

const Dogs = ({ dogs, removeDog, updateDogRow }) => {
    return (
      <div className="card border-success">
        <div className="card-header bg-transparent border-success">Perritos</div>
        <div className="card-body text-success">
          <div className="table-responsive">
          <table className='table'>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Color</th>
                <th>Raza</th>
                <th>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog) => 
                 <tr key={dog.id}>
                   <td>{dog.name}</td>
                   <td>{dog.color}</td>
                   <td>{dog.breed}</td>
                   <button 
                      type="button" 
                      className="btn btn-success"
                      onClick={() => updateDogRow(dog)}
                   >
                     Modificar
                   </button>  
                   <button 
                     type="button" 
                     className="btn btn-danger"
                     onClick={() => removeDog(dog.id)}
                   >
                     Eliminar
                   </button>
                 </tr>
              )}
            </tbody>
          </table>
          </div> 
        </div>
      </div>
    )
}

export default Dogs