document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes-list");
    const newNoteForm = document.getElementById("new-note-form");
    const noteContentInput = document.getElementById("note-content");
    const noteCategoryInput = document.getElementById("note-category");
    const filterCategoryInput = document.getElementById("filter-category");
    const searchBar = document.getElementById("search-bar");


    function getNotesFromLocalStorage() {
        return JSON.parse(localStorage.getItem("notes")) || [];
    }

 
    function saveNotesToLocalStorage(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

   
    function renderNotes(filter = "All", searchTerm = "") {
        const notes = getNotesFromLocalStorage();
        notesList.innerHTML = "";
        const sortedNotes = notes.sort((a, b) => b.id - a.id);

        const filteredNotes = notes.filter(note => {
            const matchesCategory = filter === "All" || note.category === filter;
            const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        filteredNotes.forEach(note => {
            addNoteToDOM(note);
        });
    }

  
    function addNoteToDOM(note) {
        const noteItem = document.createElement("li");
        noteItem.classList.add("note-item");
        noteItem.setAttribute("data-id", note.id);
        noteItem.innerHTML = `
            <span class="note-content">${note.content}</span>
            <span class="note-category" data-category="${note.category}">(${note.category})</span>
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
        const noteIndex = notes.findIndex(note => note.id === noteId);

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

    
    function deleteNoteFromDOM(noteId) {
        const notes = getNotesFromLocalStorage();
        const updatedNotes = notes.filter(note => note.id !== noteId);
        saveNotesToLocalStorage(updatedNotes);

        const noteItem = document.querySelector(`[data-id="${noteId}"]`);
        if (noteItem) {
            noteItem.remove();
        }
    }

 
    newNoteForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const noteContent = noteContentInput.value.trim();
        const noteCategory = noteCategoryInput.value;

        if (!noteContent) {
            alert("Please enter a note.");
            return;
        }

        const note = {
            id: Date.now(),
            content: noteContent,
            category: noteCategory,
            date: new Date().toLocaleString(),
        };

        const notes = getNotesFromLocalStorage();
        notes.push(note);
        saveNotesToLocalStorage(notes);

        renderNotes();
        newNoteForm.reset();
    });


    filterCategoryInput.addEventListener("change", () => {
        const selectedCategory = filterCategoryInput.value;
        const searchTerm = searchBar.value;
        renderNotes(selectedCategory, searchTerm);
    });


    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value;
        const selectedCategory = filterCategoryInput.value;
        renderNotes(selectedCategory, searchTerm);
    });

    renderNotes();
});
