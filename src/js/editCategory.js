import axios from 'axios';

export const editCategory = async (nombre, descripcion, id) => {
  try {
    const response = await axios.patch(`https://backblogweb.onrender.com/api/categories/${id}`, {
      nombre: nombre,
      descripcion: descripcion,
      imgdestacada: "Lorem FACK",
      color: "#E44694"
    });
    
    if (!response) {
      throw new Error('Empty response');
    }
    
    return response.data;
  } catch (error) {
    let errorMessage = 'An error occurred';
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }
    throw errorMessage;
  }
};