document.addEventListener("DOMContentLoaded", function(){
    let tasks = [];
    let activeTaskIndex = null;

    function createTask(){
        let taskName = document.getElementById("taskNameInput").value;

        if (taskName.trim() !== ""){
            let task = {
                name: taskName,
                toDoList: []
            };

            tasks.push(task);
            activeTaskIndex = tasks.length -1;
            // console.log(task);
            renderTaskList();


            document.getElementById("taskItemInput").style.display = "block"; // This line of code is only executed if an object taskName exists.

            clearInput("taskNameInput"); //test to clear newItemInput

            function addItem() {
                if(activeTaskIndex !==null){
                    let newItemInput = document.getElementById("newItemInput");
                    let newItemText = newItemInput.value
                    if(newItemText.trim() !=="") {
                        tasks[activeTaskIndex].toDoList.push({text: newItemText, completed:false});
                        renderTodoList(tasks[activeTaskIndex]);
                        newItemInput.value = "";
                        clearInput("newItemInput"); //test to clear newItemInput
                    }

                }
            }
            let addItemButton = document.getElementById("addItemButton");
            if (addItemButton){
                addItemButton.addEventListener("click", addItem);
            }
        }

    }

    function clearInput(inputId){
        let inputField = document.getElementById(inputId);
        if (inputField) {
            inputField.value = "";
        }
    }
    function renderTaskList(){
        let taskElement = document.getElementById("tasks");
        taskElement.innerHTML = "";

        for (let i = 0; i < tasks.length; i++) {
            let taskName = tasks[i].name;
            let listItem = document.createElement("li");
            listItem.textContent = taskName;

            if (i === activeTaskIndex){
                listItem.style.backgroundColor = "rgb(235, 235, 235)";
            }
            listItem.addEventListener("click", function (event){
                // let taskName = event.target.textContent;
                // renderTodoList(tasks[taskName]);
                setActiveTask(i);
                renderTodoList(tasks[i]);
                renderTaskList();
            });

            taskElement.appendChild(listItem);
        }
    }

    function renderTodoList(task) {
        let todoListElement = document.getElementById("toDo");
        //let task = tasks[taskName]; // this needs to be revised...

        todoListElement.innerHTML = `<h2>${task.name}</h2>`;

        task.toDoList.forEach(function(item, index) {
            let listItem = document.createElement("div");
            listItem.className = "task-item";


            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.completed;
            checkbox.addEventListener("change", function(){
                item.completed = checkbox.checked;
            });


            let itemText = document.createElement("span");
            itemText.textContent = item.text;

            listItem.appendChild(checkbox);
            listItem.appendChild(itemText);
            todoListElement.appendChild(listItem);
        });


    }

    function setActiveTask(index){
        activeTaskIndex = index;
    }

    // function {


    // }




    document.getElementById("createTaskButton").addEventListener("click", createTask);

    renderTaskList();
});


    //=======I MAY USE THIS LATER FOR A DYNAMIC FUNCTION======
    // let 
    // todoListElement.innerHTML += '<input type="text" id="newItemInput" placeholder="Add a new task"><button id="addItemButton">Add Task</button>';
    // console.log(newItemInput);
    // document.getElementById("addItemButton").addEventListener("click", addItemButton);
    // console.log(document.getElementById('addItemButton'))