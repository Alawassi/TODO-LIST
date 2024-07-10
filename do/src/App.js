import React, { useState, useEffect } from 'react';
import './App.css';

function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Einkaufen gehen', completed: false },
    { id: 2, text: 'Hausaufgaben machen', completed: false },
    { id: 3, text: 'Auto waschen', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [allCompleted, setAllCompleted] = useState(false);

  useEffect(() => {
    setAllCompleted(todos.every(todo => todo.completed));
  }, [todos]);

  const toggleCompletion = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className={`todo-list ${allCompleted ? 'all-completed' : ''}`}>
      <h1>Zeigarnik Effekt - To-Do Liste</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Neue Aufgabe hinzufügen"
        />
        <button onClick={addTodo}>Hinzufügen</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item-container">
            <span
              className={`todo-item ${todo.completed ? 'completed' : 'incomplete'}`}
              onClick={() => toggleCompletion(todo.id)}
            >
              {todo.text}
            </span>
            <button className="delete-button" onClick={() => deleteTodo(todo.id)}>Löschen</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
