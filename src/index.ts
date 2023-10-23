interface Todo {
  text: string;
  completed: boolean;
}

const addBtn = document.getElementById("add-btn")! as HTMLButtonElement;
const deleteBtn = document.getElementById("delete-btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const select = document.getElementById("day")! as HTMLSelectElement;
const errorText = document.getElementById(
  "error-text"
)! as HTMLParagraphElement;
const form = document.querySelector("form")!;
const todolist = document.querySelector("ul")!;
const todayPar = document.getElementById("today")!;

const currentDay: number = new Date().getDay();
select.value = currentDay.toString();
let selectedDay: number = currentDay;
todayPar.textContent = `Today is ${new Date().toLocaleDateString("en-US", {
  weekday: "long",
})}. Make your plans now!`;

select.addEventListener("change", function () {
  selectedDay = parseInt(select.value);
  todolist.innerHTML = "";
  todos = readTodos();
  todos.forEach((todo) => createTodo(todo));
});

deleteBtn.addEventListener("click", function (e) {
  e.preventDefault();
  deleteTodos();
});

const readTodos = (): Todo[] => {
  const todosJSON = localStorage.getItem(selectedDay?.toString());
  if (todosJSON === null) return [];
  return JSON.parse(todosJSON);
};

const saveTodos = () => {
  localStorage.setItem(selectedDay.toString(), JSON.stringify(todos));
};

const deleteTodos = () => {
  localStorage.removeItem(selectedDay.toString());
};

const createTodo = (todo: Todo) => {
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

let todos: Todo[] = readTodos();

todos.forEach((todo) => createTodo(todo));

const handleSubmit = (e: SubmitEvent) => {
  e.preventDefault();
  if (input.value === "") {
    errorText.textContent = "Todo cannot be empty!";
    return null;
  }

  const newTodo: Todo = {
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
