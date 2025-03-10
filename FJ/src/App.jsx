import React, { useState } from "react";
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks((prevTasks) => [{ text: newTask, active: true }, ...prevTasks]); // Task mới lên trên
      setNewTask("");
    }
  };

  const toggleTask = (index) => {
    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index].active = !updatedTasks[index].active;

      // Nếu task chuyển từ active -> complete, đưa lên đầu danh sách completed
      if (!updatedTasks[index].active) {
        const completedTask = updatedTasks.splice(index, 1)[0];
        return [...updatedTasks.filter((task) => task.active), completedTask, ...updatedTasks.filter((task) => !task.active)];
      }

      return updatedTasks;
    });
  };

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const deleteAllCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.active));
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : filter === "Active" ? task.active : !task.active
  );

  return (
    <div className="todo-container">
      <h1>#todo</h1>
      <div className="tabs">
        {["All", "Active", "Completed"].map((tab) => (
          <button
            key={tab}
            className={filter === tab ? "active" : ""}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {(filter === "All" || filter === "Active") && (
        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add details"
          />
          <button onClick={addTask}>Add</button>
        </div>
      )}

      <ul className="task-list">
        {filteredTasks.map((task, index) => (
          <li key={index} className={task.active ? "" : "completed"}>
            <input
              type="checkbox"
              checked={!task.active}
              onChange={() => toggleTask(index)}
            />
            <span className={task.active ? "" : "strikethrough"}>{task.text}</span>
            {filter === "Completed" && (
              <button onClick={() => deleteTask(index)}>❌</button>
            )}
          </li>
        ))}
      </ul>

      {filter === "Completed" && tasks.some((task) => !task.active) && (
        <div className="delete-container">
          <button className="delete-all" onClick={deleteAllCompleted}>
            Delete all
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoApp;
