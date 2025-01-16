import axios from "axios";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_BASE_URL;
const API_URL = REACT_APP_API_URL + "/api";
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
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log("UpdateCategory Error:", error);
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

// =============================Product ==========================
export const AddProduct = async (data) => {
  try {
    console.log(data)
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/product/addproduct`,
      data,
      config
    );
    console.log(response.data)
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log(error.message);
    notify("error",error.response.data.message)
  }
};

export const GetProduct = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.get(`${API_URL}/product/getproduct`, config);

    if (response.data.success) {
      console.log(response.data.data)
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.log("GetProduct Error:", error.message);
    return []; // Return an empty array in case of an error
  }
};

export const UpdateProduct = async (productId)=>{
  try {
    console.log(productId)
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/product/updateproduct`,
      productId,
      config
    );

    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log("Updateproduct Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
  }
}
export const DeleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/product/deleteproduct`,
      productId,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Deleteproduct Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};
