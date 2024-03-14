; (function () { //function ensures immediate code execution when loading the JavaScript file.Avoinding global scope
    "use strict"

    //STORE THE DOM IN VARIABLES -- 
    const itemInput = document.getElementById("item-input")
    const todoAddForm = document.getElementById("todo-add")
    const ul = document.getElementById("todo-list")
    const lis = ul.getElementsByTagName("li")


    let arrTasks = getSavedData() //Initializes a variable called arrTasks with the task data obtained from the function 2

    // function addEventLi(li) {
    //     li.addEventListener("click", function () {
    //         console.log(this)
    //     })
    // }

    function getSavedData() {
        let tasksData = localStorage.getItem("tasks") //saving the tasks on local storage
        tasksData = JSON.parse(tasksData) //transforming the saving the tasks on local storage in to object
        console.log(tasksData)
        return tasksData && tasksData.length ? tasksData : [ //if there are task data and length
            {
                name: "task 1",
                createAt: Date.now(),
                completed: true
            },
            {
                name: "task 2",
                createAt: Date.now(),
                completed: false
            }
        ] //arr.lenght = boolean true, validating if there are any arr or data


    } // returns task data obtained from local storage if it exists, or returns a default task list if there is no previously saved data.

    function setNewData() {
        localStorage.setItem("tasks", JSON.stringify(arrTasks)) //transforming the saving tasks on local storage in to string
    }

    setNewData() //updates task data in local storage

    function generateLiTask(obj) {

        const li = document.createElement("li")
        const p = document.createElement("p")
        const checkButton = document.createElement("button")
        const editButton = document.createElement("i")
        const deleteButton = document.createElement("i")

        /* Creates HTML elements to represent a task in the list, such as a paragraph (p) for the task name, 
        buttons for marking completed, edit, and delete.*/

        li.className = "todo-item"

        checkButton.className = "button-check"
        checkButton.innerHTML = `
            <i class="fas fa-check ${obj.completed ? "" : "displayNone"}" data-action="checkButton"></i>`
        checkButton.setAttribute("data-action", "checkButton")

        li.appendChild(checkButton)

        p.className = "task-name"
        p.textContent = obj.name
        li.appendChild(p)

        editButton.className = "fas fa-edit"
        editButton.setAttribute("data-action", "editButton")
        li.appendChild(editButton)


        const containerEdit = document.createElement("div") //Creates a div element that will serve as a container for editing the task and assigns it a class for styling.
        containerEdit.className = "editContainer"
        const inputEdit = document.createElement("input") // Ceates an input element to allow editing of the task name. Assigns a "text" type to the input, a class for styling, and sets the initial value to the task name.
        inputEdit.setAttribute("type", "text")
        inputEdit.className = "editInput"
        inputEdit.value = obj.name

        containerEdit.appendChild(inputEdit)
        const containerEditButton = document.createElement("button")
        containerEditButton.className = "editButton"
        containerEditButton.textContent = "Edit"
        containerEditButton.setAttribute("data-action", "containerEditButton")
        containerEdit.appendChild(containerEditButton) // Adds the edit button as a child of the edit container.
        const containerCancelButton = document.createElement("button")
        containerCancelButton.className = "cancelButton"
        containerCancelButton.textContent = "Cancel"
        containerCancelButton.setAttribute("data-action", "containerCancelButton")
        containerEdit.appendChild(containerCancelButton)

        li.appendChild(containerEdit)



        deleteButton.className = "fas fa-trash-alt"
        deleteButton.setAttribute("data-action", "deleteButton")
        li.appendChild(deleteButton)

        // addEventLi(li)
        return li //returns the li element with all its child elements configured, thus representing the task in the list.
    }

    function renderTasks() {
        ul.innerHTML = ""
        arrTasks.forEach(taskObj => {
            ul.appendChild(generateLiTask(taskObj))
        });
    } // update the task list in HTML, adding list elements for each task present in the data stored in arrTasks.



    function addTask(task) {

        arrTasks.push({
            name: task,
            createAt: Date.now(),
            completed: false
        })

        setNewData() //updates task data in local storage
    } // receives a new task as input. It creates an object representing the task

    function clickedUl(e) { //checks if the clicked element has a data attribute
        const dataAction = e.target.getAttribute("data-action")
        console.log(e.target)
        if (!dataAction) return

        let currentLi = e.target // find out which line of the list the clicked task is on
        while (currentLi.nodeName !== "LI") {
            currentLi = currentLi.parentElement
        }
        const currentLiIndex = [...lis].indexOf(currentLi)

        const actions = { //map the different types of possible actions based on the data attribute
            editButton: function () { // explaining what happens when you click different buttons in the task list --1 
                const editContainer = currentLi.querySelector(".editContainer");

                [...ul.querySelectorAll(".editContainer")].forEach(container => {
                    container.removeAttribute("style")
                });

                editContainer.style.display = "flex";


            },
            deleteButton: function () { // explaining what happens when you click different buttons in the task list --2
                arrTasks.splice(currentLiIndex, 1)
                console.log(arrTasks)
                renderTasks()
                setNewData()
                // currentLi.remove()
                // currentLi.parentElement.removeChild(currentLi)

            },
            containerEditButton: function () { // explaining what happens when you click different buttons in the task list --3 
                const val = currentLi.querySelector(".editInput").value
                arrTasks[currentLiIndex].name = val
                renderTasks()
                setNewData()
            },
            containerCancelButton: function () { // explaining what happens when you click different buttons in the task list --4
                currentLi.querySelector(".editContainer").removeAttribute("style")

                currentLi.querySelector(".editInput").value = arrTasks[currentLiIndex].name
            },
            checkButton: function () { // explaining what happens when you click different buttons in the task list --5
                arrTasks[currentLiIndex].completed = !arrTasks[currentLiIndex].completed

                // if (arrTasks[currentLiIndex].completed) {
                //     currentLi.querySelector(".fa-check").classList.remove("displayNone")
                // } else {
                //     currentLi.querySelector(".fa-check").classList.add("displayNone")
                // }
                setNewData() //updates task data in local storage
                renderTasks()
            }
        }

        if (actions[dataAction]) {
            actions[dataAction]()
        }
    } // action associated with the clicked element is defined in the actions object. Corresponding function is called.

    function addTaskFromParagraph() {
        const newTaskName = prompt("Enter new task:");
        if (newTaskName) {
            addTask(newTaskName);
            renderTasks();
        }
    }

    const addItemParagraph = document.getElementById("add-item2");
    addItemParagraph.addEventListener("click", addTaskFromParagraph);

    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault();
        addTask(itemInput.value);
        renderTasks();
        itemInput.value = "";
        itemInput.focus();
    });
    
    todoAddForm.addEventListener("submit", function (e) {
        e.preventDefault()
        console.log(itemInput.value)
        // ul.innerHTML += `
        //     <li class="todo-item">
        //         <p class="task-name">${itemInput.value}</p>
        //     </li>
        // `
        addTask(itemInput.value)
        renderTasks()

        itemInput.value = ""
        itemInput.focus()
    }); // preevents the default behavior of reloading the page, adds a new task with the value entered in the input field

    ul.addEventListener("click", clickedUl)


    renderTasks() //display of tasks on the interface when the page is loaded.

    // Get current date and time
    let now = new Date();
    let datetime = now.toLocaleDateString();

    // Insert date and time into HTML
    document.getElementById("datetime").innerHTML = datetime;

})();