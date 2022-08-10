enum TaskStatus {
    IN_PROGRESS,
    COMPLETED
}

type User = {
    name: string;
    email: string;
}

type SubTask = {
    id: number;
    details: string;
    dueDate: Date;
    status: TaskStatus
}

type Task = {
    id?: number;
    details: string;
    assignee: User;
    dueDate: Date;
    status: TaskStatus;
    subTasks?: [SubTask];
}

let inprogressTaskList: Task[] = [];
let completedTaskList: Task[] = [];

fetch("./test-data/users.json").then(resp => resp.json()).then(users => {
    let userList = users.userList as Array<User>;
    let dropDown = document.getElementById("assignee") as HTMLSelectElement;
    let defaultOption = document.createElement("option");
    defaultOption.text = "Select";
    defaultOption.value = "0";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    dropDown.add(defaultOption);
    for (let i = 0; i < userList.length; i++) {
        let option = document.createElement("option");
        option.text = userList[i].name;
        option.value = option.text
        dropDown.add(option);
    }
})


function createTaskRow(details: string, assignee: string, dueDate: Date) {
    let tr = document.createElement("tr") as HTMLTableRowElement;
    tr.insertCell().appendChild(document.createTextNode(details));
    tr.insertCell().appendChild(document.createTextNode(assignee));
    tr.insertCell().appendChild(document.createTextNode(dueDate.toDateString()));
    return tr;
}

function addToTable(task: Task) {
    let tbody, checkbox;
    let taskRow = createTaskRow(task.details, task.assignee.name, task.dueDate);
    if (task.status == TaskStatus.IN_PROGRESS) {
        tbody = document.getElementById('inprogress-table')?.getElementsByTagName('tbody')[0];

        checkbox = document.createElement("input")
        checkbox.type = "checkbox";
        checkbox.onchange = onCheckClick;
        taskRow.insertCell(3)
        taskRow.lastChild?.appendChild(checkbox)
    } else {
        tbody = document.getElementById('completed-table')?.getElementsByTagName('tbody')[0];
    }
    if (tbody) tbody.insertBefore(taskRow, tbody.firstChild);
}

function onSubmit() {
    let validatedInputs = validateAndReturnInputs()
    if (validatedInputs == null) {
        return;
    }
    let [taskDetails, assignee, dueDate] = validatedInputs;
    let task: Task = { details: taskDetails, assignee: { name: assignee, email: "" }, dueDate: new Date(dueDate), status: TaskStatus.IN_PROGRESS }
    inprogressTaskList.splice(0, 0, task)
    addToTable(task);
}

function onCheckClick(ev: Event) {
    let inprogressTableRow = (ev.target as HTMLInputElement).parentElement?.parentElement as HTMLTableRowElement;
    let idx = inprogressTableRow.rowIndex;
    let table = document.getElementById('inprogress-table') as HTMLTableElement;
    table.deleteRow(idx)
    let task = inprogressTaskList[idx-1];
    task.status = TaskStatus.COMPLETED;
    inprogressTaskList.splice(idx-1, 1);
    completedTaskList.splice(0, 0, task);
    addToTable(task);
}

function validateAndReturnInputs() {
    let taskDetails = document.getElementById("task_details") as HTMLInputElement;
    let assignee = document.getElementById("assignee") as HTMLInputElement;
    let dueDate = document.getElementById("due_date") as HTMLInputElement;

    let taskDetailsValue = taskDetails.value.toString().trim();
    let assigneeValue = assignee.value;
    let dueDateValue = dueDate.value.toString().trim();

    let isEmpty = false;

    if (dueDateValue === "") {
        document.getElementsByClassName("error-message-due-date")[0]?.classList.add("display-visible");
        isEmpty = true;
    } else {
        document.getElementsByClassName("error-message-due-date")[0]?.classList.remove("display-visible");
    }

    if (taskDetailsValue === "") {
        document.getElementsByClassName("error-message-task-details")[0]?.classList.add("display-visible");
        isEmpty = true;
    } else {
        document.getElementsByClassName("error-message-task-details")[0]?.classList.remove("display-visible");
    }

    if (assigneeValue === "0") {
        document.getElementsByClassName("error-message-assignee")[0]?.classList.add("display-visible");
        isEmpty = true;
    } else {
        document.getElementsByClassName("error-message-assignee")[0]?.classList.remove("display-visible");
    }

    if (isEmpty) return null;

    taskDetails.value = "";
    assignee.value = "0";
    dueDate.value = "";
    return [taskDetailsValue, assigneeValue, dueDateValue];
}