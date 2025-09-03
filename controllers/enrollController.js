const enrollService = require("../services/enrollService");

const addEnroll = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    const enroll = await enrollService.addEnroll(userId, projectId);
    res.status(201).json({ message: "Add enroll success", enroll });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEnroll = async (req, res) => {
  try {
    const { userId, projectId } = req.body;
    const enroll = await enrollService.getEnroll(userId, projectId);
    res.status(200).json({ message: "Get enroll success", enroll });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addEnroll,
  getEnroll,
};
