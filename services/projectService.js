const Project = require("../models/Project");

const addProject = async (project) => {
  const newProject = new Project(project);
  await newProject.save();
  return newProject;
};

const getAllProject = async () => {
  const allProject = await Project.find().populate(
    "createdBy",
    "username email"
  );
  return allProject;
};

const getProjectByPage = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const projectPage = await Project.find().skip(skip).limit(limit);
  const totalProject = await Project.countDocuments();
  const totalPage = Math.ceil(totalProject / limit);

  return { projectPage, page, totalProject, totalPage };
};

const getProjectById = async (id) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("không tìm thấy project");
  }
  return project;
};

const updateProject = async (id, project) => {
  const projectUpdate = await Project.findByIdAndUpdate(id, project, {
    new: true,
  });
  if (!projectUpdate) {
    throw new Error("không tìm thấy project");
  }
  return projectUpdate;
};

const deleteProject = async (id) => {
  const projectDelete = await Project.findByIdAndDelete(id);
  if (!projectDelete) {
    throw new Error("Không tìm thấy project");
  }
  return projectDelete;
};

module.exports = {
  addProject,
  getAllProject,
  getProjectByPage,
  getProjectById,
  updateProject,
  deleteProject,
};
