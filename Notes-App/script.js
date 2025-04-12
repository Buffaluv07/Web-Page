document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes-list");
    const newNoteForm = document.getElementById("new-note-form");
    const noteContentInput = document.getElementById("note-content");

   
    function loadNotes() {
        const notes = getNotesFromLocalStorage();
        const today = new Date().toLocaleDateString();
        const currentMonth = new Date().getMonth();

    
        const todaysNotes = notes.filter((note) => new Date(note.date).toLocaleDateString() === today);
        const previousMonthNotes = notes.filter((note) => new Date(note.date).getMonth() < currentMonth);

        notesList.innerHTML = "";

        if (todaysNotes.length > 0) {
            const todayHeader = document.createElement("h3");
            todayHeader.textContent = "Today's Notes";
            notesList.appendChild(todayHeader);

            todaysNotes.forEach((note) => {
                addNoteToDOM(note);
            });
        }

        if (previousMonthNotes.length > 0) {
            const previousMonthHeader = document.createElement("h3");
            previousMonthHeader.textContent = "Previous Month's Notes";
            notesList.appendChild(previousMonthHeader);

            previousMonthNotes.forEach((note) => {
                addNoteToDOM(note);
            });
        }
    }

    function saveNoteToLocalStorage(note) {
        const notes = getNotesFromLocalStorage();
        notes.push(note);
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function getNotesFromLocalStorage() {
        return JSON.parse(localStorage.getItem("notes")) || [];
    }


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
            if (newContent !== null && newContent.trim() !== "") {
                notes[noteIndex].content = newContent.trim();
                saveNotesToLocalStorage(notes);

                const noteItem = document.querySelector(`[data-id="${noteId}"] .note-content`);
                noteItem.textContent = newContent.trim();
            }
        }
    }


    function saveNotesToLocalStorage(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    function deleteNoteFromDOM(noteId) {
        const notes = getNotesFromLocalStorage();
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        localStorage.setItem("notes", JSON.stringify(updatedNotes));

        const noteItem = document.querySelector(`[data-id="${noteId}"]`);
        if (noteItem) {
            noteItem.remove();
        }
    }

    newNoteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const noteContent = noteContentInput.value.trim();
        if (!noteContent) {
            alert("Please enter a note.");
            return;
        }

        const note = {
            id: Date.now(), 
            content: noteContent,
            date: new Date().toLocaleString(), 
        };

       
        saveNoteToLocalStorage(note);
        loadNotes(); 

        newNoteForm.reset();
    });


    loadNotes();
});