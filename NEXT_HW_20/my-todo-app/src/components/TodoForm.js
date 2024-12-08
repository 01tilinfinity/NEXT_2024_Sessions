import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [todo, setTodo] = useState({
        name: '',
        mbti: '',
        age: '',
        hobby: '',
        major: '',
        dream: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo({
            ...todo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(todo);
        setTodo({
            name: '',
            mbti: '',
            age: '',
            hobby: '',
            major: '',
            dream: '',
        });
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>이름:</label>
                <input type="text" name="name" placeholder="이름" value={todo.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>MBTI:</label>
                <select name="mbti" value={todo.mbti} onChange={handleChange} required>
                    <option value="">선택하세요</option>
                    <option value="INTJ">INTJ</option>
                    <option value="INTP">INTP</option>
                    <option value="ENTJ">ENTJ</option>
                    <option value="ENTP">ENTP</option>
                    <option value="INFJ">INFJ</option>
                    <option value="INFP">INFP</option>
                    <option value="ENFJ">ENFJ</option>
                    <option value="ENFP">ENFP</option>
                    <option value="ISTJ">ISTJ</option>
                    <option value="ISFJ">ISFJ</option>
                    <option value="ESTJ">ESTJ</option>
                    <option value="ESFJ">ESFJ</option>
                    <option value="ISTP">ISTP</option>
                    <option value="ISFP">ISFP</option>
                    <option value="ESTP">ESTP</option>
                    <option value="ESFP">ESFP</option>
                    <option value="GOAT">그 무엇도 날 담을 수 없어</option>
                </select>
            </div>
            <div className="form-group">
                <label>나이:</label>
                <input type="text" name="age" placeholder="나이" value={todo.age} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label>취미:</label>
                <input
                    type="text"
                    name="hobby"
                    placeholder="취미"
                    value={todo.hobby}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>전공:</label>
                <input
                    type="text"
                    name="major"
                    placeholder="전공"
                    value={todo.major}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>장래희망:</label>
                <input
                    type="text"
                    name="dream"
                    placeholder="장래희망"
                    value={todo.dream}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit">추가</button>
        </form>
    );
};

export default TodoForm;
