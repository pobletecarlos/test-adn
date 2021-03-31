import axios from 'axios';

export const getDogs = async () => {
    try {
        const { data } = await axios.get('/api/dogs');
        return data;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteDog = async (id) => {
    try {
        const { data } = await axios.delete(`/api/dog/${id}`);
        return data;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateDog = async (id, name, color, breed) => {
    try {
        const result = await axios.put(`/api/dog/${id}`, {
            name,
            color,
            breed
        });

        return result.data;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const createDog = async (name, color, breed) => {
    try {
        const result = await axios.post('/api/dog', {
            name,
            color,
            breed
        });

        return result.data;

    } catch (error) {
        throw new Error(error.message);
    }
};