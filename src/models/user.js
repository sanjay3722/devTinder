const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email address is not valid." + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "other"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default about of the user.",
    },
    photoUrl: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo URL is not valid." + value);
        }
      },
    },
    skills: {
      type: [String],
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function() {
  const user = this;
  const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: '7d'});
  return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passswordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordInputByUser, passswordHash);
  return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;
