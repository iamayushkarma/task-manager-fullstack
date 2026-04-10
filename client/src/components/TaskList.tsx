import { ClipboardList } from "lucide-react";
import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}

const TaskList = ({ tasks, onToggle, onDelete, onEdit }: Props) => {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-12 text-slate-400">
        <ClipboardList size={28} strokeWidth={1.5} className="text-slate-300" />
        <p className="text-sm font-semibold text-slate-500 tracking-[-0.01em]">
          No tasks yet
        </p>
        <p className="text-xs text-slate-400 font-normal">
          Add one above to get started
        </p>
      </div>
    );
  }

  const active = tasks.filter((t) => !t.completed);
  const done = tasks.filter((t) => t.completed);

  return (
    <div>
      {/* Active tasks */}
      {active.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}

      {/* Completed section */}
      {done.length > 0 && (
        <>
          {active.length > 0 && (
            <div className="mx-4 border-t border-slate-100" />
          )}

          <div className="px-4 pt-3 pb-1">
            <p className="text-[11px] font-semibold text-slate-400">
              Completed · {done.length}
            </p>
          </div>

          {done.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default TaskList;
