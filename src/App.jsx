import React, { useState } from "react";
import './App.css'; 

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { text, isCompleted: false };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const TodoItem = ({ todo, index, toggleComplete, deleteTodo }) => {
    return (
      <li className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
        {todo.text}
        <div>
          <button className="complete-btn" onClick={() => toggleComplete(index)}>
            {todo.isCompleted ? "Undo" : "Complete"}
          </button>
          <button className="delete-btn" onClick={() => deleteTodo(index)}>Delete</button>
        </div>
      </li>
    );
  };

  const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };

    return (
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Add a new task"
        />
        <button className="add-btn" type="submit">Add</button>
      </form>
    );
  };

  return (
    <div className="todo-container">
      <h1 className="title">To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            index={index}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
