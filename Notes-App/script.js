document.addEventListener("DOMContentLoaded", () => {
    const notesList = document.getElementById("notes-list");
    const newNoteForm = document.getElementById("new-note-form");
    const noteContentInput = document.getElementById("note-content");
    const noteCategoryInput = document.getElementById("note-category");
    const filterCategoryInput = document.getElementById("filter-category");
    const searchBar = document.getElementById("search-bar");

    // Load notes from localStorage
    function getNotesFromLocalStorage() {
        return JSON.parse(localStorage.getItem("notes")) || [];
    }

    // Save notes to localStorage
    function saveNotesToLocalStorage(notes) {
        localStorage.setItem("notes", JSON.stringify(notes));
    }

    // Render notes
    function renderNotes(filter = "All", searchTerm = "") {
        const notes = getNotesFromLocalStorage();
        notesList.innerHTML = "";

        const filteredNotes = notes.filter(note => {
            const matchesCategory = filter === "All" || note.category === filter;
            const matchesSearch = note.content.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        filteredNotes.forEach(note => {
            addNoteToDOM(note);
        });
    }

    // Add a note to the DOM
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

    // Add a new note
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

    // Filter notes by category
    filterCategoryInput.addEventListener("change", () => {
        const selectedCategory = filterCategoryInput.value;
        const searchTerm = searchBar.value;
        renderNotes(selectedCategory, searchTerm);
    });

    // Search notes by content
    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value;
        const selectedCategory = filterCategoryInput.value;
        renderNotes(selectedCategory, searchTerm);
    });

    // Load notes on page load
    renderNotes();
});