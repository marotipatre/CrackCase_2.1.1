const Profile = require("../../Models/StartupProfileModel");

// Function to filter only allowed fields for startup profile
const filterStartupProfileData = (data) => {
  const allowedFields = {
    startupName: data.startupName,
    description: data.description,
    missionStatement: data.missionStatement,
    offerings: data.offerings,
    founders: data.founders,
    industry: data.industry,
    location: data.location,
    websiteUrl: data.websiteUrl,
    contactInformation: data.contactInformation,
  };
  return allowedFields;
};

// Create or Update Startup Profile
exports.createOrUpdateStartupProfile = async (req, res) => {
  try {
    // Filter request body to include only allowed fields
    const filteredBody = filterStartupProfileData(req.body);

    // Find the startup profile by ID
    let startupProfile = await Profile.findById(req.params.id);

    // If no profile exists, create a new one
    if (!startupProfile) {
      startupProfile = await Profile.create(filteredBody);
      return res.status(201).json({
        status: "success",
        data: startupProfile,
        message: "Startup profile created successfully!",
      });
    }

    // Remove logoUrl from filtered body to prevent update
    delete filteredBody.logoUrl;

    // Update the profile data
    startupProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    // Send successful response with updated profile
    return res.status(200).json({
      status: "success",
      data: startupProfile,
      message: "Startup profile updated successfully!",
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating or updating startup profile:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message:
        "Something went wrong while creating or updating the startup profile.",
      error: error.message,
    });
  }
};

// View Startup Profile by ID
exports.viewStartupProfile = async (req, res) => {
  try {
    // Find the startup profile by ID
    const startupProfile = await Profile.findById(req.params.id);

    // If no profile exists, return an error
    if (!startupProfile) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "Startup profile not found.",
      });
    }

    // Send successful response with startup profile
    return res.status(200).json({
      status: "success",
      data: startupProfile,
      message: "Startup profile fetched successfully!",
    });
  } catch (error) {
    // Handle errors
    console.error("Error fetching startup profile:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while fetching the startup profile.",
      error: error.message,
    });
  }
};

// Delete Startup Profile by ID
exports.deleteStartupProfile = async (req, res) => {
  try {
    // Find the startup profile by ID and delete it
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);

    // If no profile exists, return an error
    if (!deletedProfile) {
      return res.status(404).json({
        status: "fail",
        data: null,
        message: "Startup profile not found.",
      });
    }

    // Send successful response
    return res.status(200).json({
      status: "success",
      data: null,
      message: "Startup profile deleted successfully!",
    });
  } catch (error) {
    // Handle errors
    console.error("Error deleting startup profile:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while deleting the startup profile.",
      error: error.message,
    });
  }
};

// Search Startup Profiles
exports.searchStartupProfiles = async (req, res) => {
  try {
    // Extract search parameters from request query
    const { query } = req.query;

    // Perform search query using text indexes on startup profile schema
    const searchResults = await Profile.find({ $text: { $search: query } });

    // Send successful response with search results
    return res.status(200).json({
      status: "success",
      data: searchResults,
      message: "Startup profiles searched successfully!",
    });
  } catch (error) {
    // Handle errors
    console.error("Error searching startup profiles:", error);
    return res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while searching startup profiles.",
      error: error.message,
    });
  }
};

// Update Profile Logo by ID
exports.updateProfileLogo = async (req, res) => {
  try {
    // Check if file is present in the request
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Update the logoUrl field in the database
    const updatedProfile = await Profile.findByIdAndUpdate(
      req.params.id,
      { logoUrl: `/data/startup-profiles/logo/${req.file.filename}` },
      { new: true }
    );

    // If no profile exists, return an error
    if (!updatedProfile) {
      return res.status(404).json({ message: "Startup profile not found" });
    }

    // Send success response with updated profile
    res.status(200).json({
      status: "success",
      data: updatedProfile,
      message: "Profile logo updated successfully",
    });
  } catch (error) {
    // Handle errors
    console.error("Error updating profile logo:", error);
    res.status(500).json({
      status: "fail",
      data: null,
      message: "Something went wrong while updating profile logo.",
      error: error.message,
    });
  }
};
