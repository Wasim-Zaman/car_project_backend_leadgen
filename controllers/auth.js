const Admin = require("../models/admin");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      throw new CustomError("Email and password are required", 400);
    }

    // Find the admin by email
    const admin = await Admin.findByEmail(email);
    if (!admin) {
      throw new CustomError("Invalid email entered", 401);
    }

    // Check if the password matches
    const isPasswordValid = await Admin.comparePassword(
      password,
      admin.password
    );
    if (!isPasswordValid) {
      throw new CustomError("Invalid password entered", 401);
    }

    // Create a token (for simplicity, we're not doing this here)
    // const token = createToken(admin);

    res.status(200).json(
      generateResponse(200, true, "Login successful", {
        admin: {
          id: admin.id,
          email: admin.email,
        },
        // token,
      })
    );
  } catch (error) {
    next(error);
  }
};
