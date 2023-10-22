"use strict";
const btn = document.getElementById("btn");
const input = document.getElementById("todoinput");
const form = document.querySelector("form");
const todolist = document.querySelector("ul");
const readTodos = () => {
    const todosJSON = localStorage.getItem("todos");
    if (todosJSON === null)
        return [];
    return JSON.parse(todosJSON);
};
const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
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
const todos = readTodos();
todos.forEach((todo) => createTodo(todo));
const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
        text: input.value,
        completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
};
form.addEventListener("submit", handleSubmit);
