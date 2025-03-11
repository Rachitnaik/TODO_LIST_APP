import React, { useState, useEffect } from "react";
import { Container, Typography, Paper, List, Button, Stack, CircularProgress } from "@mui/material";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import { addTask, toggleTaskCompletion, updateTask, removeTask } from "./utils/taskUtils";
import axios from "axios";
import { FixedSizeList } from "react-window";



const API_URL = import.meta.env.VITE_API_URL //for vite for  we have to keep the prefix as vite

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(API_URL);
        let fetchedTasks = response.data;

        // Duplicate the tasks to create 10,000 tasks
        const largeDataset = Array.from({ length: 50 }, (_, i) =>
          fetchedTasks.map((task) => ({
            ...task,
            id: `${task.id}-${i}`, 
          }))
        ).flat();

        setTasks(largeDataset);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = (text) => setTasks((prev) => addTask(prev, text));
  const handleToggleTask = (index) => setTasks((prev) => toggleTaskCompletion(prev, index));
  const handleUpdateTask = (index, newText) => setTasks((prev) => updateTask(prev, index, newText));
  const handleRemoveTask = (index) => setTasks((prev) => removeTask(prev, index));
  const handleClearAll = () => {
    setTasks([]);
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ padding: 3, marginTop: 5, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h5" mb={2}>To-Do List 📝</Typography>
        <TaskInput addTask={handleAddTask} />


        {loading ? (
          <Stack alignItems="center" justifyContent="center" sx={{ height: "300px" }}>
            <CircularProgress />
            <Typography variant="body2" sx={{ mt: 2 }}>
              Loading tasks...
            </Typography>
          </Stack>
        ) : (
          <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
          <FixedSizeList
          height={200}  
          width="100%" 
          itemSize={50} 
          itemCount={tasks.length}
        >
          {({ index, style }) => (
            <div style={style}>
              <TaskItem
                key={tasks[index].id}
                task={tasks[index]}
                index={index}
                toggleTaskCompletion={handleToggleTask}
                updateTask={handleUpdateTask}
                removeTask={handleRemoveTask}
              />
            </div>
          )}
        </FixedSizeList>
          </div>
        )}

        {tasks.length > 0 && !loading && (
          <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleClearAll}>
              Clear All
            </Button>
          </Stack>
        )}
      </Paper>
    </Container>
  );
};

export default App;
