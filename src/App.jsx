import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, List, Button, Stack, Pagination } from "@mui/material";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import { addTask, toggleTaskCompletion, updateTask, removeTask, clearAllTasks } from "./utils/taskUtils";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL //for vite for  we have to keep the prefix as vite

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const tasksPerPage = 10;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = (text) => setTasks((prev) => addTask(prev, text));
  const handleToggleTask = (index) => setTasks((prev) => toggleTaskCompletion(prev, index));
  const handleUpdateTask = (index, newText) => setTasks((prev) => updateTask(prev, index, newText));
  const handleRemoveTask = (index) => setTasks((prev) => removeTask(prev, index));
  const handleClearAll = () => setTasks(clearAllTasks());

  // Paginated tasks
  const startIndex = (page - 1) * tasksPerPage;
  const paginatedTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 3, marginTop: 5, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h5" mb={2}>To-Do List 📝</Typography>
        <TaskInput addTask={handleAddTask} />

        <List>
          {paginatedTasks.map((task, index) => (
            
            <TaskItem
              key={index}
              task={task}
              index={startIndex + index}
              toggleTaskCompletion={handleToggleTask}
              updateTask={handleUpdateTask}
              removeTask={handleRemoveTask}
            />
          ))}
        </List>

        {/* Pagination Controls */}
        <Pagination
          count={Math.ceil(tasks.length / tasksPerPage)}
          page={page}
          onChange={(event, value) => setPage(value)}
          sx={{ mt: 2, display: "flex", justifyContent: "center" }}
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
