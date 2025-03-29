document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-button');
    const todoInput = document.getElementById('todo-input');
    const taskDateInput = document.getElementById('task-date');
    const taskCategoryInput = document.getElementById('task-category');
    const incompletedList = document.getElementById('incompleted-list');
    const completedList = document.getElementById('completed-list');


    loadTasks();


    addButton.addEventListener('click', (event) => {
        event.preventDefault();

        const taskText = todoInput.value.trim();
        const taskDate = taskDateInput.value;

        if (!taskText) {
            alert('Please enter a task.');
            return;
        }


        const task = {
            id: Date.now(),
            text: taskText,
            date: taskDate || null,
            category: taskCategoryInput.value,
            completed: false,
        };

 
        saveTask(task);


        addTaskToIncompleteList(task);

        todoInput.value = '';
        taskDateInput.value = '';
        taskCategoryInput.value = 'work'; // 
    });

    function addTaskToIncompleteList(task) {
        const taskElement = createTaskElement(task);
        incompletedList.appendChild(taskElement);
    }

    // Create a task element
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.classList.add('todo-list');
        li.setAttribute('data-id', task.id);

        const checkboxLabel = document.createElement('label');
        checkboxLabel.classList.add('custom-checkbox');

        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke-width', '2');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M20 6L9 17l-5-5');
        svg.appendChild(path);

        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(svg);

        const taskLabel = document.createElement('label');
        taskLabel.classList.add('task-label');
        taskLabel.textContent = task.text;

        // Add category-specific class
        if (task.category === 'work') {
            taskLabel.classList.add('work');
        } else if (task.category === 'personal') {
            taskLabel.classList.add('personal');
        }

        if (task.completed) {
            taskLabel.style.textDecoration = 'line-through';
        }

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = `
            <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18M9 6v12m6-12v12M19 6l-1 14H6L5 6"></path>
            </svg>
        `;

        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            updateTask(task);

            if (task.completed) {
                taskLabel.style.textDecoration = 'line-through';
                completedList.appendChild(li);
            } else {
                taskLabel.style.textDecoration = 'none';
                incompletedList.appendChild(li);
            }
        });


        deleteButton.addEventListener('click', () => {
            li.remove();
            deleteTask(task.id);
        });

        li.appendChild(checkboxLabel);
        li.appendChild(taskLabel);
        li.appendChild(deleteButton);

        return li;
    }


    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Update task in localStorage
    function updateTask(updatedTask) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = tasks.findIndex((task) => task.id === updatedTask.id);
        if (index !== -1) {
            tasks[index] = updatedTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    // Delete task from localStorage
    function deleteTask(taskId) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task) => {
            if (task.completed) {
                completedList.appendChild(createTaskElement(task));
            } else {
                addTaskToIncompleteList(task);
            }
        });
    }
});









document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const nextButton = document.getElementById('next-button');
    const stopButton = document.getElementById('stop-button');
    const songSelect = document.getElementById('song-select');
    const volumeSlider = document.getElementById('volume-slider');

    let currentSongIndex = 0;

    // Automatically play music when the page loads
    audioPlayer.play();

    // Play the music
    playButton.addEventListener('click', () => {
        audioPlayer.play();
    });

    // Pause the music
    pauseButton.addEventListener('click', () => {
        audioPlayer.pause();
    });

    // Stop the music
    stopButton.addEventListener('click', () => {
        audioPlayer.pause();
        audioPlayer.currentTime = 0; // Reset to the beginning
    });

    // Play the next song
    nextButton.addEventListener('click', () => {
        playNextSong();
    });

    // Handle song selection from the dropdown
    songSelect.addEventListener('change', (event) => {
        const selectedSong = event.target.value; // Get the selected song's value (file path)
        audioSource.src = selectedSong; // Update the audio source
        audioPlayer.load(); // Reload the audio player with the new source
        audioPlayer.play(); // Automatically play the selected song
        updateCurrentSongIndex();
    });

    // Automatically play the next song when the current song ends
    audioPlayer.addEventListener('ended', () => {
        playNextSong();
    });

    // Adjust the volume
    volumeSlider.addEventListener('input', (event) => {
        audioPlayer.volume = event.target.value; // Set the volume based on the slider value
    });

    // Function to play the next song
    function playNextSong() {
        const options = Array.from(songSelect.options);
        currentSongIndex = (currentSongIndex + 1) % options.length; // Loop back to the first song if at the end

        // Update the dropdown selection
        songSelect.selectedIndex = currentSongIndex;

        // Update the audio source
        const nextSong = options[currentSongIndex].value;
        audioSource.src = nextSong;
        audioPlayer.load(); // Reload the audio player with the new source
        audioPlayer.play(); // Automatically play the next song
    }

    // Function to update the current song index based on the dropdown selection
    function updateCurrentSongIndex() {
        const options = Array.from(songSelect.options);
        currentSongIndex = options.findIndex(option => option.value === audioSource.src);
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const audioPlayer = document.getElementById("audio-player");
    const songSelect = document.getElementById("song-select");

    // Play selected song
    songSelect.addEventListener("change", (event) => {
        const selectedSong = event.target.value;
        audioPlayer.src = selectedSong;
        audioPlayer.load();
        audioPlayer.play().catch((error) => {
            console.error("Error playing audio:", error);
        });
    });
});