"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const select = document.getElementById("day");
const errorText = document.getElementById("error-text");
const form = document.querySelector("form");
const todolist = document.querySelector("ul");
const currentDay = new Date().getDay();
select.value = currentDay.toString();
let selectedDay = currentDay;
select.addEventListener("change", function () {
    selectedDay = parseInt(select.value);
    todolist.innerHTML = "";
    todos = readTodos();
    todos.forEach((todo) => createTodo(todo));
});
const readTodos = () => {
    const todosJSON = localStorage.getItem(selectedDay === null || selectedDay === void 0 ? void 0 : selectedDay.toString());
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
};
const saveTodos = () => {
    localStorage.setItem(selectedDay.toString(), JSON.stringify(todos));
};
const createTodo = (todo) => {
    const newLi = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.style.marginLeft = "8px";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", function () {
        todo.completed = checkbox.checked;
        saveTodos();
    });
    newLi.append(todo.text);
    newLi.append(checkbox);
    todolist.append(newLi);
};
let todos = readTodos();
todos.forEach((todo) => createTodo(todo));
const handleSubmit = (e) => {
    e.preventDefault();
    if (input.value === "") {
        errorText.textContent = "Todo cannot be empty!";
        return null;
    }
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
    errorText.textContent = "";
};
form.addEventListener("submit", handleSubmit);
