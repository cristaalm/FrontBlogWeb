import axios from 'axios';

export const loginUser = async (username, password) => {
    try {
      const response = await axios.post('https://backblogweb.onrender.com/api/users/login', {
      // const response = await axios.post('https://backblogweb.onrender.com/api/users/login', {
        nombreusuario: username,
        contraseña: password
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