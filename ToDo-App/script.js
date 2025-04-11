import DB from "./db.js";


// ==========================
// TASK MANAGEMENT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const newTaskForm = document.getElementById("new-task-form");
    const upcomingTasksList = document.getElementById("upcoming-tasks-list");
    const completedTasksList = document.getElementById("completed-tasks-list");
    const lateTasksList = document.getElementById("late-tasks-list");
    const taskTimeInput = document.getElementById("task-time");
    const setReminderCheckbox = document.getElementById("set-reminder");

    setReminderCheckbox.addEventListener("change", () => {
        taskTimeInput.disabled = !setReminderCheckbox.checked;
    });

    loadTasks();

    setInterval(checkForLateTasks, 60000);

    newTaskForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const taskTitle = document.getElementById("task-title").value;
        const taskDate = document.getElementById("task-date").value;
        const taskTime = document.getElementById("task-time").value;
        const taskCategory = document.getElementById("task-category").value;

        if (setReminderCheckbox.checked && !taskTime) {
            const userConfirmed = confirm("You have not set a time for the reminder. Do you want to continue without a time?");
            if (!userConfirmed) {
                return;
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

    function editTask(taskId, isCompleted, isLate) {
        const tasks = isCompleted ? getCompletedTasksFromLocalStorage() : getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            const task = tasks[taskIndex];

            document.getElementById("task-title").value = task.title;
            document.getElementById("task-date").value = task.date;
            document.getElementById("task-time").value = task.time || "";
            document.getElementById("task-category").value = task.category;

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

    function markTaskAsCompleted(taskId) {
        const tasks = getTasksFromLocalStorage();
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        if (taskIndex !== -1) {
            const task = tasks[taskIndex];
            task.completed = true;

            tasks.splice(taskIndex, 1);
            saveTasksToLocalStorage(tasks);

            saveCompletedTaskToLocalStorage(task);

            const taskItem = document.querySelector(`[data-id="${taskId}"]`);
            if (taskItem) {
                taskItem.remove();
            }

            addTaskToDOM(task, true);
        }
    }

    function checkIfTaskIsLate(task) {
        const taskDateTime = new Date(`${task.date}T${task.time || "23:59"}`);
        const now = new Date();
        return taskDateTime < now;
    }

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

    function deleteTaskFromDOM(taskId) {
        const tasks = getTasksFromLocalStorage();
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        saveTasksToLocalStorage(updatedTasks);

        const taskItem = document.querySelector(`[data-id="${taskId}"]`);
        if (taskItem) {
            taskItem.remove();
        }
    }

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

// ==========================
// NOTES MANAGEMENT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const newNoteForm = document.getElementById("new-note-form");
    const notesList = document.getElementById("notes-list");

    loadNotes();

    newNoteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const noteContent = document.getElementById("note-content").value;

        const note = {
            id: Date.now(),
            content: noteContent,
        };

        saveNoteToLocalStorage(note);
        addNoteToDOM(note);
        newNoteForm.reset();
    });

    function loadNotes() {
        const notes = getNotesFromLocalStorage();
        notes.forEach((note) => {
            addNoteToDOM(note);
        });
    }

    function addNoteToDOM(note) {
        const noteItem = document.createElement("li");
        noteItem.classList.add("note-item");
        noteItem.setAttribute("data-id", note.id);
        noteItem.innerHTML = `
            <span class="note-content">${note.content}</span>
            <button class="edit-note">Edit</button>
            <button class="delete-note">Delete</button>
        `;

        const editButton = noteItem.querySelector(".edit-note");
        editButton.addEventListener("click", () => {
            editNoteContent(note.id);
        });

        const deleteButton = noteItem.querySelector(".delete-note");
        deleteButton.addEventListener("click", () => {
            deleteNoteFromDOM(note.id);
        });

        notesList.appendChild(noteItem);
    }

    function editNoteContent(noteId) {
        const notes = getNotesFromLocalStorage();
        const noteIndex = notes.findIndex((note) => note.id === noteId);

        if (noteIndex !== -1) {
            const newContent = prompt("Edit your note:", notes[noteIndex].content);
            if (newContent !== null) {
                notes[noteIndex].content = newContent;
                saveNotesToLocalStorage(notes);

                const noteItem = document.querySelector(`[data-id="${noteId}"] .note-content`);
                noteItem.textContent = newContent;
            }
        }
    }

    function deleteNoteFromDOM(noteId) {
        const notes = getNotesFromLocalStorage();
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        saveNotesToLocalStorage(updatedNotes);

        const noteItem = document.querySelector(`[data-id="${noteId}"]`);
        if (noteItem) {
            noteItem.remove();
        }
    }

    function getNotesFromLocalStorage() {
        return JSON.parse(localStorage.getItem("notes")) || [];
    }

    function saveNoteToLocalStorage(note) {
        const notes = getNotesFromLocalStorage();
        notes.push(note);
        saveNotesToLocalStorage(notes);
    }

    function saveNotesToLocalStorage(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }
});



// ==========================
// MUSIC CONTROLS
// ==========================
document.addEventListener("DOMContentLoaded", () => {
    const backgroundMusic = document.getElementById("background-music");
    const playMusicButton = document.getElementById("play-music");
    const pauseMusicButton = document.getElementById("pause-music");
    const stopMusicButton = document.getElementById("stop-music");
    const progressBar = document.getElementById("progress-bar");
    const currentTimeDisplay = document.getElementById("current-time");
    const totalDurationDisplay = document.getElementById("total-duration");

    playMusicButton.addEventListener("click", () => {
        backgroundMusic.play();
    });

    pauseMusicButton.addEventListener("click", () => {
        backgroundMusic.pause();
    });

    stopMusicButton.addEventListener("click", () => {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
    });

    backgroundMusic.addEventListener("timeupdate", () => {
        const currentTime = backgroundMusic.currentTime;
        const duration = backgroundMusic.duration;

        progressBar.value = (currentTime / duration) * 100;

        currentTimeDisplay.textContent = formatTime(currentTime);

        if (!isNaN(duration)) {
            totalDurationDisplay.textContent = formatTime(duration);
        }
    });

    progressBar.addEventListener("input", () => {
        const duration = backgroundMusic.duration;
        backgroundMusic.currentTime = (progressBar.value / 100) * duration;
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
});



const volumeControl = document.getElementById("volume-control");
volumeControl.addEventListener("input", () => {
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.volume = volumeControl.value;
});

await DB.ready;
await DB.c({ text: "welcome" });

const notes = await DB.r();
console.log(notes);