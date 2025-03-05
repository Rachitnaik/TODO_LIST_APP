import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, Button, Stack } from "@mui/material";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import {
  addTask,
  toggleTaskCompletion,
  updateTask,
  removeTask,
  clearAllTasks,
} from "./utils/taskUtils";

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : []; //for saving content even on refresh
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (text) => setTasks((prev) => addTask(prev, text));

  const handleToggleTask = (index) =>
    setTasks((prev) => toggleTaskCompletion(prev, index));

  const handleUpdateTask = (index, newText) =>
    setTasks((prev) => updateTask(prev, index, newText));

  const handleRemoveTask = (index) =>
    setTasks((prev) => removeTask(prev, index));

  const handleClearAll = () => setTasks(clearAllTasks());

  return (
    <Container maxWidth="sm">
      <Paper
        sx={{ padding: 3, marginTop: 5, textAlign: "center", boxShadow: 3 }}
      >
        <Typography variant="h5" mb={2}>
          To-Do List 📝
        </Typography>

        <TaskInput addTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          toggleTaskCompletion={handleToggleTask}
          updateTask={handleUpdateTask}
          removeTask={handleRemoveTask}
        />
      </Paper>
      {tasks.length > 0 && (
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <Button variant="contained" color="error" onClick={handleClearAll}>
            Clear All
          </Button>
        </Stack>
      )}
    </Container>
  );
};

export default App;
