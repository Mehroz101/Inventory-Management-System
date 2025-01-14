import axios from "axios";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_BASE_URL;
const API_URL = REACT_APP_API_URL + "api";
import { notify } from "../utils/notification";
export const login = async (data) => {
  try {
    // const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    //   },
    // };
    console.log(data);
    const response = await axios.post(`${API_URL}/auth/login`, data);
    if (response.data.success) {
      localStorage.setItem("inventorytoken", response.data.token);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    notify("error", error.response.data.message);
  }
};

export const GetCategory = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.get(`${API_URL}/category/getcategory`, config);

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.error("GetCategory Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return []; // Return an empty array in case of an error
  }
};

export const AddCategory = async (data) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/category/addcategory`,
      data,
      config
    );

    if (response.data.success) {
      console.log(response.data);
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("AddCategory Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
  }
};
export const UpdateCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/category/updatecategory`,
      categoryId,
      config
    );

    if (response.data.success) {
      return response.data;
    }
    else{
      return { success: false, message: response.data.message };

    }
  } catch (error) {
    console.error("UpdateCategory Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
  }
};
export const DeleteCategory = async (categoryId) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/category/deletecategory`,
      categoryId,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("DeleteCategory Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};
