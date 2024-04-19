import axios from "axios";
import { BaseUrl } from "../constants/global";
export const createPost = async (
  titulo,
  contenido,
  idcategoria,
  img,
  usuario,
  descripcion
) => {
  try {
    const response = await axios.post(BaseUrl + "/api/entradas/", {
      titulo: titulo,
      contenido: contenido,
      idcategoria: idcategoria,
      imgdestacada: img,
      fechapublicacion: Date.now(),
      usuario: usuario,
      estatus: "Pendiente",
      descripcion: descripcion,
    });

    if (!response) {
      throw new Error("Empty response");
    }

    return response.data;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }
    throw errorMessage;
  }
};
