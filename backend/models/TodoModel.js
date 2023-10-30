import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter Title"],
  },
  description: {
    type: String,
    required: [true, "Please enter Title"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  dueDate: {
    type: Date,
  },
  status: {
    type: String,
    default: "incomplete",
  },
  completionTime: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Todo", todoSchema);
