function onSubmit(){
    validatedInputs = validateAndReturnInputs()
    if (validatedInputs == null) {
        return;
    }
    [taskDetails, assignee, dueDate] = validatedInputs;
    // console.log(taskDetails, assignee, dueDate)

    var tbody = document.getElementById('inprogress-table').getElementsByTagName('tbody')[0];
    var newRow = tbody.insertRow(0);

    let rowTemplate = document.getElementById("inprogress-table-row")
    // console.log(rowTemplate)
    newRow.innerHTML = rowTemplate.innerHTML;

    newRow.cells[0].innerHTML = taskDetails;
    newRow.cells[1].innerHTML = assignee;
    newRow.cells[2].innerHTML = dueDate;

}

function onCheckClick(data) {
    let tabRow = data.srcElement.parentElement.parentElement;
    idx = tabRow.rowIndex;
    console.log(idx)
    document.getElementById('inprogress-table').deleteRow(idx)

    let tbody = document.getElementById('completed-table').getElementsByTagName('tbody')[0];;
    let row = tbody.insertRow(0)
    row.insertCell(0).innerHTML = tabRow.cells[0].innerHTML;
    row.insertCell(1).innerHTML = tabRow.cells[1].innerHTML;
    row.insertCell(2).innerHTML = tabRow.cells[2].innerHTML;
}

function validateAndReturnInputs(){
    taskDetails = document.getElementById("task_details")
    assignee = document.getElementById("assignee")
    dueDate = document.getElementById("due_date")
    t = taskDetails.value;
    a = assignee.value;
    d = dueDate.value;

    let isEmpty = false;

    if (d == "") {
        document.getElementsByClassName("error-message-due-date")[0].classList.add("display-visible");
        isEmpty = true;
    } else {
        document.getElementsByClassName("error-message-due-date")[0].classList.remove("display-visible");
    }
    
    if (t == "") {
        document.getElementsByClassName("error-message-task-details")[0].classList.add("display-visible");
        isEmpty = true;
    } else {
        document.getElementsByClassName("error-message-task-details")[0].classList.remove("display-visible");
    }

    if (a == "") {
        document.getElementsByClassName("error-message-assignee")[0].classList.add("display-visible");
        isEmpty = true;
    } else {
        document.getElementsByClassName("error-message-assignee")[0].classList.remove("display-visible");
    }

    if (isEmpty) return null;

    taskDetails.value = "";
    assignee.value = "";
    dueDate.value = "";
    return [t, a, d];
}