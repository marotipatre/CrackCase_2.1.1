// Model Imports
const User = require("../../Models/UserModel/UserModel");
const Profile = require("../../Models/UserModel/ProfileModel");
// Utility Libraries
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// Utility Function which generates a JWT Token from user Id, and Secret Key
const signToken = (id, role) => {
  const token = jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

// Utility function which filters only the allowed data for updation
const filterObjectForUpdation = (obj, ...allowedFields) => {
  const newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObject[el] = obj[el];
  });

  return newObject;
};

exports.createUserAccount = async (req, res) => {
  try {
    // Check if all the fields attributes are present in the request body
    const requiredFields = [
      "name",
      "phoneNumber",
      "emailId",
      "password",
      "role",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          status: "fail",
          data: null,
          message: `${field} is required.`,
        });
      }
    }

    // Extracting data from request object
    const { name, phoneNumber, emailId, password, role } = req.body;

    // Saving the data to database
    const newUser = await User.create({
      name,
      phoneNumber,
      emailId,
      password,
      role,
    });

    console.log(role);

    // Create a profile for the new user with default values
    await Profile.create({
      user: newUser._id, // Assuming your user model uses _id as the primary key
      bio: "",
      links: [],
      pastExperiences: [],
      skills: [],
      interests: [],
      // Add other profile fields with default values if needed
    });

    console.log("User Account Created Successfully!");

    return res.status(201).json({
      status: "success",
      data: newUser,
      message: "User Account Created Successfully!",
    });
  } catch (exception) {
    console.log(
      "Exception Occurred During Account Creation : ",
      exception.message
    );

    // If unique fields are duplicated, then account already exists!
    if (exception.code === 11000) {
      console.log("Account Already Exists!");
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Account Already Exists",
      });
    }

    // If Any Validation Failed
    if (exception.name === "ValidationError") {
      console.log(exception.message);
      return res.status(400).json({
        status: "fail",
        data: null,
        message: exception.message,
      });
    }

    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

// User Account Login
exports.logUserIn = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if the email and password exist
    if (!emailId || !password) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Email and password fields are mandatory",
      });
    }

    // Check if a user with the given email exists in the database
    const user = await User.findOne({ emailId });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Incorrect email or password",
      });
    }

    // Check if the candidate password is the same as the actual password
    const correct = await user.correctPassword(password, user.password);

    if (!correct) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Incorrect email or password",
      });
    }

    // If everything is OK, send a token to the client
    const token = signToken(user._id, user.role);
    return res.status(200).json({
      status: "success",
      data: null,
      message: "Logged in successfully!",
      token,
    });
  } catch (exception) {
    console.log(exception);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side!",
      exception: exception.message,
    });
  }
};

// Controller for checking if a particular request is authenticated or not
exports.protect = async (req, res, next) => {
  try {
    // Get token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You are not logged in! Please Login to get access",
      });
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "You are not logged in! Please Login to get access",
      });
    }

    // Validate the token
    let decoded;
    try {
      decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    } catch (exception) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "The user belonging to the token does no longer exist",
      });
    }

    // Check if user still exists
    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return res.status(401).json({
        status: "fail",
        data: null,
        message: "Invalid Token!",
      });
    }

    req.user = { id: decoded.id }; // Attaching the user id to the request object

    // All the above cases have passed!
    // Therefore it is an authenticated request! Hence calling next()
    next();
  } catch (exception) {
    console.log(exception);

    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side !",
      exception: exception.message,
    });
  }
};

// Route for Password Updation
exports.updateUserPassword = async (req, res) => {
  try {
    // Check if password is not present
    if (!req.body.password) {
      return res.status(400).json({
        status: "failed",
        data: null,
        message: "No Password found to update",
      });
    }

    // Extract the new password from the request body
    const newPassword = req.body.password;

    // Get the user ID from the authenticated user (assuming you have implemented authentication middleware)
    const userId = req.user.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      // User not found
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "User not found.",
      });
    }

    // Update the password in the user object
    user.password = newPassword;

    // Save the updated user object to trigger the pre-save middleware
    const updatedUser = await user.save();

    if (updatedUser) {
      // Password updated successfully
      return res.status(200).json({
        status: "success",
        data: null,
        message: "Password updated successfully",
      });
    } else {
      // User not found
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "User not found.",
      });
    }
  } catch (exception) {
    console.log("Error during password updation:", exception.message);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side !",
      exception: exception.message,
    });
  }
};

// User Account Deletion
exports.deleteUserAccount = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming we have userId available after authentication
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      status: "success",
      data: null,
      message: "User account deleted successfully",
    });
  } catch (exception) {
    console.log("Error during deleting user account:", exception.message);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our side !",
      exception: exception.message,
    });
  }
};

// User Account Updation
exports.updateUserAccount = async (req, res) => {
  try {
    // If user sends password fields
    if (req.body.password) {
      return res.status(400).json({
        status: "fail",
        data: null,
        message: "Password cannot be updated through this route!",
      });
    }

    // Only take allowed fields
    const filteredBody = filterObjectForUpdation(
      req.body,
      "name",
      "phoneNumber",
      "emailId"
    );

    // Find the document in the database by Id and update the given data
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    // In future, send this data as response without password attribute!
    console.log(updatedUser);

    // Sending successful response
    return res.status(200).json({
      status: "success",
      data: null,
      message: "Data updated successfully!",
    });
  } catch (exception) {
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our Side!",
      exception: exception.message,
    });
  }
};

// View User Profile
exports.viewUserProfile = async (req, res) => {
  try {
    const userProfileDetails = await User.findById(req.user.id);
    console.log(userProfileDetails);

    const { _id, name, phoneNumber, emailId } = userProfileDetails;

    const userProfileDetailsWithoutPassword = {
      _id,
      name,
      phoneNumber,
      emailId,
    };

    return res.status(200).json({
      status: "success",
      data: userProfileDetailsWithoutPassword,
      message: "Profile fetched successfully!",
    });
  } catch (exception) {
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong at our Side!",
      exception: exception.message,
    });
  }
};
