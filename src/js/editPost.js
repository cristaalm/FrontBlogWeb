import axios from 'axios';

export const editPost = async (titulo, contenido, idcategoria, img, usuario, descripcion,id) => {
    try {
      const response = await axios.patch(`https://backblogweb.onrender.com/api/entradas/${id}`, {
        titulo: titulo,
        contenido: contenido,
        idcategoria: idcategoria,
        imgdestacada: img,
        fechapublicacion: Date.now(),
        usuario: usuario,
        estatus: "Pendiente",
        descripcion: descripcion
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