/* Dom 요소 담아두기 */
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const submitBtn = document.querySelector('.submitBtn');

document.addEventListener('DOMContentLoaded', loadTodos);

function saveTodos(todos) {
    window.localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    todos.forEach((todo) => {
        addTodoToDOM(todo);
    });
}

function addTodoToDOM(todo) {
    const li = document.createElement('li');
    li.textContent = todo;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.addEventListener('click', () => deleteTodo(todo));
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTodo = document.getElementById('content').value;
    if (newTodo) {
        addTodoToDOM(newTodo);
        const todos = JSON.parse(window.localStorage.getItem('todos')) || [];
        todos.push(newTodo);
        saveTodos(todos);
        todoForm.reset();
    }
});

function deleteTodo(todo) {
    let todos = JSON.parse(window.localStorage.getItem('todos')) || [];
    todos = todos.filter((t) => t !== todo);
    saveTodos(todos);
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';
    loadTodos();
}

renderTodos();
