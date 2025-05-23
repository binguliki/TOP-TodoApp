export default class Project{
    constructor(name){
        this.name = name;
        this.todos = {};
    }

    getTodos(){
        return this.todos;
    }
    addTodo(todo){
        this.todos[crypto.randomUUID] = todo;
    }
    removeTodo(todoId){
        delete this.todos[todoId];
    }
    rename(newName){
        this.name = newName;
    }
}