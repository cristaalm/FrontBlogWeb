import axios from "axios";
import { BaseUrl } from "../constants/global";
export const editCategory = async (
  nombre,
  descripcion,
  selectedColor,
  previewImage,
  id
) => {
  try {
    const response = await axios.patch(BaseUrl + `/api/categories/${id}`, {
      nombre: nombre,
      descripcion: descripcion,
      imgdestacada: previewImage,
      color: selectedColor,
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
