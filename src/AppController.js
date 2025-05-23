import Project from './Project';
import TodoItem from './TodoItem';

export default AppController = () => {
    const projects = {}
    const getProjects = () => {
        return projects;
    }
    const createProject = (name) => {
        const newProject = new Project(name);
        projects[crypto.randomUUID()] = newProject;
    }
    const deleteProject = (id) => {
        delete projects[id];
    }

    const createTodo = (projectId, data) => {
        const newTodo = new TodoItem({ data });
        projects[projectId].addTodos(newTodo);
    }
    const updateTodo = (projectId, todoId, updatedData = {}) => {
        for(let [key, value] of Object.entries(updatedData)){
            projects[projectId][todoId].setProperty(key, value);
        }
    }
    const deleteTodo = (projectId, todoId) => {
        projects[projectId].removeTodos(todoId);
    }
    const toggleTodo = (projectId, todoId) => {
        const checkedStatus = projects[projectId][todoId].getStatus();
        projects[projectId][todoId].setProperty('checked', !checkedStatus);
    }

    return {   
        getProjects,
        createTodo,
        updateTodo,
        deleteTodo,
        createProject,
        deleteProject,
        toggleTodo
    }
}