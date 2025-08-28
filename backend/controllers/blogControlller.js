const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel
      .find({})
      .populate("user", "username email")
      .sort({ createdAt: -1 });
    
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: "All Blogs lists",
      blogs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Blogs",
      error: error.message,
    });
  }
};

exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
   
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const session = await mongoose.startSession();
    
    try {
      session.startTransaction();
      
      const newBlog = new blogModel({ title, description, image, user });
      await newBlog.save({ session });
      
      existingUser.blogs.push(newBlog._id);
      await existingUser.save({ session });
      
      await session.commitTransaction();
      
      return res.status(201).send({
        success: true,
        message: "Blog Created!",
        newBlog,
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating blog",
      error: error.message,
    });
  }
};

exports.updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await blogModel
      .findByIdAndUpdate(id, { ...req.body }, { new: true })
      .populate("user", "username email");
      
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog Updated!",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Updating Blog",
      error: error.message,
    });
  }
};

exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid blog ID",
      });
    }

    const blog = await blogModel
      .findById(id)
      .populate("user", "username email");
      
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found with this id",
      });
    }
    
    return res.status(200).send({
      success: true,
      message: "Fetch single blog",
      blog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while getting single blog",
      error: error.message,
    });
  }
};

// ✅ FINAL FIXED DELETE CONTROLLER

// ALL OTHER CONTROLLERS STAY THE SAME - ONLY REPLACE DELETE CONTROLLER

// ✅ FINAL SIMPLE DELETE CONTROLLER
exports.deleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("🗑️ Delete request received for ID:", id);

    // Simple deletion without complex validation
    const deletedBlog = await blogModel.findByIdAndDelete(id);
    
    if (!deletedBlog) {
      console.log("❌ Blog not found");
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    console.log("✅ Blog deleted successfully");

    // ✅ CRITICAL: Send proper JSON response
    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully!"
    });

  } catch (error) {
    console.error("❌ Delete error:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting blog",
      error: error.message
    });
  }
};

exports.searchBlogsController = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query || query.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    
    const blogs = await blogModel.find({
      $or: [
        { title: { $regex: query.trim(), $options: 'i' } },
        { description: { $regex: query.trim(), $options: 'i' } }
      ]
    })
    .populate("user", "username email")
    .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      BlogCount: blogs.length,
      message: `Found ${blogs.length} blogs matching "${query}"`,
      blogs,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Search failed on server",
      error: error.message,
    });
  }
};

exports.userBlogControlller = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        success: false,
        message: "Invalid user ID",
      });
    }

    const blogs = await blogModel
      .find({ user: id })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    return res.status(200).send({
      success: true,
      message: "User blogs fetched successfully",
      userBlog: {
        blogs: blogs,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in user blog",
      error: error.message,
    });
  }
};
