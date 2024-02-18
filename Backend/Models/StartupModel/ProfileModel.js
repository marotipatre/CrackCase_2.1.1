const mongoose = require("mongoose");

// Define the schema for startup profiles
const profileSchema = new mongoose.Schema(
  {
    // Startup name
    startupName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Description of the startup
    description: {
      type: String,
      required: true,
    },
    // Mission statement of the startup
    missionStatement: {
      type: String,
      required: true,
    },
    // Offerings provided by the startup
    offerings: {
      type: [String],
      required: true,
      validate: {
        validator: function (value) {
          return value.length > 0;
        },
        message: "At least one offering must be provided.",
      },
    },
    // Founders of the startup
    founders: [
      {
        name: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          required: true,
        },
        bio: String,
      },
    ],
    // Industry of the startup
    industry: {
      type: String,
      required: true,
    },
    // Location of the startup
    location: {
      type: String,
      required: true,
    },
    // Website URL of the startup
    websiteUrl: {
      type: String,
      validate: {
        validator: function (value) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
        },
        message: "Invalid URL format.",
      },
    },
    // Contact information of the startup
    contactInformation: {
      email: {
        type: String,
        validate: {
          validator: function (value) {
            return /\S+@\S+\.\S+/.test(value);
          },
          message: "Invalid email address format.",
        },
      },
      phone: {
        type: String,
        validate: {
          validator: function (value) {
            return /^\d{10}$/.test(value);
          },
          message: "Phone number must be 10 digits.",
        },
      },
      socialMedia: {
        type: Map,
        of: {
          type: String,
          validate: {
            validator: function (value) {
              return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
            },
            message: "Invalid URL format.",
          },
        },
      },
    },
    // URL for the startup's logo
    logoUrl: {
      type: String,
      validate: {
        validator: function (value) {
          return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
        },
        message: "Invalid URL format.",
      },
    },
  },
  { timestamps: true }
); // Automatically add createdAt and updatedAt fields

// Add text indexes for searchable fields
profileSchema.index({
  startupName: "text",
  description: "text",
  missionStatement: "text",
  "founders.name": "text",
  industry: "text",
  location: "text",
});

// Create a model for the startup profile schema
const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
