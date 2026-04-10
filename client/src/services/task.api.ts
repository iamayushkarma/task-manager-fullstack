import axios from "axios";
import type { Task } from "../types/task";

const API = import.meta.env.VITE_SERVER_API;

const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API);
  return res.data.data;
};

const createTask = async (title: string): Promise<Task> => {
  const res = await axios.post(API, { title });
  return res.data.data;
};

const updateTask = async (
  id: string,
  updates: { title?: string; completed?: boolean },
): Promise<Task> => {
  const res = await axios.patch(`${API}/${id}`, updates);
  return res.data.data;
};

const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API}/${id}`);
};
export { getTasks, createTask, updateTask, deleteTask };
