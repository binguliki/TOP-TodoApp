// const controller = AppController();
// function todoViewController(projectId, todoId, data, updateTodo, deleteTodo, toggleTodo) {
//   const todoItem = document.createElement("div");
//   todoItem.className = "todo-item";
//   todoItem.dataset.id = id;

//   const leftSection = document.createElement("div");
//   leftSection.className = "left-section";

//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";
//   checkbox.id = `todo-check-${title}`;
//   checkbox.addEventListener('click', () => {
//     toggleTodo();
//   })

//   const label = document.createElement("label");
//   label.htmlFor = checkbox.id;
//   label.className = "todo-title";
//   label.textContent = title;

//   leftSection.appendChild(checkbox);
//   leftSection.appendChild(label);

//   const rightSection = document.createElement("div");
//   rightSection.className = "right-section";

//   const dueDateSpan = document.createElement("span");
//   dueDateSpan.className = "due-date";
//   dueDateSpan.textContent = dueDate;

//   const dropdownWrapper = document.createElement("div");
//   dropdownWrapper.className = "dropdown-wrapper";

//   const menuTrigger = document.createElement("i");
//   menuTrigger.className = "fa-solid fa-ellipsis-vertical icon menu-trigger";

//   const dropdown = document.createElement("div");
//   dropdown.className = "dropdown";

//   const editItem = document.createElement("div");
//   editItem.className = "dropdown-item";
//   editItem.textContent = "Edit";
//   editItem.addEventListener("click", () => {

//   });

//   const deleteItem = document.createElement("div");
//   deleteItem.className = "dropdown-item";
//   deleteItem.textContent = "Delete";
//   deleteItem.addEventListener("click", () => {
//     todoItem.remove();
//   });

//   dropdown.appendChild(editItem);
//   dropdown.appendChild(deleteItem);
//   dropdownWrapper.appendChild(menuTrigger);
//   dropdownWrapper.appendChild(dropdown);

//   rightSection.appendChild(dueDateSpan);
//   rightSection.appendChild(starIcon);
//   rightSection.appendChild(dropdownWrapper);

//   todoItem.appendChild(leftSection);
//   todoItem.appendChild(rightSection);

//   return todoItem;
// }
import './home.css';
import AppController from './AppController';

const controller = AppController();
function sidebarBtnToggle(e) {
  const sidebarBtn = document.querySelector('.sidebar-btn');
  const sidebar = document.querySelector('.sidebar');

  if (sidebarBtn.classList.contains('active')) {
    sidebarBtn.classList.remove('active');
    sidebar.classList.remove('active');
  } else {
    sidebarBtn.classList.add('active');
    sidebar.classList.add('active');
  }
}

function projectForm() {
  const form = document.createElement("form");
  form.className = 'project-form';

  const input = document.createElement("input");
  input.name = "name";
  input.placeholder = "Enter project name";
  input.required = true;

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Submit";

  form.appendChild(input);
  form.appendChild(button);
  return form;
}

const projectElementDiv = (id, name) => {
  const project = document.createElement('div');
  project.className = 'project';
  project.textContent = name;
  project.dataset.id = id;
  
  const projectIcon = document.createElement('i');
  projectIcon.classList.add('fa-solid', 'fa-bookmark');
  project.prepend(projectIcon);

  return project;
}

document.querySelectorAll('.sidebar-btn').forEach(icon => {
  icon.addEventListener('click', () => {
    const btn = document.querySelector('.sidebar-btn');
    const sidebar = document.querySelector('.sidebar');
    btn.classList.toggle('active');
    sidebar.classList.toggle('active');
  });
});

const addProjectBtn = document.querySelector('.add-project');
const projectContainer = document.querySelector('.projects');

addProjectBtn.addEventListener('click', () => {
  if (!projectContainer.querySelector('.project-form')) {
    const projectFormElement = projectForm();
    projectContainer.prepend(projectFormElement);
    projectFormElement.addEventListener('submit', () => {
      projectFormElement.remove();
      const name = projectFormElement.querySelector('input').value;
      controller.createProject(name);
      renderProjects();
    })
  }
});

const renderProjects = () => {
  const projectsList = projectContainer.querySelector('.projectsList');
  projectsList.innerHTML = '';

  const projects = controller.getProjects();
  Object.entries(projects).forEach(([id, project]) => {
    const projectElement = projectElementDiv(id, project.name);
    projectsList.append(projectElement);
  });
};
renderProjects()