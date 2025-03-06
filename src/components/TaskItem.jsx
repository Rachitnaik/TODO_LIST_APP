import React, { useState } from "react";
import { ListItem, ListItemText, IconButton, Checkbox, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

const TaskItem = ({ task, index, toggleTaskCompletion, updateTask, removeTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task?.title); 

  const handleSave = () => {
    if (editedText.trim()) {
      updateTask(index, editedText.trim());
      setIsEditing(false);
    }
  };

  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <Checkbox checked={task.completed} onChange={() => toggleTaskCompletion(index)} />

      {isEditing ? (
        <TextField value={editedText} onChange={(e) => setEditedText(e.target.value)} size="small" sx={{ flex: 1 }} />
      ) : (
        <ListItemText primary={task.title} sx={{ textDecoration: task.completed ? "line-through" : "none", flex: 1 }} />
      )}

      <div>
        {isEditing ? (
          <IconButton onClick={handleSave} color="primary">
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => setIsEditing(true)} color="info">
            <EditIcon />
          </IconButton>
        )}
        <IconButton onClick={() => removeTask(index)} color="error">
          <DeleteIcon />
        </IconButton>
      </div>
    </ListItem>
  );
};

export default TaskItem;
