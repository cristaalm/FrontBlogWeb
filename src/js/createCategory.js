import axios from 'axios';

export const createCategory = async (nombre, descripcion) => {
    try {
      const response = await axios.post('https://backblogweb.onrender.com/api/categories/', {
        nombre: nombre,
        descripcion: descripcion,
        imgdestacada: "Lorem FACK",
        color: "#EB9694"
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