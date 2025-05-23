import AppController from "./AppController";

const controller = AppController();
function todoViewController(projectId, todoId, data, updateTodo, deleteTodo, toggleTodo) {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-item";
  todoItem.dataset.id = id;

  const leftSection = document.createElement("div");
  leftSection.className = "left-section";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `todo-check-${title}`;
  checkbox.addEventListener('click', () => {
    toggleTodo();
  })

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.className = "todo-title";
  label.textContent = title;

  leftSection.appendChild(checkbox);
  leftSection.appendChild(label);

  const rightSection = document.createElement("div");
  rightSection.className = "right-section";

  const dueDateSpan = document.createElement("span");
  dueDateSpan.className = "due-date";
  dueDateSpan.textContent = dueDate;

  const dropdownWrapper = document.createElement("div");
  dropdownWrapper.className = "dropdown-wrapper";

  const menuTrigger = document.createElement("i");
  menuTrigger.className = "fa-solid fa-ellipsis-vertical icon menu-trigger";

  const dropdown = document.createElement("div");
  dropdown.className = "dropdown";

  const editItem = document.createElement("div");
  editItem.className = "dropdown-item";
  editItem.textContent = "Edit";
  editItem.addEventListener("click", () => {
    
  });

  const deleteItem = document.createElement("div");
  deleteItem.className = "dropdown-item";
  deleteItem.textContent = "Delete";
  deleteItem.addEventListener("click", () => {
    todoItem.remove();
  });

  dropdown.appendChild(editItem);
  dropdown.appendChild(deleteItem);
  dropdownWrapper.appendChild(menuTrigger);
  dropdownWrapper.appendChild(dropdown);

  rightSection.appendChild(dueDateSpan);
  rightSection.appendChild(starIcon);
  rightSection.appendChild(dropdownWrapper);

  todoItem.appendChild(leftSection);
  todoItem.appendChild(rightSection);

  return todoItem;
}
