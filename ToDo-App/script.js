document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("todo-input");
    const taskDateInput = document.getElementById("task-date");
    const taskCategoryInput = document.getElementById("task-category");
    const addButton = document.getElementById("add-button");
    const incompleteList = document.getElementById("incompleted-list");
    const completedList = document.getElementById("completed-list");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            if (task.completed) {
                addTaskToCompletedList(task);
            } else {
                addTaskToIncompleteList(task);
            }
        });
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll("#incompleted-list .todo-list").forEach((li) => {
            tasks.push({
                id: li.dataset.id,
                text: li.querySelector(".task-label").textContent.split(" (")[0],
                date: li.querySelector(".task-label").textContent.match(/\((.*?)\)/)?.[1] || "No date",
                category: li.classList.contains("personal") ? "personal" : "work",
                completed: false,
            });
        });
        document.querySelectorAll("#completed-list .todo-list").forEach((li) => {
            tasks.push({
                id: li.dataset.id,
                text: li.querySelector(".task-label").textContent.split(" (")[0],
                date: li.querySelector(".task-label").textContent.match(/\((.*?)\)/)?.[1] || "No date",
                category: li.classList.contains("personal") ? "personal" : "work",
                completed: true,
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const createTaskElement = (task) => {
        const li = document.createElement("li");
        li.classList.add("todo-list", task.category);
        li.dataset.id = task.id; 

      
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("custom-checkbox");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${task.id}`;
        checkbox.name = `task-${task.id}`;
        checkbox.checked = task.completed;
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M20 6L9 17l-5-5");
        svg.appendChild(path);
        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(svg);

  
        const taskLabel = document.createElement("label");
        taskLabel.setAttribute("for", `task-${task.id}`);
        taskLabel.classList.add("task-label", task.category);
        taskLabel.textContent = `${task.text} (${task.date || "No date"})`;

        // Didn't know how to do this.... up to...//
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button");
        const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        deleteIcon.setAttribute("class", "delete-icon");
        deleteIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        deleteIcon.setAttribute("viewBox", "0 0 24 24");
        deleteIcon.setAttribute("fill", "none");
        deleteIcon.setAttribute("stroke", "currentColor");
        deleteIcon.setAttribute("stroke-width", "2");
        deleteIcon.setAttribute("stroke-linecap", "round");
        deleteIcon.setAttribute("stroke-linejoin", "round");
        const deletePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        deletePath.setAttribute("d", "M3 6h18M9 6v12m6-12v12M19 6l-1 14H6L5 6");
        deleteIcon.appendChild(deletePath);
        deleteButton.appendChild(deleteIcon);
//this point. the SVG was difficult.//
      
        deleteButton.addEventListener("click", () => {
            li.remove();
            saveTasks(); 
        });

       
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                taskLabel.style.textDecoration = "line-through";
                completedList.appendChild(li); 
            } else {
                taskLabel.style.textDecoration = "none";
                incompleteList.appendChild(li);
            }
            saveTasks(); 
        });

        li.appendChild(checkboxLabel);
        li.appendChild(taskLabel);
        li.appendChild(deleteButton);

        return li;
    };

    const addTaskToIncompleteList = (task) => {
        const taskElement = createTaskElement(task);
        incompleteList.appendChild(taskElement);
    };

    const addTaskToCompletedList = (task) => {
        const taskElement = createTaskElement(task);
        taskElement.querySelector(".task-label").style.textDecoration = "line-through";
        completedList.appendChild(taskElement);
    };

    addButton.addEventListener("click", (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value;
        const taskCategory = taskCategoryInput.value;

        if (!taskText) {
            alert("Please enter a task.");
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            date: taskDate,
            category: taskCategory,
            completed: false,
        };

        addTaskToIncompleteList(task);
        saveTasks(); 

        taskInput.value = "";
        taskDateInput.value = "";
        taskCategoryInput.value = "personal";
    });

   
    loadTasks();
});



//AI made most of this..... //

document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audio-player");
    const songSelect = document.getElementById("song-select");
    const playButton = document.getElementById("play-button");
    const pauseButton = document.getElementById("pause-button");
    const stopButton = document.getElementById("stop-button");
    const nextButton = document.getElementById("next-button");
    const volumeSlider = document.getElementById("volume-slider");
    const controlButtons = document.querySelectorAll(".control-button");

    
    const playSong = (songUrl) => {
        audioPlayer.src = songUrl;
        audioPlayer.play().catch((error) => {
            console.error("Error playing audio:", error);
    });
    };


    const highlightButton = (button) => {
        controlButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    };


    playButton.addEventListener("click", () => {
        audioPlayer.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
        highlightButton(playButton);
    });

    pauseButton.addEventListener("click", () => {
        audioPlayer.pause();
        highlightButton(pauseButton);
    });
   
    stopButton.addEventListener("click", () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        highlightButton(stopButton);
    });


    nextButton.addEventListener("click", () => {
        const currentIndex = songSelect.selectedIndex;
        const nextIndex = (currentIndex + 1) % songSelect.options.length;
        songSelect.selectedIndex = nextIndex;
        playSong(songSelect.value);
        highlightButton(nextButton);
    });

    songSelect.addEventListener("change", (event) => {
        playSong(event.target.value);
    });


    volumeSlider.addEventListener("input", (event) => {
        audioPlayer.volume = event.target.value;
    });

    playSong(songSelect.value);


 
});