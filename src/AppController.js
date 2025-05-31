import Project from './Project';
import TodoItem from './TodoItem';

const AppController = () => {
    const STORAGE_KEY = 'todoApp_projects';
    const projects = {};

    const getProjects = () => {
        return projects;
    };

    const createProject = (name) => {
        const newProject = new Project(name);
        projects[crypto.randomUUID()] = newProject;
    };

    const deleteProject = (id) => {
        delete projects[id];
    };

    const createTodo = (projectId, data) => {
        const newTodo = new TodoItem({ ...data });
        projects[projectId].addTodo(newTodo);
    };

    const updateTodo = (projectId, todoId, updatedData = {}) => {
        const todo = projects[projectId].getTodo(todoId);
        if (!todo) return;
        for (let [key, value] of Object.entries(updatedData)) {
            todo.setProperty(key, value);
        }
    };

    const deleteTodo = (projectId, todoId) => {
        projects[projectId].removeTodo(todoId);
    };

    const toggleTodo = (projectId, todoId) => {
        const todo = projects[projectId].getTodo(todoId);
        if (!todo) return;
        const checkedStatus = todo.getProperty('checked');
        todo.setProperty('checked', !checkedStatus);
    };

    const getTodos = (projectId) => {
        return projects[projectId]?.getTodos() || {};
    };
    const saveToStorage = () => {
        const dataToSave = {};
        Object.entries(projects).forEach(([projectId, project]) => {
            dataToSave[projectId] = {
                name: project.name,
                todos: {}
            };
            Object.entries(project.getTodos()).forEach(([todoId, todo]) => {
                dataToSave[projectId].todos[todoId] = {
                    title: todo.getProperty('title'),
                    dueDate: todo.getProperty('dueDate'),
                    priority: todo.getProperty('priority'),
                    checked: todo.getProperty('checked'),
                    description: todo.getProperty('description'),
                    notes: todo.getProperty('notes')
                };
            });
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
    };
    const loadFromStorage = () => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (!savedData) {
            return false;
        }
        const parsedData = JSON.parse(savedData);
        Object.entries(parsedData).forEach(([projectId, projectData]) => {
            const project = new Project(projectData.name);

            Object.entries(projectData.todos).forEach(([todoId, todoData]) => {
                const todo = new TodoItem({
                    title: todoData.title,
                    dueDate: todoData.dueDate,
                    priority: todoData.priority,
                    checked: todoData.checked,
                    description: todoData.description,
                    notes: todoData.notes
                });
                project.todos[todoId] = todo;
            });

            projects[projectId] = project;
        });
        return true;
    };
    return {
        getProjects,
        createProject,
        deleteProject,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        getTodos,
        saveToStorage,
        loadFromStorage
    };
};

export default AppController;