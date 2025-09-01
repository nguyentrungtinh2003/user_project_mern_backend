const User = require("../models/User");

const getAllUser = async () => {
  const allUser = await User.find();

  return allUser;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getUserByPage = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const userPage = await User.find().skip(skip).limit(limit);
  const totalUser = await User.countDocuments();
  const totalPage = Math.ceil(totalUser / limit);

  return { userPage, page, totalUser, totalPage };
};

const updateUser = async (id, user) => {
  const userUpdate = await User.findByIdAndUpdate(id, user, {
    new: true,
    runValidators: true,
  });

  if (!userUpdate) {
    throw new Error("Không tim thấy user");
  }

  return userUpdate;
};

const deleteUser = async (id) => {
  const userDelete = await User.findByIdAndDelete(id);
  if (!userDelete) {
    throw new Error("Không tim thấy user");
  }
  return userDelete;
};
