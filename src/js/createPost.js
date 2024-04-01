import axios from 'axios';

export const createPost = async (titulo, contenido, idcategoria, img, usuario) => {
    console.log(titulo,contenido,idcategoria,img,usuario);
    try {
      const response = await axios.post('http://localhost:8080/api/entradas/', {
        titulo: titulo,
        contenido: contenido,
        idcategoria: idcategoria,
        imgdestacada: img,
        fechapublicacion: "2024-03-12",
        usuario: usuario,
        estatus: "estatus"
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