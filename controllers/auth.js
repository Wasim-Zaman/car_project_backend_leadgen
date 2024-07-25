require("dotenv").config();

const Admin = require("../models/admin");
const CustomError = require("../utils/customError");
const generateResponse = require("../utils/response");

exports.createAdmin = async (req, res, next) => {
  console.log("admin is creating....");
  const EMAIL = "admin@example.com";
  try {
    const admin = Admin.findByEmail(EMAIL);
    if (!admin) {
      const password = Admin.createPassword("admin");
      await Admin.createAdmin({
        email: EMAIL,
        password: password,
      });
      console.log("Admin created with email: ", EMAIL);
      res.status(201).json(generateResponse(201, true, ""));
    }
    next();
  } catch (error) {
    next(error);
  }
};

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
      throw new CustomError("No admin found with entered email", 401);
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
