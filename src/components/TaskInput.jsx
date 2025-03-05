import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, mt: 2 }}
    >
      <TextField
        label="Enter a task"
        variant="outlined"
        fullWidth
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button type="submit" variant="contained">
        Add
      </Button>
    </Box>
  );
};

export default TaskInput;
