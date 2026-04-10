import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import type { Task } from "./types/task";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/task.api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(data);
    } catch {
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  const handleAdd = async (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) return;
    const exists = tasks.some(
      (t) => t.title.toLowerCase() === trimmed.toLowerCase(),
    );

    if (exists) {
      toast.error("Task already exists");
      return;
    }

    const id = toast.loading("Adding…");

    try {
      const newTask = await createTask(trimmed);
      setTasks((prev) => [newTask, ...prev]);
      toast.success("Task added", { id });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add task", { id });
    }
  };
  const handleToggle = async (task: Task) => {
    try {
      const updated = await updateTask(task.id, {
        completed: !task.completed,
      });

      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));

      toast.success(updated.completed ? "Marked complete" : "Marked active", {
        duration: 1500,
      });
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleEdit = async (id: string, title: string) => {
    try {
      const updated = await updateTask(id, { title });

      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

      toast.success("Task updated", { duration: 1500 });
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      toast.success("Task deleted");
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const completed = tasks.filter((t) => t.completed).length;
  const total = tasks.length;

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{ className: "!text-sm !rounded-lg !shadow-md" }}
      />

      <div className="min-h-screen bg-slate-50 flex items-start justify-center p-6 pt-16">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-800">My Tasks</h1>
            {total > 0 && (
              <p className="text-sm text-slate-500 mt-1">
                {completed} of {total} completed
              </p>
            )}
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Form */}
            <div className="p-4 border-b border-slate-100">
              <TaskForm onAdd={handleAdd} />
            </div>

            {/* List */}
            <div className="divide-y divide-slate-100">
              {loading ? (
                <div className="p-4 flex flex-col gap-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 bg-slate-100 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <TaskList
                  tasks={tasks}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              )}
            </div>
          </div>

          {/* Footer count */}
          {total > 0 && (
            <p className="text-xs text-slate-400 mt-3 text-center">
              {total - completed} task{total - completed !== 1 ? "s" : ""}{" "}
              remaining
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
