import axios from "axios";
import { BaseUrl } from "../constants/global";
export const createComment = async (
  nombre,
  rating,
  descripcion,
  idEntrada
) => {
  try {
    const response = await axios.post(BaseUrl + "/api/comments/", {
      nombre: nombre,
      valoracion: rating,
      descripcion: descripcion,
      identrada: idEntrada,
      fechacreacion: Date.now(),
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
