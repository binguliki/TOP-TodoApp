import './home.css';
import createTodoForm from './todoForm';
import AppController from './AppController';

const controller = AppController();

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

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid', 'fa-trash', 'delete-project-btn');
  deleteIcon.onclick = (e) => {
    e.stopPropagation();
    controller.deleteProject(id);
    renderProjects();
  }
  project.append(deleteIcon);

  return project;
}

const sidebarToggle = () => {
  const btn = document.querySelector('.sidebar-btn');
  const sidebar = document.querySelector('.sidebar');
  btn.classList.toggle('active');
  sidebar.classList.toggle('active');
}
document.querySelectorAll('.sidebar-btn').forEach(icon => {
  icon.addEventListener('click', () => {
    sidebarToggle();
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
  const contentContainer = document.querySelector('.content');
  projectsList.innerHTML = '';
  contentContainer.innerHTML = '';

  const projects = controller.getProjects();
  Object.entries(projects).forEach(([id, project]) => {
    const projectElement = projectElementDiv(id, project.name);
    projectElement.onclick = () => {
      sidebarToggle();
      projectsList.querySelectorAll('.project.selected').forEach(p => {
        p.classList.remove('selected');
      });
      projectElement.classList.add('selected');
      contentContainer.textContent = project.name;
    }
    projectsList.append(projectElement);
  });
};

renderProjects()