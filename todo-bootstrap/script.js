let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");


window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === "") return;

  renderTask(taskText, false);
  saveTasks();
  taskInput.value = "";
}

function renderTask(text, completed) {
  let li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between align-items-center";
  if (completed) li.classList.add("completed");

  li.innerHTML = `
    <span onclick="toggleComplete(this)" style="cursor:pointer;">${text}</span>
    <button class="btn btn-sm btn-danger" onclick="deleteTask(this)">Delete</button>
  `;

  taskList.appendChild(li);
}

function toggleComplete(span) {
  span.classList.toggle("completed");
  span.parentElement.classList.toggle("completed");
  saveTasks();
}

function deleteTask(btn) {
  btn.parentElement.remove();
  saveTasks();
}

function saveTasks() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    let text = li.querySelector("span").innerText;
    let completed = li.classList.contains("completed");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
