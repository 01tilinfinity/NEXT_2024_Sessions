import React, { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css';

const App = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = (todo) => {
        setTodos([...todos, todo]);
    };

    const updateTodo = (index, updatedTodo) => {
        const newTodos = todos.map((todo, i) => (i === index ? updatedTodo : todo));
        setTodos(newTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
    };

    return (
        <div className="app">
            <h1>[짭크드인]자기소개서를 작성하세요</h1>
            <TodoForm addTodo={addTodo} />
            <h2>자기소개서 게시판</h2>
            <TodoList todos={todos} updateTodo={updateTodo} deleteTodo={deleteTodo} />
        </div>
    );
};

export default App;
