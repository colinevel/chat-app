// src/api/userApi.ts

import axiosInstance from "../auth/axiosInstance";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    const token = response.data.accessToken;
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const signupUser = async (
  pseudo: string,
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post("/auth/signup", {
      pseudo,
      email,
      password,
    });
    localStorage.setItem("token", response.data.accessToken);
    return true; // Should return JWT token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const sendMessage = async ({
  sender,
  message,
}: {
  sender: string;
  message: string;
}) => {
  try {
    const response = await axiosInstance.post("/chat/sendMessage", {
      sender,
      message,
    });
    return response;
  } catch (error) {
    console.error("Error sending message", error);
    throw error;
  }
};
export const me = async () => {
  try {
    const response = await axiosInstance.get("/auth/profile");
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};
