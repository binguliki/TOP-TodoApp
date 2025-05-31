export default function createTodoForm(heading, todo = null) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("todo-dialog");

    const form = document.createElement("form");
    form.method = "dialog";
    form.classList.add("todo-form");

    const head = document.createElement('h2');
    head.textContent = heading;
    head.style.margin = '0';

    const title = document.createElement("input");
    title.type = "text";
    title.name = "title";
    title.placeholder = "Title";
    title.required = true;
    title.classList.add("todo-input");
    title.value = todo? todo.getProperty('title') : '';

    const dueDate = document.createElement("input");
    dueDate.type = "date";
    dueDate.name = "dueDate";
    dueDate.classList.add("todo-input");
    dueDate.value = todo? todo.getProperty('dueDate'): '';

    const priority = document.createElement("select");
    priority.name = "priority";
    priority.classList.add("todo-select");
    ["Low", "Medium", "High"].forEach(level => {
        const option = document.createElement("option");
        option.value = level;
        option.text = level;
        priority.appendChild(option);
    });
    priority.value = todo? todo.getProperty('priority') : 'Medium';

    const description = document.createElement("textarea");
    description.name = "description";
    description.placeholder = "Description";
    description.classList.add("todo-textarea");
    description.value = todo? todo.getProperty('description'): '';

    const notes = document.createElement("textarea");
    notes.name = "notes";
    notes.placeholder = "Notes";
    notes.classList.add("todo-textarea");
    notes.value = todo? todo.getProperty('notes'): '';

    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Submit";
    submit.classList.add("todo-submit");

    const cancel = document.createElement("button");
    cancel.type = "button";
    cancel.textContent = "Cancel";
    cancel.classList.add("todo-cancel");
    cancel.addEventListener("click", () => dialog.close());

    form.append(head, document.createElement("br"));
    form.append(title, document.createElement("br"));
    form.append(dueDate, document.createElement("br"));
    form.append(priority, document.createElement("br"));
    form.append(description, document.createElement("br"));
    form.append(notes, document.createElement("br"));
    form.append(submit, cancel);

    dialog.appendChild(form);

    return {
        dialog,
        inputs: {
            title,
            dueDate,
            priority,
            description,
            notes
        }
    };
}
