export default class TodoItem{
    constructor(title, dueDate, priority, checked=false, description="", notes=""){
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = checked;
        this.description = description;
        this.notes = notes;
    }

    getProperty(property){
        return this[property];
    }
    setProperty(property, value){
        this[property] = value;
    }
}