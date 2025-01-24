import React, { useState } from "react";

const TaskInput = ({ onAddTask }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleAddTask = () => {
    onAddTask(task, priority);
    setTask("");
    setPriority("Medium");
  };

  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Enter task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskInput;
