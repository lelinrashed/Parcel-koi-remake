import mongoose from "mongoose";

// Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  createdAt: { type: Date, required: true },
});

// Reference model
const User = mongoose.model("User", userSchema);

export default User