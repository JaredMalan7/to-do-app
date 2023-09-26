document.addEventListener("DOMContentLoaded", function(){
    let tasks = {};

    function createTask(){
        let taskName = document.getElementById("taskNameInput").value;

        if (taskName.trim() !== ""){
            let task = {
                name: taskName,
                toDoList: []
            };

            tasks[taskName] = task;
            console.log(task);
            renderTaskList();


            function addItem() {
                let newItemInput = document.getElementById("newItemInput");
                let newItemText = newItemInput.value
                if(newItemText.trim() !=="") {
                    task.toDoList.push({text: newItemText, completed: false});
                    renderTodoList(task);
                    newItemInput.value = "";
                }
            }
            let addItemButton = document.getElementById("addItemButton");
            if (addItemButton){
                addItemButton.addEventListener("click", addItem);
            }
            // document.getElementById("addItemButton").addEventListener("click", addItem);
        }

    }
    function renderTaskList(){
        let taskElement = document.getElementById("tasks");
        taskElement.innerHTML = "";

        for (let taskName in tasks) {
            let listItem = document.createElement("li");
            listItem.textContent = taskName;
            listItem.addEventListener("click", function (event){
                let taskName = event.target.textContent;
                renderTodoList(tasks[taskName]);
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

    document.getElementById("createTaskButton").addEventListener("click", createTask);

    renderTaskList();
});


    //=======I MAY USE THIS LATER FOR A DYNAMIC FUNCTION======
    // let 
    // todoListElement.innerHTML += '<input type="text" id="newItemInput" placeholder="Add a new task"><button id="addItemButton">Add Task</button>';
    // console.log(newItemInput);
    // document.getElementById("addItemButton").addEventListener("click", addItemButton);
    // console.log(document.getElementById('addItemButton'))