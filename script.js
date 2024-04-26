const taskArr = getTask();

const list = document.getElementById("list");
const form = document.getElementById("task-form");
const input = document.getElementById("task-title");

taskArr.forEach(addListItem);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value == "" || input.value == null) return;

  const task = {
    id: crypto.randomUUID(),
    title: input.value,
    completed: false,
  };

  taskArr.push(task);
  addListItem(task);
  input.value = "";
  alert("Todo created successfully");
});

function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const upbutton = document.createElement("button");
  const delbutton = document.createElement("button");
  checkbox.type = "checkbox";
  upbutton.type = "button";
  delbutton.type = "button";
  upbutton.textContent = "Update";
  delbutton.textContent = "Delete";

  checkbox.addEventListener("change", () => {
    let todos = getTask();
    let todo = todos.find((todo) => todo.id === task.id);
    console.log(todo);
    if (todo) {
      todo.completed = checkbox.checked;
      localStorage.setItem("Tasks", JSON.stringify(todos));
    }
  });
  upbutton.addEventListener("click", () => {
    updateTodo(task.id, input.value);
  });
  delbutton.addEventListener("click", () => {
    deleteTodo(task.id);
  });

  label.append(checkbox, task.title, upbutton, delbutton);
  item.append(label);
  list.append(item);
  saveTask();
}

function saveTask() {
  localStorage.setItem("Tasks", JSON.stringify(taskArr));
}
function getTask() {
  const taskJson = localStorage.getItem("Tasks");
  if (taskJson == null) return [];

  return JSON.parse(taskJson);
}

function updateTodo(id, newTitle) {
  console.log("Inside update Todo function");
  let todos = getTask();
  let todo = todos.find((todo) => todo.id === id);
  console.log(todo);
  if (todo) {
    todo.title = newTitle;
    localStorage.setItem("Tasks", JSON.stringify(todos));
  }
}

function deleteTodo(id) {
  console.log("Inside delete Todo function");
  let todos = getTask();
  console.log(todos);
  todos = todos.filter((todo) => todo.id !== id);
  localStorage.setItem("Tasks", JSON.stringify(todos));
}
