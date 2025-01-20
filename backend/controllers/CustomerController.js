const Customer = require("../models/Customer");
const addCustomer = async (req, res) => {
  try {
    const { customer,note } = req.body;
    const userId = req.user.id;
    if (!customer) {
      return res.status(400).json({ message: "Customer name is required." });
    }

    // Check if the customer already exists
    const isExist = await Customer.findOne({
      customerName: customer,
      userId: userId,
    });
    // if (isExist) {
    //   return res.status(400).json({ message: "Customer already exists." });
    // }

    // Generate the next customerID
    const lastCustomer = await Customer.findOne().sort({ customerID: -1 });
    const nextCustomerID = lastCustomer ? lastCustomer.customerID + 1 : 1;

    // Create new customer
    const newCustomer = await Customer.create({
      userId: userId,
      customerID: nextCustomerID,
      customerName: customer,
      note: note,
    });

    return res.status(201).json({
      success: true,
      message: "Customer added successfully.",
      data: newCustomer,
    });
  } catch (error) {
    console.error("Error in addCustomer:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
const updateCustomer = async (req, res) => {
  try {
    const userId = req.user.id;
    const { customerId, customerName ,note} = req.body;
    console.log(req.body);
    if (!customerId || !customerName) {
      return res
        .status(400)
        .json({ message: "Both customerId and customerName are required." });
    }
    const customer = await Customer.findOne({
      userId: userId,
    });
    

    // Find and update the customer
    const updatedCustomer = await Customer.findOneAndUpdate(
      {userId: userId, customerID: customerId },
      { customerName: customerName, note:note },
      { new: true } // Return the updated document
    );
    console.log(updatedCustomer);
    if (!updatedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully.",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error("Error in updateCustomer:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};
const deleteCustomer = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const { customerId } = req.body;
    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "Customer ID is required." });
    }

    // Find and delete the customer
    const deletedCustomer = await Customer.findOneAndDelete({
      customerID: customerId,
      userId: userId,
    });

    if (!deletedCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully.",
      data: deletedCustomer,
    });
  } catch (error) {
    console.error("Error in deleteCustomer:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};

const GetCustomer = async (req, res) => {
  try {
    const userId = req.user.id;
    const customer = await Customer.find({ userId: userId });
    if (customer) {
      const sendData = customer.map((cat) => {
        return {
          customerID: cat.customerID,
          customerName: cat.customerName,
          note: cat.note,
          payable: cat.payable,
          receivable: cat.recievable,
        };
      });
      return res.status(200).json({
        success: true,
        data: sendData,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Customer not found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in GetCustomer:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
module.exports = { deleteCustomer, updateCustomer, addCustomer, GetCustomer };
