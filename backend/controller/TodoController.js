import TodoModel from "../models/TodoModel.js";
import CategoryModel from "../models/CategoryModel.js";
import UserModel from "../models/UserModel.js";

import ApiFeature from "../utils/apiFeature.js";

export const createTodo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).populate("categories");

    let { title, description, category, dateTime } = req.body;

    if (!category) {
      return res.status(404).json({
        sucess: false,
        message: "Please create Atleast one category",
      });
    }

    category = await user.categories.find((item) => item.name === category);

    const todo = await TodoModel.create({
      title,
      description,
      dueDate: dateTime,
      category,
      user: req.user._id,
    });

    user.todolists.unshift(todo._id);
    user.save();

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUserAllTodolist = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    const { keyword, category, status } = req.query;

    let todolist = [];

    for (let i = 0; i < user.todolists.length; i++) {
      const todos = await TodoModel.findById(user.todolists[i]).populate(
        "category"
      );
      todolist.push(todos);
    }

    if (keyword) {
      todolist = todolist.filter(
        (todo) => todo.title.toLowerCase() === keyword.toLowerCase()
      );
    }
    if (category) {
      const cat = await CategoryModel.findOne({
        name: { $regex: category, $options: "i" },
      });

      todolist = todolist.filter(
        (todo) => todo.category.toString() === cat._id.toString()
      );
    }
    if (status) {
      todolist = todolist.filter(
        (todo) => todo.status.toLowerCase() === status.toLowerCase()
      );
    }

    let todolistLength = todolist.length;

    return res.status(200).json({
      success: true,
      todolist,
      todolistLength,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//GET ALL TODOLIST -- ADMIN
export const getAllTodolist = async (req, res) => {
  try {
    const apiFeature = new ApiFeature(TodoModel.find(), req.query).search();

    let todolist = await apiFeature.query;

    let filteredProductsCount = todolist.length;

    return res.status(200).json({
      success: true,
      filteredProductsCount,
      todolist,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id).populate("category");

    if (!todo) {
      return res.status(404).json({
        sucess: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    const user = await UserModel.findById(req.user._id).populate("categories");

    let { title, description, category, dueDate } = req.body;

    if (!todo) {
      return res.status(404).json({
        sucess: false,
        message: "Todo not found",
      });
    }

    if (title) {
      todo.title = title;
    }
    if (description) {
      todo.description = description;
    }
    if (category) {
      category = await user.categories.find((item) => item.name === category);
      todo.category = category;
    }
    if (dueDate) {
      todo.dueDate = dueDate;
    }

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateTodoStatus = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    const { updateStatus } = req.body;

    if (!todo) {
      return res.status(404).json({
        sucess: false,
        message: "Todo not found",
      });
    }

    if (updateStatus === "completed") {
      todo.status = "incomplete";
      todo.completionTime = null;
    }
    if (updateStatus === "incomplete") {
      todo.status = "completed";
      todo.completionTime = Date.now();
    }

    await todo.save();

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: "working",
      todo,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    const user = await UserModel.findById(req.user._id);

    if (!todo) {
      return res.status(404).json({
        sucess: false,
        message: "Todo not found",
      });
    }

    await todo.deleteOne();

    user.todolists.forEach((item, index) => {
      if (item._id.toString() === req.params.id.toString()) {
        return user.todolists.splice(index, 1);
      }
    });

    user.save();

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
