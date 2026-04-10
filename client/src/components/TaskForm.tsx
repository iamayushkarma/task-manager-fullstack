import { useState } from "react";
import { Plus } from "lucide-react";

const TaskForm = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        className="flex-1 block rounded-md py-1.5 px-2 text-sm text-slate-800
          placeholder-slate-400 ring-1 ring-inset placeholder:font-normal font-semibold ring-gray-400 focus:text-gray-800"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task…"
        maxLength={200}
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={!title.trim()}
        className="flex items-center cursor-pointer gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700
          text-white text-sm font-medium rounded-lg transition
          disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
      >
        <Plus size={16} />
        Add
      </button>
    </form>
  );
};

export default TaskForm;
