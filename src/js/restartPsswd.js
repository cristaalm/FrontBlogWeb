import axios from "axios";

export const restartPassword = async (id, pwwd) => {
  try {
    const response = await axios.post(
      `https://backblogweb.onrender.com/api/users/restart-pwd/${id}`,
      {
        contraseña: pwwd,
      }
    );

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