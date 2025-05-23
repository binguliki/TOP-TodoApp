export default function createTodoForm() {
    const form = document.createElement("div");
    form.className = "todo-form";

    const createField = (labelText, inputType, placeholder) => {
        const fieldWrapper = document.createElement("div");
        fieldWrapper.className = "form-field";

        const label = document.createElement("label");
        label.textContent = labelText;
        label.htmlFor = labelText.toLowerCase().replace(/\W+/g, '');

        let input;
        if (inputType === "textarea") {
            input = document.createElement("textarea");
        } else {
            input = document.createElement("input");
            input.type = inputType;
        }

        input.placeholder = placeholder;
        input.id = label.htmlFor;

        fieldWrapper.appendChild(label);
        fieldWrapper.appendChild(input);
        return fieldWrapper;
    };

    form.appendChild(createField("Title:", "text", "What to do?"));
    form.appendChild(createField("Details (optional):", "textarea", "eg: I'm just gonna procrastinate, aren't I?"));
    form.appendChild(createField("Date:", "date", "dd / mm / yyyy"));

    const actions = document.createElement("div");
    actions.className = "form-actions";

    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.className = "add-btn";
    addButton.onclick = () => {
        const title = document.getElementById("title").value.trim();
        const details = document.getElementById("detailsoptional").value.trim();
        const date = document.getElementById("date").value;
        if (!title) return alert("Title is required!");
        console.log({ title, details, date });
    };

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.className = "cancel-btn";
    cancelButton.onclick = () => {
        document.getElementById("title").value = "";
        document.getElementById("detailsoptional").value = "";
        document.getElementById("date").value = "";
    };

    actions.appendChild(addButton);
    actions.appendChild(cancelButton);
    form.appendChild(actions);

    return form;
}
