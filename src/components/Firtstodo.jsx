import { useState } from "react";
export const Firtstodo = () => {
  const [inputValue, setInputValue] = useState("");
  const [taskList, settasklist] = useState([]);
  const [filterStatus, setfilterStatus] = useState("All");

  const handleTaskAddition = (event) => {
    event.preventDefault();

    if (!inputValue) {
      alert("Please enter a task!");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: inputValue,
      isCompleted: false,
    };

    settasklist([newTask, ...taskList]);
    setInputValue("");
  };

  const clearComplete = () => {
    settasklist((prevTasks) => prevTasks.filter((task) => !task.isCompleted));
    const isCleared = window.confirm(
      "Are you sure you want to clear all completed tasks?"
    );
  };

  const completedCount = taskList.filter((task) => task.isCompleted).length;

  const deleteTask = (taskId) => {
    settasklist((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    settasklist((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const filteredTasks = taskList.filter((task) => {
    if (filterStatus === "Active") return !task.isCompleted;
    if (filterStatus === "Completed") return task.isCompleted;
    return true;
  });

  const handleTodoStatus = (status) => {
    setfilterStatus(status);
  };

  return (
    <div>
      <div className="container">
        <h2>To-Do list</h2>
        <form action="" className="add-1">
          <input
            type="text"
            className="input-1"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />

          <button className="add" onClick={handleTaskAddition} type="submit">
            Add
          </button>
        </form>
        <div className="button-1">
          <button className="button-2" onClick={() => handleTodoStatus("All")}>
            All
          </button>
          <button
            className="button-3"
            onClick={() => handleTodoStatus("Active")}
          >
            Active
          </button>
          <button
            className="button-4"
            onClick={() => handleTodoStatus("Completed")}
          >
            Completed
          </button>
        </div>

        {taskList.length === 0 && (
          <p className="p-1">No task yet. Add one above!</p>
        )}

        {filteredTasks.map((item, index) => (
          <div className="TaskInput">
            <input
              key={index}
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => toggleComplete(item.id)}
              className={item.isCompleted ? "chekBox" : "chekBox-2"}
            />
            <p
              className="p-4"
              style={{
                textDecoration: item.isCompleted ? "line-through" : "none",
              }}
            >
              {item.text}
            </p>
            <button
              className="DeleteButton"
              onClick={() => deleteTask(item.id)}
            >
              Delete
            </button>
          </div>
        ))}

        {taskList.length > 0 && (
          <div className="clearContainer">
            <p className="clearText">
              {completedCount} of {taskList.length} tasks completed
            </p>
            <button className="clearRed" onClick={() => clearComplete()}>
              Clear completed
            </button>
          </div>
        )}

        <div className="Power">
          <p className="p-2">Powered by </p>
          <p className="p-3">Pinecone academy</p>
        </div>
      </div>
    </div>
  );
};
