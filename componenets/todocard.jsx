import React from "react";

function TodoCard({ title, desc, deleteMode, onToggle, onEdit, checked }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow rounded-md">
      <div className="flex items-center gap-4">
        {deleteMode && (
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="w-4 h-4"
          />
        )}
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-gray-700">{desc}</p>
        </div>
      </div>
      <button
        onClick={onEdit}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Edit
      </button>
    </div>
  );
}

export default TodoCard;
