document.addEventListener("DOMContentLoaded", () => {
    const completedTasksList = document.getElementById("completed-tasks");

    // Function to load completed tasks from local storage
    function loadCompletedTasks() {
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        completedTasks.forEach((task) => {
            addCompletedTaskToDOM(task);
        });
    }

    // Add a completed task to the DOM
    function addCompletedTaskToDOM(task) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.setAttribute("data-id", task.id);

        taskItem.innerHTML = `
            <span class="task-title">${task.title}</span>
            <span class="task-datetime">${task.date}${task.time ? ` ${task.time}` : ""}</span>
            <span class="task-category">[${task.category}]</span>
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;

        // Add event listeners for Edit and Delete buttons
        const editButton = taskItem.querySelector(".edit-task");
        editButton.addEventListener("click", () => {
            editCompletedTask(task.id);
        });

        const deleteButton = taskItem.querySelector(".delete-task");
        deleteButton.addEventListener("click", () => {
            deleteCompletedTask(task.id);
        });

        completedTasksList.appendChild(taskItem);
    }

    // Edit a completed task
    function editCompletedTask(taskId) {
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        const taskIndex = completedTasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            const task = completedTasks[taskIndex];

            // Populate the "Add New Task" form on the main page (if accessible)
            alert("To edit this task, go back to the main page and re-add it to the task list.");

            // Optionally, remove the task from completed tasks
            completedTasks.splice(taskIndex, 1);
            localStorage.setItem("completedTasks", JSON.stringify(completedTasks));

            // Remove the task from the DOM
            const taskItem = document.querySelector(`[data-id="${taskId}"]`);
            if (taskItem) {
                taskItem.remove();
            }
        }
    }

    // Delete a completed task
    function deleteCompletedTask(taskId) {
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        const updatedTasks = completedTasks.filter((task) => task.id !== taskId);

        // Save the updated completed tasks to local storage
        localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));

        // Remove the task from the DOM
        const taskItem = document.querySelector(`[data-id="${taskId}"]`);
        if (taskItem) {
            taskItem.remove();
        }
    }

    loadCompletedTasks();
});
// TASK MANAGEMENT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const newTaskForm = document.getElementById("new-task-form");
    const upcomingTasksList = document.getElementById("upcoming-tasks-list");
    const completedTasksList = document.getElementById("completed-tasks-list");
    const lateTasksList = document.getElementById("late-tasks-list");
    const taskTimeInput = document.getElementById("task-time");
    const setReminderCheckbox = document.getElementById("set-reminder");

    // Enable/disable time input based on the reminder checkbox
    setReminderCheckbox.addEventListener("change", () => {
        taskTimeInput.disabled = !setReminderCheckbox.checked;
    });

    // Load tasks on page load
    loadTasks();

    // Check for late tasks every minute
    setInterval(checkForLateTasks, 60000);

    // Handle new task submission
    newTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskTitle = document.getElementById("task-title").value;
        const taskDate = document.getElementById("task-date").value;
        const taskTime = document.getElementById("task-time").value;
        const taskCategory = document.getElementById("task-category").value;

        if (setReminderCheckbox.checked && !taskTime) {
            const userConfirmed = confirm("You have not set a time for the reminder. Do you want to continue without a time?");
            if (!userConfirmed) {
                return; // Stop form submission if the user selects "No"
            }
        }

        const task = {
            id: Date.now(),
            title: taskTitle,
            date: taskDate,
            time: taskTime,
            category: taskCategory,
            completed: false,
        };

        saveTaskToLocalStorage(task);
        addTaskToDOM(task, false);
        taskTimeInput.disabled = true;
        setReminderCheckbox.checked = false;
        newTaskForm.reset();
    });

    // Load tasks from local storage
    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach((task) => {
            if (task.completed) {
                addTaskToDOM(task, true);
            } else if (checkIfTaskIsLate(task)) {
                addTaskToDOM(task, false, true);
            } else {
                addTaskToDOM(task, false);
            }
        });
    }

    // Add a task to the DOM
    function addTaskToDOM(task, isCompleted, isLate = false) {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        taskItem.setAttribute("data-id", task.id);

        taskItem.classList.add(task.category === "work" ? "work-task" : "personal-task");
        if (isLate) {
            taskItem.classList.add("late-task");
        }

        taskItem.innerHTML = `
            <span class="task-title">${task.title}</span>
            <span class="task-datetime">${task.date} ${task.time}</span>
            <span class="task-category">[${task.category}]</span>
            ${!isCompleted && !isLate ? '<button class="mark-complete">Complete</button>' : ''}
            <button class="edit-task">Edit</button>
            <button class="delete-task">Delete</button>
        `;

        if (isCompleted) {
            completedTasksList.appendChild(taskItem);
        } else if (isLate) {
            lateTasksList.appendChild(taskItem);
        } else {
            upcomingTasksList.appendChild(taskItem);

            const completeButton = taskItem.querySelector(".mark-complete");
            if (completeButton) {
                completeButton.addEventListener("click", () => {
                    markTaskAsCompleted(task.id);
                });
            }
        }

        const editButton = taskItem.querySelector(".edit-task");
        editButton.addEventListener("click", () => {
            editTask(task.id, isCompleted, isLate);
        });

        const deleteButton = taskItem.querySelector(".delete-task");
        deleteButton.addEventListener("click", () => {
            deleteTaskFromDOM(task.id);
        });
    }

    // Edit a task and populate the "Add New Task" form
    function editTask(taskId, isCompleted, isLate) {
        const tasks = isCompleted ? getCompletedTasksFromLocalStorage() : getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            const task = tasks[taskIndex];

            // Populate the "Add New Task" form with the task's details
            document.getElementById("task-title").value = task.title;
            document.getElementById("task-date").value = task.date;
            document.getElementById("task-time").value = task.time || "";
            document.getElementById("task-category").value = task.category;

            // Remove the task from local storage and the DOM
            tasks.splice(taskIndex, 1);
            if (isCompleted) {
                saveCompletedTasksToLocalStorage(tasks);
            } else {
                saveTasksToLocalStorage(tasks);
            }

            const taskItem = document.querySelector(`[data-id="${taskId}"]`);
            if (taskItem) {
                taskItem.remove();
            }
        }
    }

    // Mark a task as completed
    function markTaskAsCompleted(taskId) {
        const tasks = getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            const task = tasks[taskIndex];
            task.completed = true;

            // Save the updated task to local storage
            tasks.splice(taskIndex, 1); // Remove from tasks
            saveTasksToLocalStorage(tasks);

            // Save to completed tasks
            saveCompletedTaskToLocalStorage(task);

            // Remove from the DOM and add to the completed section
            const taskItem = document.querySelector(`[data-id="${taskId}"]`);
            if (taskItem) {
                taskItem.remove();
            }

            addTaskToDOM(task, true);
        }
    }

    // Check if a task is late
    function checkIfTaskIsLate(task) {
        const taskDateTime = new Date(`${task.date}T${task.time || "23:59"}`);
        const now = new Date();
        return taskDateTime < now;
    }

    // Check for late tasks
    function checkForLateTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach((task) => {
            if (!task.completed && checkIfTaskIsLate(task)) {
                const taskItem = document.querySelector(`[data-id="${task.id}"]`);
                if (taskItem && taskItem.parentElement.id === "upcoming-tasks-list") {
                    taskItem.remove();
                    addTaskToDOM(task, false, true);
                }
            }
        });
    }

    // Delete a task from the DOM and local storage
    function deleteTaskFromDOM(taskId) {
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        saveTasksToLocalStorage(updatedTasks);

        const taskItem = document.querySelector(`[data-id="${taskId}"]`);
        if (taskItem) {
            taskItem.remove();
        }
    }

    // Local storage helper functions
    function getTasksFromLocalStorage() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function saveTaskToLocalStorage(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        saveTasksToLocalStorage(tasks);
    }

    function saveTasksToLocalStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function saveCompletedTaskToLocalStorage(task) {
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
        completedTasks.push(task);
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }

    function saveCompletedTasksToLocalStorage(tasks) {
        localStorage.setItem("completedTasks", JSON.stringify(tasks));
    }
});

if (typeof Storage === "undefined") {
    alert("Your browser does not support localStorage. Some features may not work.");
}