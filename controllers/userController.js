const { uploadSingleImage } = require("../config/upload");
const userService = require("../services/userService");

const getAllUser = async (req, res) => {
  try {
    const allUser = await userService.getAllUser();
    res.status(200).json({ message: "Get all user success", allUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserByPage = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const userPage = await userService.getUserByPage(page, limit);
    res.status(200).json({ message: "Get user page success", userPage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;
    const userPage = await userService.searchUsers(query, page, limit);
    res.status(200).json({ message: "Search user page success", userPage });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.status(200).json({ message: "Get user id success", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const ALLOWED = [
  "username",
  "email",
  "address",
  "phone",
  "position",
  "password",
  "image",
];
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = {};
    for (const k of ALLOWED) {
      if (req.body[k] !== undefined) update[k] = req.body[k];
    }
    if (Object.keys(update).length === 0) {
      return res.status(400).json({ message: "No Data" });
    }
    const userUpdate = await userService.updateUser(id, update);
    res.status(200).json({ message: "Update user id success", userUpdate });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDelete = await userService.deleteUser(id);
    res.status(200).json({ message: "Delete user id success", userDelete });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//Upload single image
const asyncHandle = require("../middleware/asyncHandlerMiddleware");
const path = require("path");
const fs = require("fs-extra");
const publicUrl = (req, absPath) => {
  const relative = absPath.split(path.join(process.cwd(), "uploads"))[1];
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}/uploads${relative.replace(/\\/g, "/")}`;
};
const removeLocal = (absPath) => {
  try {
    if (absPath && fs.existsSync(absPath)) fs.unlinkSync(absPath);
  } catch {}
};

const uploadUserImage = uploadSingleImage("avatar");

//Processing
const uploadImageUser = asyncHandle(async (req, res) => {
  // try {
  //   const { id } = req.params;
  //   if (!req.file) {
  //     return res.status(400).json({ message: "No image uploaded." });
  //   }
  //   const img = {
  //     type: req.file.mimetype,
  //     data: req.file.buffer,
  //   };
  //   const updatedUser = await userService.uploadImageUser(id, img);
  //   res
  //     .status(200)
  //     .json({ message: "Image uploaded successfully.", user: updatedUser });
  // } catch (error) {
  //   res.status(500).json({ message: error.message });
  // }
  try {
    if (!req.file)
      return res.status(400).json({ message: "No image uploaded." });

    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    //Detele Image old in local server
    const protocol = req.protocol;
    const host = req.get("host");
    if (user.image && !user.image.startsWith("http")) {
      const fromUploads = user.image.startsWith("/uploads")
        ? user.image.replace("/uploads", "")
        : user.image.replace(`${protocol}://${host}/uploads`, "");
      const oldAbs = path.join(process.cwd(), "uploads", fromUploads);
      removeLocal(oldAbs);
    }

    const { path } = req.file;
    const url = publicUrl(req, path);
    const updated = await userService.uploadImageUser(id, url);

    return res.status(200).json({ message: "OK", user: updated });
  } catch (e) {
    return next(e);
  }
});

module.exports = {
  getAllUser,
  getUserByPage,
  getUserById,
  searchUser,
  updateUser,
  deleteUser,
  uploadUserImage,
  uploadImageUser,
};
