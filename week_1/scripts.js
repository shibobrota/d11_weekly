var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["IN_PROGRESS"] = 0] = "IN_PROGRESS";
    TaskStatus[TaskStatus["COMPLETED"] = 1] = "COMPLETED";
})(TaskStatus || (TaskStatus = {}));
var inprogressTaskList = [];
var completedTaskList = [];
fetch("./test-data/users.json").then(function (resp) { return resp.json(); }).then(function (users) {
    var userList = users.userList;
    var dropDown = document.getElementById("assignee");
    var defaultOption = document.createElement("option");
    defaultOption.text = "Select";
    defaultOption.value = "0";
    defaultOption.selected = true;
    defaultOption.disabled = true;
    dropDown.add(defaultOption);
    for (var i = 0; i < userList.length; i++) {
        var option = document.createElement("option");
        option.text = userList[i].name;
        option.value = option.text;
        dropDown.add(option);
    }
});
function createTaskRow(details, assignee, dueDate) {
    var tr = document.createElement("tr");
    tr.insertCell().appendChild(document.createTextNode(details));
    tr.insertCell().appendChild(document.createTextNode(assignee));
    tr.insertCell().appendChild(document.createTextNode(dueDate.toDateString()));
    return tr;
}
function addToTable(task) {
    var tbody, checkbox;
    var taskRow = createTaskRow(task.details, task.assignee.name, task.dueDate);
    if (task.status == TaskStatus.IN_PROGRESS) {
        tbody = document.getElementById('inprogress-table').getElementsByTagName('tbody')[0];
        checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = onCheckClick;
        taskRow.insertCell(3);
        taskRow.lastChild.appendChild(checkbox);
    }
    else {
        tbody = document.getElementById('completed-table').getElementsByTagName('tbody')[0];
    }
    tbody.insertBefore(taskRow, tbody.firstChild);
}
function onSubmit() {
    var validatedInputs = validateAndReturnInputs();
    if (validatedInputs == null) {
        return;
    }
    var taskDetails = validatedInputs[0], assignee = validatedInputs[1], dueDate = validatedInputs[2];
    var task = { details: taskDetails, assignee: { name: assignee, email: "" }, dueDate: new Date(dueDate), status: TaskStatus.IN_PROGRESS };
    inprogressTaskList.splice(0, 0, task);
    addToTable(task);
}
function onCheckClick(ev) {
    console.log(typeof ev);
    var inprogressTableRow = ev.target.parentElement.parentElement;
    var idx = inprogressTableRow.rowIndex;
    var table = document.getElementById('inprogress-table');
    table.deleteRow(idx);
    var task = inprogressTaskList[idx - 1];
    task.status = TaskStatus.COMPLETED;
    inprogressTaskList.splice(idx - 1, 1);
    completedTaskList.splice(0, 0, task);
    addToTable(task);
}
function validateAndReturnInputs() {
    var _a, _b, _c, _d, _e, _f;
    var taskDetails = document.getElementById("task_details");
    var assignee = document.getElementById("assignee");
    var dueDate = document.getElementById("due_date");
    var taskDetailsValue = taskDetails.value.toString().trim();
    var assigneeValue = assignee.value;
    var dueDateValue = dueDate.value.toString().trim();
    var isEmpty = false;
    if (dueDateValue === "") {
        (_a = document.getElementsByClassName("error-message-due-date")[0]) === null || _a === void 0 ? void 0 : _a.classList.add("display-visible");
        isEmpty = true;
    }
    else {
        (_b = document.getElementsByClassName("error-message-due-date")[0]) === null || _b === void 0 ? void 0 : _b.classList.remove("display-visible");
    }
    if (taskDetailsValue === "") {
        (_c = document.getElementsByClassName("error-message-task-details")[0]) === null || _c === void 0 ? void 0 : _c.classList.add("display-visible");
        isEmpty = true;
    }
    else {
        (_d = document.getElementsByClassName("error-message-task-details")[0]) === null || _d === void 0 ? void 0 : _d.classList.remove("display-visible");
    }
    if (assigneeValue === "0") {
        (_e = document.getElementsByClassName("error-message-assignee")[0]) === null || _e === void 0 ? void 0 : _e.classList.add("display-visible");
        isEmpty = true;
    }
    else {
        (_f = document.getElementsByClassName("error-message-assignee")[0]) === null || _f === void 0 ? void 0 : _f.classList.remove("display-visible");
    }
    if (isEmpty)
        return null;
    taskDetails.value = "";
    assignee.value = "0";
    dueDate.value = "";
    return [taskDetailsValue, assigneeValue, dueDateValue];
}
