import React from "react";

const TaskList = ({ tasks, onDeleteTask, onToggleCompletion, onEditTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks added yet!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className={`task-item ${task.completed ? "completed" : ""}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggleCompletion(task.id)}
            />
            <span>{`${task.text} (${task.priority})`}</span>
            <button onClick={() => onEditTask(task)}>Edit</button>
            <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
