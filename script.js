
const noteForm = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const noteCategory = document.querySelector("#note-category");
const notesList = document.querySelector("#notes-list");
const noteCount = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");

let notes = [];

function render() {
    notesList.replaceChildren();

    notes.forEach(function (note) {
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

        // Delete only the note belonging to this button.
        deleteButton.addEventListener("click", function () {
            notes = notes.filter(function (item) {
                return item.id !== note.id;
            });

            render();
        });

        listItem.appendChild(categoryLabel);
        listItem.appendChild(noteText);
        listItem.appendChild(noteDate);
        listItem.appendChild(deleteButton);

        notesList.appendChild(listItem);
    });

    // Update the count message.
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

    // Reject empty notes.
    if (text.length === 0) {
        errorMessage.textContent = "Please type a note first.";
        return;
    }

    // Reject notes over 200 characters.
    if (text.length > 200) {
        errorMessage.textContent =
            "Notes must be 200 characters or fewer.";
        return;
    }

    // Clear any previous error.
    errorMessage.textContent = "";

    const newNote = {
        id: Date.now(),
        text: text,
        category: category,
        createdAt: new Date().toLocaleString()
    };

    notes.push(newNote);

    render();

    noteInput.value = "";
    noteInput.focus();
});
