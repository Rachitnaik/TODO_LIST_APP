
// Function to add a new task
export const addTask = (tasks, text) => {

  return [...tasks, { title: text, completed: false }];

};

// Function to toggle a task's completion status
export const toggleTaskCompletion = (tasks, index) => {
  return tasks.map((task, i) => {
    if (i === index) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
};

// Function to update the text of a task
export const updateTask = (tasks, index, newText) => {
  return tasks.map((task, i) => {
    if (i === index) {
      return { ...task, title: newText };
    }
    return task;
  });
};

// Function to remove a task from the list
export const removeTask = (tasks, index) => {
  return tasks.filter((_, i) => i !== index); 
};

// Function to clear all tasks
export const clearAllTasks = () => {
  return []; 
};

