import React, { useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [editedTask, setEditedTask] = useState(null); // For editing task

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const authStatus = JSON.parse(localStorage.getItem("isLoggedIn")) || false;
    setTasks(savedTasks);
    setIsLoggedIn(authStatus);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [tasks, isLoggedIn]);

  const handleLogin = () => {
    if (username === "user" && password === "password") {
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
    } else {
      alert("Invalid credentials! Use username: user and password: password.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Add task
  const addTask = (taskText, priority) => {
    if (taskText.trim() !== "") {
      setTasks([
        ...tasks,
        { text: taskText, priority: priority, id: Date.now(), completed: false }
      ]);
    }
  };

  // Delete task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // Toggle completion status
  const toggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Edit task
  const startEditing = (task) => {
    setEditedTask(task);
  };

  const saveEditedTask = (updatedText) => {
    setTasks(
      tasks.map((task) =>
        task.id === editedTask.id ? { ...task, text: updatedText } : task
      )
    );
    setEditedTask(null);
  };

  // Sort tasks by priority
  const sortedTasks = [...tasks].sort((a, b) => {
    const priorities = { High: 1, Medium: 2, Low: 3 };
    return priorities[a.priority] - priorities[b.priority];
  });

  return (
    <div className="app">
      {isLoggedIn ? (
        <>
          <h1>To-Do List</h1>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          <TaskInput onAddTask={addTask} />
          <TaskList
            tasks={sortedTasks}
            onDeleteTask={deleteTask}
            onToggleCompletion={toggleCompletion}
            onEditTask={startEditing}
          />
          {editedTask && (
            <div className="edit-modal">
              <input
                type="text"
                defaultValue={editedTask.text}
                onChange={(e) => saveEditedTask(e.target.value)}
              />
              <button onClick={() => saveEditedTask(editedTask.text)}>Save</button>
            </div>
          )}
        </>
      ) : (
        <div className="login-form">
          <h1>Login</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default App;
