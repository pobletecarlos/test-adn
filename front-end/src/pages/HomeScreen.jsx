import React, { useEffect, useState } from 'react';
import Dogs from '../components/Dogs';
import FormDog from '../components/FormDog';
import EditFormDog from '../components/EditFormDog';
import './HomeScreen.css';
import { getDogs, createDog, deleteDog, updateDog } from '../services/dogService';

function HomeScreen() {
    const initialFormState = {id: null, name: '', color: '', breed: ''};
    
    const [dogs, setDogs] = useState([]);
    const [ currentDog, setCurrentDog ] = useState(initialFormState);
    const [editingDog, setEditing] = useState(false);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
        try {
          const { data } = await getDogs();
          setDogs(data);
        } catch (error) {
          alert('Ha ocurrido al momento de buscar los perritos', error);
        }
    };

    const saveDog = async (values) => {
      const {name, color, breed} = values;
      try {
        await createDog(name, color, breed);
        fetchData();
      } catch (error) {
        alert('Ha ocurrido un error al momento de guardar el perrito', error);
      }
    };

    const removeDog = async (id) => {
      try {
        await deleteDog(id);
        setDogs(dogs.filter((dog) => dog.id !== id));
      } catch (error) {
        alert('Ha ocurrido un error al momento de eliminar el perrito', error);
      }
    };

    const updateDogAction = async (id, updated) => {
      const {name, color, breed} = updated;
      try {
        const { data } = await updateDog(id, name, color, breed);
        console.log(data)
        setDogs(dogs.map((dog) => dog.id === id ? data : dog));
        setEditing(false);
      } catch (error) {
        alert('Ha ocurrido un error al momento de modificar el perrito', error);
      }
    }

    const updateDogRow  = (dog) => {
      const { id, name, color, breed } = dog;
      setEditing(true);
      setCurrentDog({id: id, name: name, color: color, breed: breed});
    }

    return (
      <div className='container HomeScreen_divContainer'>
        <div className='row'>
          <div className='col-md-4'>
            {editingDog ? 
              <EditFormDog 
                currentDog={currentDog} 
                updateDogAction={updateDogAction} 
              />
              :
              <FormDog saveDog={saveDog} />
            }
          </div>
          <div className='col-md-8'>
            <Dogs 
              dogs={dogs}
              removeDog={removeDog} 
              updateDogRow={updateDogRow} 
            />
          </div>
        </div>   
      </div>
    )
}

export default HomeScreen;