
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

const STORAGE_KEY = "quicknotes-notes";

function loadNotes() {
    try {
        const savedNotes = localStorage.getItem(STORAGE_KEY);

        if (!savedNotes) {
            return [];
        }

        const parsedNotes = JSON.parse(savedNotes);

        // Avoid using invalid data from localStorage.
        if (!Array.isArray(parsedNotes)) {
            return [];
        }

        return parsedNotes.filter(function (note) {
            return (
                note &&
                typeof note.id === "number" &&
                typeof note.text === "string" &&
                ["personal", "work", "study"].includes(note.category) &&
                typeof note.createdAt === "string"
            );
        });
    } catch (error) {
        console.error("Could not load saved notes:", error);
        return [];
    }
}

let notes = loadNotes();

function saveNotes() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error("Could not save notes:", error);
        errorMessage.textContent =
            "Could not save notes. Check your browser storage settings.";
    }
}

function render() {
    notesList.replaceChildren();

    const searchTerm = searchInput.value.trim().toLowerCase();

    const filteredNotes = notes.filter(function (note) {
        return note.text.toLowerCase().includes(searchTerm);
    });

    if (filteredNotes.length === 0 && searchTerm !== "") {
        const emptyItem = document.createElement("li");
        emptyItem.textContent = "No notes match your search.";
        notesList.appendChild(emptyItem);
    } else {
        filteredNotes.forEach(function (note) {
            const listItem = document.createElement("li");
            listItem.classList.add("note-card", `category-${note.category}`);

            const categoryLabel = document.createElement("span");
            categoryLabel.classList.add("note-category");
            categoryLabel.textContent = note.category;

            const noteText = document.createElement("p");
            noteText.textContent = note.text;

            const noteDate = document.createElement("small");
            noteDate.classList.add("note-date");
            noteDate.textContent = note.createdAt;

            const deleteButton = document.createElement("button");
            deleteButton.type = "button";
            deleteButton.classList.add("delete-btn");
            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", function () {
                notes = notes.filter(function (item) {
                    return item.id !== note.id;
                });

                saveNotes();
                render();
            });

            listItem.appendChild(categoryLabel);
            listItem.appendChild(noteText);
            listItem.appendChild(noteDate);
            listItem.appendChild(deleteButton);

            notesList.appendChild(listItem);
        });
    }

    if (notes.length === 0) {
        noteCount.textContent = "You have no notes yet.";
    } else if (notes.length === 1) {
        noteCount.textContent = "You have 1 note.";
    } else {
        noteCount.textContent = `You have ${notes.length} notes.`;
    }
}

noteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const text = noteInput.value.trim();
    const category = noteCategory.value;

    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    saveNotes();
    render();

    noteInput.value = "";
    noteInput.focus();
});

searchInput.addEventListener("input", render);

// Display saved notes when the page opens.
render();
