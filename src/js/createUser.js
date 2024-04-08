import axios from 'axios';

export const createUser = async (nombreusuario, nombre, correoelectronico, contraseña, perfil) => {
    try {
      const response = await axios.post('https://backblogweb.onrender.com/api/users/', {
        nombreusuario: nombreusuario,
        nombre: nombre,
        correoelectronico: correoelectronico,
        contraseña: contraseña,
        perfil: perfil
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