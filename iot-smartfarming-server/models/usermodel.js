const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  farmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return candidatePassword === this.password;  
};

const User = mongoose.model("User", userSchema);

module.exports = User;

