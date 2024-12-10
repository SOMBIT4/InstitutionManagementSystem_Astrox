const userModel = require('../../models/userModel');

async function userSearchController(req, res) {
  try {
    // Extract query parameters from the request
    const query = req.query;

    console.log("Query = ", query);

    // Ensure at least one query parameter is provided
    if (Object.keys(query).length === 0) {
      throw new Error("Please provide at least one search parameter");
    }

    // Build a flexible search condition
    const searchConditions = [];
    for (const key in query) {
      searchConditions.push({ [key]: { $regex: query[key], $options: 'i' } });
    }

    // Perform the search using $or for flexible matching
    const users = await userModel.find({ $or: searchConditions });
    console.log("User details = ", users);

    if (users.length === 0) {
      throw new Error("No users found");
    }

    res.json({
      message: "Users found",
      data: users,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSearchController;
