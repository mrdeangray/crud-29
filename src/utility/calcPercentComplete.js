export const calcPercentComplete = (subtasks) => {
    const percent =
      (subtasks.filter((sub) => sub.completed).length / subtasks.length) * 100;
    return Math.round(percent);
  };