import { v4 as uuidv4 } from "uuid";
import { tasks } from "../data/tasks.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";

// GET
const getTasks = asyncHandler(async (req, res) => {
  res.json(new ApiResponse(200, tasks));
});

// POST
const createTask = asyncHandler(async (req, res) => {
  let { title } = req.body;

  if (!title || !title.trim()) {
    throw new ApiError(400, "Title is required");
  }

  title = title.trim();

  const exists = tasks.some(
    (t) => t.title.toLowerCase() === title.toLowerCase(),
  );

  if (exists) {
    throw new ApiError(400, "Task already exists");
  }

  const newTask = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);

  res.status(201).json(new ApiResponse(201, newTask, "Task created"));
});

// PATCH
const updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  if (title !== undefined) {
    task.title = title;
  }

  if (completed !== undefined) {
    task.completed = completed;
  }

  res.json(new ApiResponse(200, task, "Task updated"));
});

// DELETE
const deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    throw new ApiError(404, "Task not found");
  }

  const deleted = tasks.splice(index, 1);

  res.json(new ApiResponse(200, deleted[0], "Task deleted"));
});

export { getTasks, createTask, updateTask, deleteTask };
