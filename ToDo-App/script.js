document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes-list");
    const newNoteForm = document.getElementById("new-note-form");
    const noteContentInput = document.getElementById("note-content");

    // Load notes from localStorage and display them grouped by date
    function loadNotes() {
        const notes = getNotesFromLocalStorage();
        const today = new Date().toLocaleDateString();
        const currentMonth = new Date().getMonth();

        // Separate notes into "Today's Notes" and "Previous Month's Notes"
        const todaysNotes = notes.filter((note) => new Date(note.date).toLocaleDateString() === today);
        const previousMonthNotes = notes.filter((note) => new Date(note.date).getMonth() < currentMonth);

        // Clear the notes list before reloading
        notesList.innerHTML = "";

        // Add "Today's Notes" header and notes
        if (todaysNotes.length > 0) {
            const todayHeader = document.createElement("h3");
            todayHeader.textContent = "Today's Notes";
            notesList.appendChild(todayHeader);

            todaysNotes.forEach((note) => {
                addNoteToDOM(note);
            });
        }

        // Add "Previous Month's Notes" header and notes
        if (previousMonthNotes.length > 0) {
            const previousMonthHeader = document.createElement("h3");
            previousMonthHeader.textContent = "Previous Month's Notes";
            notesList.appendChild(previousMonthHeader);

            previousMonthNotes.forEach((note) => {
                addNoteToDOM(note);
            });
        }
    }

    // Save a new note to localStorage
    function saveNoteToLocalStorage(note) {
        const notes = getNotesFromLocalStorage();
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Get all notes from localStorage
    function getNotesFromLocalStorage() {
        return JSON.parse(localStorage.getItem("notes")) || [];
    }

    // Add a note to the DOM
    function addNoteToDOM(note) {
        const noteItem = document.createElement("li");
        noteItem.classList.add("note-item");
        noteItem.setAttribute("data-id", note.id);
        noteItem.innerHTML = `
            <span class="note-content">${note.content}</span>
            <span class="note-date">${note.date}</span>
            <button class="edit-note">Edit</button>
            <button class="delete-note">Delete</button>
        `;

        // Add event listener for editing the note
        const editButton = noteItem.querySelector(".edit-note");
        editButton.addEventListener("click", () => {
            editNoteContent(note.id);
        });

        // Add event listener for deleting the note
        const deleteButton = noteItem.querySelector(".delete-note");
        deleteButton.addEventListener("click", () => {
            deleteNoteFromDOM(note.id);
        });

        notesList.appendChild(noteItem);
    }

    // Edit the content of a note
    function editNoteContent(noteId) {
        const notes = getNotesFromLocalStorage();
        const noteIndex = notes.findIndex((note) => note.id === noteId);

        if (noteIndex !== -1) {
            const newContent = prompt("Edit your note:", notes[noteIndex].content);
            if (newContent !== null && newContent.trim() !== "") {
                notes[noteIndex].content = newContent.trim();
                saveNotesToLocalStorage(notes);

                const noteItem = document.querySelector(`[data-id="${noteId}"] .note-content`);
                noteItem.textContent = newContent.trim();
            }
        }
    }

    // Save all notes to localStorage
    function saveNotesToLocalStorage(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Delete a note from the DOM and localStorage
    function deleteNoteFromDOM(noteId) {
        const notes = getNotesFromLocalStorage();
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        const noteItem = document.querySelector(`[data-id="${noteId}"]`);
        if (noteItem) {
            noteItem.remove();
        }
    }

    // Handle the submission of the new note form
    newNoteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const noteContent = noteContentInput.value.trim();
        if (!noteContent) {
            alert("Please enter a note.");
            return;
        }

        const note = {
            id: Date.now(), // Unique ID for the note
            content: noteContent,
            date: new Date().toLocaleString(), // Add the current date and time
        };

        // Save the note to localStorage and add it to the DOM
        saveNoteToLocalStorage(note);
        loadNotes(); // Reload notes to update the grouping

        // Clear the input field
        newNoteForm.reset();
    });

    // Load notes when the page loads
    loadNotes();
});