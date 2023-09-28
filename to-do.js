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


            // ===== EDIT BUTTON =====
            let editButton = document.createElement("i");
            editButton.className = "fa-solid fa-pen-to-square";
            editButton.style.color = "#000000";
            editButton.addEventListener("click", function(){
                editTask(i);
            })

            // ===== DELTE BUTTON =====

            let deleteButton = document.createElement("i");
            deleteButton.className = "fa-solid fa-trash";
            deleteButton.style.color = "#000000";
            deleteButton.addEventListener("click", function (){
                deleteTask(i);
            })

            listItem.textContent = taskName;

            if (i === activeTaskIndex){
                listItem.style.backgroundColor = "rgb(235, 235, 235)";
            }

            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            taskElement.appendChild(listItem);

            listItem.addEventListener("click", function (event){
                // let taskName = event.target.textContent;
                // renderTodoList(tasks[taskName]);
                setActiveTask(i);
                renderTodoList(tasks[i]);
                renderTaskList();
            });

        }
    }

    function renderTodoList(task) {
        let todoListElement = document.getElementById("toDo");

        //this helps clear the todoListElement
        todoListElement.innerHTML = "";

        if (task){
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
    }

    function setActiveTask(index){
        activeTaskIndex = index;
    }


    //  EDIT FEATURE
    function editTask(index) {
        let newName = prompt("Edit Task Name:", tasks[index].name);
        if(newName !== null) {
            tasks[index].name = newName;
            renderTaskList();
        }
    }

    // DELETE FEATURE

    function deleteTask(index) {
        if (confirm("Are you sure you want to delete this item?")) {
            tasks.splice(index, 1);
            if (activeTaskIndex === index){
                activeTaskIndex = null;
            }
            renderTaskList();
            renderTodoList({name: "", toDoList: []});
        }
    }


    document.getElementById("createTaskButton").addEventListener("click", createTask);

    renderTaskList();
});
