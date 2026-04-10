import { useState } from "react";
import { Trash2, Circle, CheckCircle2, Pencil } from "lucide-react";
import type { Task } from "../types/task";

const TaskItem = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}: {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}) => {
  const [leaving, setLeaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  const handleDelete = () => {
    setLeaving(true);
    setTimeout(() => onDelete(task.id), 250);
  };

  const handleSave = () => {
    const trimmed = title.trim();

    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed);
    }

    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(task.title);
    setIsEditing(false);
  };

  const date = new Date(task.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-all duration-200
        ${leaving ? "opacity-0 -translate-x-2" : "opacity-100 translate-x-0"}`}
    >
      {/* Toggle */}
      <button
        onClick={() => onToggle(task)}
        className="shrink-0 text-slate-300 cursor-pointer hover:text-blue-500 transition-colors"
      >
        {task.completed ? (
          <CheckCircle2 size={20} className="text-blue-500" />
        ) : (
          <Circle size={20} />
        )}
      </button>

      {/* Title */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              className="flex-1 border px-2 py-1 text-sm rounded outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <button
              onClick={handleSave}
              className="text-green-600 cursor-pointer  text-xs font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className=" cursor-pointer text-slate-400 text-xs"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p
              className={`text-sm font-medium truncate ${
                task.completed
                  ? "line-through text-slate-400"
                  : "text-slate-700"
              }`}
            >
              {task.title}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">{date}</p>
          </>
        )}
      </div>

      {/* Actions */}
      {!isEditing && (
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
          {/* Edit */}
          <button
            onClick={() => setIsEditing(true)}
            className="text-slate-300 cursor-pointer hover:text-blue-500"
          >
            <Pencil size={15} />
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="text-slate-300 cursor-pointer hover:text-red-500"
          >
            <Trash2 size={15} />
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
