import axios from "axios";
const REACT_APP_API_URL = import.meta.env.REACT_APP_API_BASE_URL;
const API_URL = REACT_APP_API_URL + "api";
// const API_URL = "https://inventory-management-system-beige.vercel.app/api";

import { notify } from "../utils/notification";
export const login = async (data) => {
  try {
    // const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    // const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`, // Add the token to the Authorization header
    //   },
    // };
    const response = await axios.post(`${API_URL}/auth/login`, data);
    if (response.data.success) {
      localStorage.setItem("inventorytoken", response.data.token);
      return response.data;
    }
  } catch (error) {
    console.log(error.message);
    // notify("error", error.response.data.message);
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
    console.error("GetCategory Error:", error.message);
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

// ====================== City ======================
export const GetCity = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.get(`${API_URL}/city/getcity`, config);

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.error("GetCity Error:", error.message);
    notify("error", error.response?.data?.message || "An error occurred.");
    return []; // Return an empty array in case of an error
  }
};

export const AddCity = async (data) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(`${API_URL}/city/addcity`, data, config);

    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("AddCity Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
  }
};
export const UpdateCity = async (cityId) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/city/updatecity`,
      cityId,
      config
    );

    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log("UpdateCity Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
  }
};
export const DeleteCity = async (cityId) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/city/deletecity`,
      cityId,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("DeleteCity Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};

// =============================Product ==========================
export const AddProduct = async (data) => {
  try {
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
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log(error.message);
    notify("error", error.response.data.message);
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
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.log("GetProduct Error:", error.message);
    return []; // Return an empty array in case of an error
  }
};

export const UpdateProduct = async (productId) => {
  try {
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
};
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
export const Transferproduct = async (transferproductdata) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/product/transferproduct`,
      transferproductdata,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Transferproduct Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};
export const TransferPrintingToProduct = async (transferproductdata) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/product/transferprintingtoproduct`,
      transferproductdata,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Transferproduct Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};

export const SpecificProducts = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/product/specificproduct`,
      config
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Transferproduct Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};
export const GetPrintingData = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/product/printingproduct`,
      config
    );
    if (response.data.success) {
      return response.data.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log(error.message);
  }
};

// ===================Pruchase================

export const AddPurchase = async (data) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/purchase/addpurchase`,
      data,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const GetPurchases = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/purchase/getpurchase`, config);

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {}
};
export const GetPurchaseData = async (id) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/purchase/getpurchasedata/${id}`,
      config
    );

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const DeletePurchase = async (id) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/purchase/deletepurchase`,
      id,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Deletepurchase Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};

// ==================== Sale  ======================
export const AddSale = async (data) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(`${API_URL}/sale/addsale`, data, config);
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log(error.message);
    notify("error", error.response.data.message);
  }
};
export const GetSales = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/sale/getsale`, config);

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {}
};
export const DeleteSale = async (id) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(`${API_URL}/sale/deletesale`, id, config);
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("Deletesale Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};
export const GetSaleData = async (id) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/sale/getsaledata/${id}`,
      config
    );

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.log(error.message);
  }
};

//================ Dashboard =====================

export const DashboardData = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(
      `${API_URL}/dashboard/getdashboarddata`,
      config
    );

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const GetStock = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.get(`${API_URL}/dashboard/getstock`, config);

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateProductStock = async (data) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/dashboard/updateproductstock`,
      data,
      config
    );

    if (response.data.success) {
      return response.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const generateReport = async (data) => {
  try {
    console.log("api");
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };
    const response = await axios.post(
      `${API_URL}/dashboard/generatereport`,
      data,
      config
    );

    if (response.data.success) {
      return response.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {}
};

//======================== Customers ==========================

export const GetCustomer = async () => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.get(`${API_URL}/customer/getcustomer`, config);

    if (response.data.success) {
      return response.data.data; // Return the data if successful
    } else {
      return []; // Return an empty array if not successful
    }
  } catch (error) {
    console.error("GetCustomer Error:", error.message);
    notify("error", error.response?.data?.message || "An error occurred.");
    return []; // Return an empty array in case of an error
  }
};

export const AddCustomer = async (data) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/customer/addcustomer`,
      data,
      config
    );

    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("AddCustomer Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
  }
};
export const UpdateCustomer = async (customerId) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/customer/updatecustomer`,
      customerId,
      config
    );

    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.log("UpdateCustomer Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
  }
};
export const DeleteCustomer = async (customerId) => {
  try {
    const token = localStorage.getItem("inventorytoken"); // Retrieve the token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/customer/deletecustomer`,
      customerId,
      config
    );
    if (response.data.success) {
      return response.data;
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error("DeleteCustomer Error:", error);
    notify("error", error.response?.data?.message || "An error occurred.");
    return { success: false, message: error.response.data.message };
  }
};
