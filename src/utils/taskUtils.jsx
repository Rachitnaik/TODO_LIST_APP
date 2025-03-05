export const addTask = (tasks, text) => {
    return [...tasks, { text, completed: false }];
  };
  
  export const toggleTaskCompletion = (tasks, index) => {
    return tasks.map((task, i) => {
      if (i === index) {
        return { text: task.text, completed: !task.completed };
      }
      return task;
    });
  };
  
  export const updateTask = (tasks, index, newText) => {
    return tasks.map((task, i) => {
      if (i === index) {
        return { text: newText, completed: task.completed };
      }
      return task;
    });
  };
  
  export const removeTask = (prev, index) => {
    return prev.filter((_, taskIndex) => taskIndex !== index);
  };
  
  export const clearAllTasks = () => {
    return [];
  };
  