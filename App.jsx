import React, { useState, useEffect } from "react";
import Navbar from "./componenets/Navbar";
import TodoCard from "./componenets/todocard";

function App() {
  const [Tdata, setTdata] = useState({ title: "", desc: "" });
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false);
  const [selected, setSelected] = useState({});

  // Load from localStorage on mount
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);
  

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTdata({ ...Tdata, [name]: value });
  };

  const handleAddOrEdit = () => {
    if (!Tdata.title.trim() || !Tdata.desc.trim()) return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = Tdata;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, Tdata]);
    }

    setTdata({ title: "", desc: "" });
  };

  const handleEdit = (index) => {
    setTdata(todos[index]);
    setEditIndex(index);
  };

  const handleDeleteSelected = () => {
    const remaining = todos.filter((_, i) => !selected[i]);
    setTodos(remaining);
    setSelected({});
    setDeleteMode(false);
  };

  const toggleSelect = (index) => {
    setSelected((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-4 bg-sky-100 min-h-screen p-8">
        <input
          type="text"
          name="title"
          value={Tdata.title}
          onChange={handleChange}
          placeholder="Enter title..."
          className="h-10 w-60 p-2 rounded-lg border-2"
        />

        <input
          type="text"
          name="desc"
          value={Tdata.desc}
          onChange={handleChange}
          placeholder="Enter description..."
          className="h-10 w-60 p-2 rounded-lg border-2"
        />

        <button
          onClick={handleAddOrEdit}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? "Update" : "Add"}
        </button>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setDeleteMode(!deleteMode)}
            className="bg-yellow-400 px-4 py-1 rounded"
          >
            {deleteMode ? "Cancel Delete" : "Enable Delete"}
          </button>
          {deleteMode && (
            <button
              onClick={handleDeleteSelected}
              className="bg-red-500 text-white px-4 py-1 rounded"
            >
              Delete Selected
            </button>
          )}
        </div>

        <div className="w-full max-w-2xl mt-6 space-y-3">
          {todos.map((todo, index) => (
            <TodoCard
              key={index}
              index={index}
              title={todo.title}
              desc={todo.desc}
              deleteMode={deleteMode}
              checked={!!selected[index]}
              onToggle={() => toggleSelect(index)}
              onEdit={() => handleEdit(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App
