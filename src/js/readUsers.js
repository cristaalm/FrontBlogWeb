import axios from "axios";

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(
      "https://backblogweb.onrender.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombreusuario: username,
          contraseña: password,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Empty response");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    let errorMessage = "An error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw errorMessage;
  }
};
