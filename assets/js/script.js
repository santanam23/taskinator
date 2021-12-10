var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");


var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // check if input values are empty strings
    if (taskNameInput === "" || taskTypeInput === "") {
        alert("You need to fill out the task form!");
        return false;
 }

    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // check if task is new or one being edited by seeing if it has a data-task-id attribute
    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    createTaskEl(taskDataObj);
    }
};


var createTaskEl = function(taskDataObj) {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    var taskInfoEl = document.createElement("div");
        taskInfoEl.className = "task-info";
        taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
        listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);
    
        
        
        taskIdCounter++;

};

    var createTaskActions = function(taskId) {

        var actionContainerEl = document.createElement("div");
        actionContainerEl.className = "task-actions";
    
            // create edit button
        var editButtonEl = document.createElement("button");
        editButtonEl.textContent = "Edit";
        editButtonEl.className = "btn edit-btn";
        editButtonEl.setAttribute("data-task-id", taskId);
    
        actionContainerEl.appendChild(editButtonEl);
    
        // create delete button
        var deleteButtonEl = document.createElement("button");
        deleteButtonEl.textContent = "Delete";
        deleteButtonEl.className = "btn delete-btn";
        deleteButtonEl.setAttribute("data-task-id", taskId);
    
        actionContainerEl.appendChild(deleteButtonEl);
    
        var statusSelectEl = document.createElement("select");
        statusSelectEl.className = "select-status";
        statusSelectEl.setAttribute("name", "status-change");
        statusSelectEl.setAttribute("data-task-id", taskId);
    
        var statusChoices = ["To Do", "In Progress", "Completed"];
    
        for (var i = 0; i < statusChoices.length; i++) {
            // create option element
            var statusOptionEl = document.createElement("option");
            statusOptionEl.setAttribute("value", statusChoices[i]);
            statusOptionEl.textContent = statusChoices[i];
            
          
            // append to select
            statusSelectEl.appendChild(statusOptionEl);
          }
    
        return actionContainerEl;
   
};

formEl.addEventListener("submit", taskFormHandler);
