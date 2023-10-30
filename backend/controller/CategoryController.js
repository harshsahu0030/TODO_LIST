import CategoryModel from "../models/CategoryModel.js";
import UserModel from "../models/UserModel.js";

//create Category
export const createCategory = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    const { categoryName, color } = req.body;

    let category = await CategoryModel.findOne({
      name: categoryName,
    });

    if (category) {
      return res.status(401).json({
        success: false,
        message: "Category Already exist",
      });
    }

    category = await CategoryModel.create({
      name: categoryName,
      color,
      user: req.user._id,
    });

    user.categories.unshift(category._id);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get All Category
export const getAllCategories = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    const categories = [];

    for (let i = 0; i < user.categories.length; i++) {
      const category = await CategoryModel.findById(user.categories[i]);
      categories.unshift(category);
    }

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//get single Category
export const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//update Category
export const updateCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    const { categoryName } = req.body;

    if (categoryName) {
      category.name = categoryName;
    }

    await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//delete Category
export const deleteCategory = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);

    const category = await CategoryModel.findById(req.params.id);

    const index = user.categories.indexOf(req.params.id);

    await category.deleteOne();
    user.categories.splice(index, 1);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
