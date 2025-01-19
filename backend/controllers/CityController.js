const City = require("../models/City");
const addCity = async (req, res) => {
  try {
    const { city } = req.body;
    const userId = req.user.id;
    if (!city) {
      return res.status(400).json({ message: "City name is required." });
    }

    // Check if the city already exists
    const isExist = await City.findOne({
      cityName: city,
      userId: userId,
    });
    if (isExist) {
      return res.status(400).json({ message: "City already exists." });
    }

    // Generate the next cityID
    const lastCity = await City.findOne().sort({ cityID: -1 });
    const nextCityID = lastCity ? lastCity.cityID + 1 : 1;

    // Create new city
    const newCity = await City.create({
      userId: userId,
      cityID: nextCityID,
      cityName: city,
    });

    return res.status(201).json({
      success: true,
      message: "City added successfully.",
      data: newCity,
    });
  } catch (error) {
    console.error("Error in addCity:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
const updateCity = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cityId, cityName } = req.body;
    console.log(req.body);
    if (!cityId || !cityName) {
      return res
        .status(400)
        .json({ message: "Both cityId and cityName are required." });
    }
    const city = await City.findOne({
      userId: userId,
      cityName: cityName,
    });
    if (city) {
      return res
        .status(404)
        .json({ success: false, message: "City name exist." });
    }

    // Find and update the city
    const updatedCity = await City.findOneAndUpdate(
      { cityID: cityId },
      { cityName: cityName },
      { userId: userId },
      { new: true } // Return the updated document
    );
    console.log(updatedCity);
    if (!updatedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }

    return res.status(200).json({
      success: true,
      message: "City updated successfully.",
      data: updatedCity,
    });
  } catch (error) {
    console.error("Error in updateCity:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};
const deleteCity = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    const { cityId } = req.body;
    if (!cityId) {
      return res
        .status(400)
        .json({ success: false, message: "City ID is required." });
    }

    // Find and delete the city
    const deletedCity = await City.findOneAndDelete({
      cityID: cityId,
      userId: userId,
    });

    if (!deletedCity) {
      return res
        .status(404)
        .json({ success: false, message: "City not found." });
    }

    return res.status(200).json({
      success: true,
      message: "City deleted successfully.",
      data: deletedCity,
    });
  } catch (error) {
    console.error("Error in deleteCity:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
      error: error.message,
    });
  }
};

const GetCity = async (req, res) => {
  try {
    const userId = req.user.id;
    const city = await City.find({ userId: userId });
    if (city) {
      const sendData = city.map((cat) => {
        return {
          cityID: cat.cityID,
          cityName: cat.cityName,
        };
      });
      return res.status(200).json({
        success: true,
        data: sendData,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "City not found.",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in GetCity:", error);
    return res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
module.exports = { deleteCity, updateCity, addCity, GetCity };
