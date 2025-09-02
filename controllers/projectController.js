const projectService = require("../services/projectService");

const addProject = async (req, res) => {
  try {
    const project = await projectService.addProject(req.body);
    res.status(200).json({ message: "Add project success", project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllProject = async (req, res) => {
  try {
    const projects = await projectService.getAllProject();
    res.status(200).json({ message: "Get all project success", projects });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectByPage = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const projects = await projectService.getProjectByPage(page, limit);
    res.status(200).json({ message: "Get project by page success", projects });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    res.status(200).json({ message: "Get project by id success", project });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectUpdate = await projectService.updateProject(id, req.body);
    res.status(200).json({ message: "Update project success", projectUpdate });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const projectDelete = await projectService.deleteProject(id);
    res.status(200).json({ message: "Delete project success", projectDelete });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addProject,
  getAllProject,
  getProjectByPage,
  getProjectById,
  updateProject,
  deleteProject,
};
