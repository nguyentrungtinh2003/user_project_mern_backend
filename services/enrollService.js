const Enroll = require("../models/Enroll");

const addEnroll = async (userId, projectId) => {
  const enroll = await Enroll.create({ userId, projectId });
  await enroll.save();
  return enroll;
};

const getEnroll = async (userId, projectId) => {
  const enroll = await Enroll.findOne({ userId, projectId });
  return enroll;
};

module.exports = {
  addEnroll,
  getEnroll,
};
