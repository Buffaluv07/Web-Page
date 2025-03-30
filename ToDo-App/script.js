document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("todo-input");
    const taskDateInput = document.getElementById("task-date");
    const taskCategoryInput = document.getElementById("task-category");
    const addButton = document.getElementById("add-button");
    const incompleteList = document.getElementById("incompleted-list");
    const completedList = document.getElementById("completed-list");

    // Function to create a task element
    const createTaskElement = (task) => {
        const li = document.createElement("li");
        li.classList.add("todo-list", task.category); // Add category class (personal or work)

        // Checkbox
        const checkboxLabel = document.createElement("label");
        checkboxLabel.classList.add("custom-checkbox");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${task.id}`;
        checkbox.name = `task-${task.id}`;

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

        // Task label
        const taskLabel = document.createElement("label");
        taskLabel.setAttribute("for", `task-${task.id}`);
        taskLabel.classList.add("task-label", task.category); // Add category class for styling
        taskLabel.textContent = `${task.text} (${task.date || "No date"})`;

        // Delete button
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

        // Add delete functionality
        deleteButton.addEventListener("click", () => {
            li.remove();
        });

        // Handle task completion
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                taskLabel.style.textDecoration = "line-through";
                completedList.appendChild(li); // Move to completed list
            } else {
                taskLabel.style.textDecoration = "none";
                incompleteList.appendChild(li); // Move back to incomplete list
            }
        });

        // Append elements to the task item
        li.appendChild(checkboxLabel);
        li.appendChild(taskLabel);
        li.appendChild(deleteButton);

        return li;
    };

    // Add task to the incomplete list
    const addTaskToIncompleteList = (task) => {
        const taskElement = createTaskElement(task);
        incompleteList.appendChild(taskElement);
    };

    // Handle adding a new task
    addButton.addEventListener("click", (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        const taskDate = taskDateInput.value; // Get the date value
        const taskCategory = taskCategoryInput.value; // Get the category value

        if (!taskText) {
            alert("Please enter a task.");
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            date: taskDate,
            category: taskCategory,
        };

        addTaskToIncompleteList(task);

        // Clear the input fields
        taskInput.value = "";
        taskDateInput.value = "";
        taskCategoryInput.value = "personal";
    });
});








document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audio-player");
    const songSelect = document.getElementById("song-select");
    const playButton = document.getElementById("play-button");
    const pauseButton = document.getElementById("pause-button");
    const stopButton = document.getElementById("stop-button");
    const nextButton = document.getElementById("next-button");
    const volumeSlider = document.getElementById("volume-slider");
    const controlButtons = document.querySelectorAll(".control-button");

    // Function to play the selected song
    const playSong = (songUrl) => {
        audioPlayer.src = songUrl;
        audioPlayer.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
    };

    // Highlight the active button
    const highlightButton = (button) => {
        controlButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
    };

    // Play button functionality
    playButton.addEventListener("click", () => {
        audioPlayer.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
        highlightButton(playButton);
    });

    // Pause button functionality
    pauseButton.addEventListener("click", () => {
        audioPlayer.pause();
        highlightButton(pauseButton);
    });

    // Stop button functionality
    stopButton.addEventListener("click", () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reset to the beginning
        highlightButton(stopButton);
    });

    // Next button functionality
    nextButton.addEventListener("click", () => {
        const currentIndex = songSelect.selectedIndex;
        const nextIndex = (currentIndex + 1) % songSelect.options.length; // Loop back to the first song
        songSelect.selectedIndex = nextIndex;
        playSong(songSelect.value);
        highlightButton(nextButton);
    });

    // Change song when a new song is selected from the dropdown
    songSelect.addEventListener("change", (event) => {
        playSong(event.target.value);
    });

    // Volume control
    volumeSlider.addEventListener("input", (event) => {
        audioPlayer.volume = event.target.value;
    });

    // Play the first song on page load
    playSong(songSelect.value);


    // Duplicate playSong function removed
});