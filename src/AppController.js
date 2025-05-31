import Project from './Project';
import TodoItem from './TodoItem';

const AppController = () => {
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

    return {
        getProjects,
        createProject,
        deleteProject,
        createTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        getTodos
    };
};

export default AppController;