import axios from "axios";
import { BaseUrl } from "../constants/global";
export const editUser = async (
  nombreusuario,
  nombre,
  correoelectronico,
  contraseña,
  perfil,
  id
) => {
  try {
    const response = await axios.patch(BaseUrl + `/api/users/${id}`, {
      nombreusuario: nombreusuario,
      nombre: nombre,
      correoelectronico: correoelectronico,
      contraseña: contraseña,
      perfil: perfil,
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
