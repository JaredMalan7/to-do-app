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
            editButton.setAttribute("data-type", "task");
            editButton.addEventListener("click", function(){
                editTask(i);
            })

            // ===== DELETE BUTTON =====

            let deleteButton = document.createElement("i");
            deleteButton.className = "fa-solid fa-trash";
            deleteButton.style.color = "#000000";
            deleteButton.setAttribute("data-type", "task");
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

            // ===== EDIT BUTTON =====
            let editButton = document.createElement("i");
            editButton.className = "fa-solid fa-pen-to-square";
            editButton.style.color = "#000000";
            editButton.setAttribute("data-type", "item");
            editButton.addEventListener("click", function(){
                editTask(activeTaskIndex, index);
            }.bind(null, index)); // testing this to pass 'index' as an argument

            // ===== DELETE BUTTON =====

            let deleteButton = document.createElement("i");
            deleteButton.className = "fa-solid fa-trash";
            deleteButton.style.color = "#000000";
            deleteButton.setAttribute("data-type", "item");
            deleteButton.addEventListener("click", function (){
                deleteTask(activeTaskIndex, index);
            }.bind(null, index)); // testing this to pass 'index' as an argument


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
            listItem.appendChild(editButton);
            listItem.appendChild(deleteButton);
            });
            

        }
    }

    function setActiveTask(index){
        activeTaskIndex = index;
    }


    //  EDIT FEATURE
    function editTask(taskIndex, itemIndex) {
        let targetType = event.target.getAttribute("data-type");
        if(targetType === "task"){
            if(tasks[taskIndex]){
                let newName = prompt("Edit Task Name:", tasks[taskIndex].name);
                if(newName !== null) {
                    tasks[taskIndex].name = newName;
                    renderTaskList();
                    renderTodoList(tasks[taskIndex]);
                }
    
            }   else{
                console.error("invalid task or item index"); //testing for errors
            }

        } else if (targetType === "item") {
            let newName=prompt("Edit Item Name:", tasks[taskIndex].toDoList[itemIndex].text);
            if (newName !== null) {
                tasks[taskIndex].toDoList[itemIndex].text = newName;
                renderTaskList();
                renderTodoList(tasks[taskIndex]);
            }
        }
    
    }

    // DELETE FEATURE

    function deleteTask(taskIndex, itemIndex) {
        let targetType = event.target.getAttribute("data-type");
        if (targetType === "task") {
            if (confirm("Are you sure you want to delete this item?")) {
                tasks.splice(taskIndex, 1);
                if (activeTaskIndex === taskIndex){
                    activeTaskIndex = null;
                }
                renderTaskList();
                renderTodoList({name: "", toDoList: []});
            }
            
        } else if (targetType === "item"){
            if(confirm("are you sure you want to delete this item?")){
                tasks[taskIndex].toDoList.splice(itemIndex, 1);
                renderTaskList();
                renderTodoList(tasks[taskIndex]);
            }
        }
        
    }


    document.getElementById("createTaskButton").addEventListener("click", createTask);

    renderTaskList();
});
