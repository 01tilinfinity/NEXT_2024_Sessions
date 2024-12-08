import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, updateTodo, deleteTodo }) => {
    return (
        <div className="todo-list">
            {todos.map((todo, index) => (
                <TodoItem key={index} index={index} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            ))}
        </div>
    );
};

export default TodoList;
