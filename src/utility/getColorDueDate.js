export const getColorDueDate = (dueDateTime) => {
    dueDateTime = new Date(dueDateTime);
    let threeDaysBeforeDueDate = new Date(dueDateTime);
    threeDaysBeforeDueDate.setDate(threeDaysBeforeDueDate.getDate() - 3);
    threeDaysBeforeDueDate = threeDaysBeforeDueDate.setHours(0, 0, 0, 0);
    const dueDate = dueDateTime.setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);


    let color = "";
    if (today >= dueDate) {
      color = "red";
    } else if (threeDaysBeforeDueDate <= today && today < dueDate) {
      color = "orange";
    } else {
      color = "blue";
    }

    return color;
  };
