import React from "react";
import { List } from "@mui/material";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTaskCompletion, updateTask, removeTask }) => {
  return (
    <List>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          toggleTaskCompletion={toggleTaskCompletion}
          updateTask={updateTask}
          removeTask={removeTask}
        />
      ))}
    </List>
  );
};

export default TaskList;
