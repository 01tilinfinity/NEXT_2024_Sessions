import React, { useState } from 'react';

const TodoItem = ({ index, todo, updateTodo, deleteTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTodo, setEditedTodo] = useState(todo);

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedTodo({
            ...editedTodo,
            [name]: value,
        });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateTodo(index, editedTodo);
        setIsEditing(false);
    };

    return (
        <div className="todo-item">
            {isEditing ? (
                <form className="edit-form" onSubmit={handleEditSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="이름"
                        value={editedTodo.name}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="mbti"
                        placeholder="MBTI"
                        value={editedTodo.mbti}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="age"
                        placeholder="나이"
                        value={editedTodo.age}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="hobby"
                        placeholder="취미"
                        value={editedTodo.hobby}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="major"
                        placeholder="전공"
                        value={editedTodo.major}
                        onChange={handleEditChange}
                        required
                    />
                    <input
                        type="text"
                        name="dream"
                        placeholder="장래희망"
                        value={editedTodo.dream}
                        onChange={handleEditChange}
                        required
                    />
                    <button type="submit">저장</button>
                </form>
            ) : (
                <div className="todo-details">
                    <span className="intro-text">📌저를 소개합니다</span>
                    <span>이름: {todo.name}</span>
                    <span>MBTI: {todo.mbti}</span>
                    <span>나이: {todo.age}</span>
                    <span>취미: {todo.hobby}</span>
                    <span>전공: {todo.major}</span>
                    <span>장래희망: {todo.dream}</span>
                    <button onClick={() => setIsEditing(true)}>수정</button>
                    <button onClick={() => deleteTodo(index)}>삭제</button>
                </div>
            )}
        </div>
    );
};

export default TodoItem;
