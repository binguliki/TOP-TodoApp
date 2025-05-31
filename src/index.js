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

const createTaskContainer = (id) => {
  const container = document.createElement('div');
  container.className = 'task-container';

  const button = document.createElement('button');
  button.className = 'add-task';

  const icon = document.createElement('i');
  icon.classList.add('fa-solid', 'fa-plus');

  button.appendChild(icon);
  button.appendChild(document.createTextNode(' Add task'));

  const todoLists = document.createElement('div');
  todoLists.className = 'todosList';

  button.onclick = () => {
    const { dialog, inputs } = createTodoForm('Create new task');
    container.appendChild(dialog);
    const dialogForm = dialog.querySelector('form');

    dialogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      dialog.close();

      const data = {
        title: inputs.title.value,
        dueDate: inputs.dueDate.value,
        priority: inputs.priority.value,
        description: inputs.description.value,
        notes: inputs.notes.value,
      };

      controller.createTodo(id, data);
      renderTodos(id);
      dialog.remove();
    });
    dialog.showModal();
  }
  container.appendChild(button);
  container.append(todoLists);

  return container;
};

function createTodoCard(todo, todoId, projectId) {
  const card = document.createElement("div");
  card.dataset.id = todoId;
  card.className = "todo-card";
  const priority = todo.getProperty('priority');
  if (priority === 'High') {
    card.style.borderLeft = '0.25rem solid #dc3545';
  } else if (priority === 'Medium') {
    card.style.borderLeft = '0.25rem solid #ffc107';
  } else {
    card.style.borderLeft = '0.25rem solid #28a745';
  }

  const left = document.createElement("div");
  left.className = "todo-left";

  const check = document.createElement("i");
  check.className = "fa-regular fa-circle-check todo-icon";
  check.style.color = todo.getProperty('checked') ? '#22c55e' : '#666';

  check.onclick = (e) => {
    e.stopPropagation();
    controller.toggleTodo(projectId, todoId);
    text.style.textDecoration = todo.getProperty('checked') ? 'line-through' : 'none';
    check.style.color = todo.getProperty('checked') ? '#22c55e' : '#666';
  }

  const text = document.createElement("span");
  text.className = "todo-title";
  text.textContent = todo.getProperty('title');

  left.appendChild(check);
  left.appendChild(text);

  const actions = document.createElement("div");
  actions.className = "todo-actions";

  const edit = document.createElement("i");
  edit.className = "fa-solid fa-pen action-icon";
  const taskContainer = document.querySelector('.task-container');

  edit.onclick = (e) => {
    e.stopPropagation();
    const { dialog, inputs } = createTodoForm('Edit Task', todo);
    taskContainer.appendChild(dialog);
    const dialogForm = dialog.querySelector('form');

    dialogForm.addEventListener("submit", (e) => {
      e.preventDefault();
      dialog.close();

      const data = {
        title: inputs.title.value,
        dueDate: inputs.dueDate.value,
        priority: inputs.priority.value,
        description: inputs.description.value,
        notes: inputs.notes.value,
      };
      
      controller.updateTodo(projectId, todoId, data);
      renderTodos(projectId);
      dialog.remove();
    });
    dialog.showModal();
  }

  const del = document.createElement("i");
  del.className = "fa-solid fa-trash action-icon";
  del.onclick = (e) => {
    e.stopPropagation();
    controller.deleteTodo(projectId, todoId);
    card.remove();
  };

  actions.appendChild(edit);
  actions.appendChild(del);

  card.appendChild(left);
  card.appendChild(actions);

  card.onclick = () => {
    openTodoDialog(todo, todoId, projectId);
  };

  card.style.cursor = 'pointer';

  return card;
}

function openTodoDialog(todo, todoId, projectId) {
  const taskContainer = document.querySelector('.task-container');
  const overlay = document.createElement("div");
  overlay.className = "dialog-overlay";
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  const dialog = document.createElement("div");
  dialog.className = "todo-dialog";
  dialog.style.cssText = `
    background: white;
    border-radius: 8px;
    padding: 24px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    position: relative;
  `;

  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.cssText = `
    position: absolute;
    top: 12px;
    right: 16px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: background-color 0.2s;
  `;
  closeBtn.onmouseover = () => closeBtn.style.backgroundColor = '#f0f0f0';
  closeBtn.onmouseout = () => closeBtn.style.backgroundColor = 'transparent';

  const content = document.createElement("div");
  content.innerHTML = `
    <h2 style="margin-top: 0; margin-bottom: 20px; color: #333; padding-right: 40px;">
      ${todo.getProperty('title')}
    </h2>
    <div style="display: flex; flex-direction: column; gap: 16px;">
      <div>
        <strong style="color: #555;">Status:</strong>
        <span style="margin-left: 8px; padding: 4px 8px; border-radius: 4px; font-size: 14px; ${
          todo.getProperty('checked') 
            ? 'background-color: #d4edda; color: #155724;' 
            : 'background-color: #fff3cd; color: #856404;'
        }">
          ${todo.getProperty('checked') ? 'Completed' : 'Pending'}
        </span>
      </div>
      <div>
        <strong style="color: #555;">Priority:</strong>
        <span style="margin-left: 8px; padding: 4px 8px; border-radius: 4px; font-size: 14px; ${
          todo.getProperty('priority') === 'High' 
            ? 'background-color: #f8d7da; color: #721c24;'
            : todo.getProperty('priority') === 'Medium'
            ? 'background-color: #fff3cd; color: #856404;'
            : 'background-color: #d4edda; color: #155724;'
        }">
          ${todo.getProperty('priority')}
        </span>
      </div>
      ${todo.getProperty('description') ? `
        <div>
          <strong style="color: #555;">Description:</strong>
          <p style="margin: 8px 0 0 0; color: #666; line-height: 1.5;">
            ${todo.getProperty('description')}
          </p>
        </div>
      ` : ''}
      ${todo.getProperty('dueDate') ? `
        <div>
          <strong style="color: #555;">Due Date:</strong>
          <span style="margin-left: 8px; color: #666;">
            ${new Date(todo.getProperty('dueDate')).toLocaleDateString()}
          </span>
        </div>
      ` : ''}
      ${todo.getProperty('notes') ? `
        <div>
          <strong style="color: #555;">Notes:</strong>
          <p style="margin: 8px 0 0 0; color: #666; line-height: 1.5;">
            ${todo.getProperty('notes')}
          </p>
        </div>
      ` : ''}
      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee;">
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #999;">
          <span>Project: ${projectId}</span>
          <span>ID: ${todoId}</span>
        </div>
      </div>
    </div>
  `;

  const closeDialog = () => {
    taskContainer.removeChild(overlay);
    taskContainer.removeEventListener('keydown', handleEscape);
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      closeDialog();
    }
  };

  closeBtn.onclick = closeDialog;
  overlay.onclick = (e) => {
    if (e.target === overlay) {
      closeDialog();
    }
  };
  taskContainer.addEventListener('keydown', handleEscape);

  dialog.appendChild(closeBtn);
  dialog.appendChild(content);
  overlay.appendChild(dialog);
  taskContainer.appendChild(overlay);
}

const renderTodos = (projectId) => {
  const todos = controller.getTodos(projectId);
  const todoLists = document.querySelector('.todosList');
  todoLists.innerHTML = '';

  Object.entries(todos).forEach(([todoId, todo]) => {
    const todoElement = createTodoCard(todo, todoId, projectId);
    todoLists.append(todoElement);
  });
}

const renderProjects = () => {
  const projectsList = projectContainer.querySelector('.projectsList');
  const contentContainer = document.querySelector('.content');
  projectsList.innerHTML = '';
  contentContainer.innerHTML = '';

  const projects = controller.getProjects();
  Object.entries(projects).forEach(([id, project]) => {
    const projectElement = projectElementDiv(id, project.name);
    projectElement.onclick = () => {
      contentContainer.innerHTML = ''
      sidebarToggle();
      projectsList.querySelectorAll('.project.selected').forEach(p => {
        p.classList.remove('selected');
      });
      projectElement.classList.add('selected');
      const taskContainer = createTaskContainer(id);
      const heading = document.createElement('h2');
      heading.textContent = project.name;
      taskContainer.prepend(heading);
      contentContainer.append(taskContainer);
      renderTodos(id);
    }
    projectsList.append(projectElement);
  });
};

window.onload = () => {
  controller.loadFromStorage()
  renderProjects();
};
window.onbeforeunload = () => controller.saveToStorage();
document.onvisibilitychange = () => controller.saveToStorage();