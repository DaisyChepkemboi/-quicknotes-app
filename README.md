# QuickNotes

QuickNotes is a simple, responsive note-taking web application built with HTML, CSS, and vanilla JavaScript. It allows users to create notes, organize them into Personal, Work, and Study categories, search notes by text, and delete individual notes. Notes are saved in the browser's localStorage, so they remain available after refreshing the page.

## Features

- Add notes with a category and creation date.
- Organize notes into Personal, Work, and Study categories.
- Validate notes to prevent empty entries and notes longer than 200 characters.
- Delete individual notes.
- Search notes without case sensitivity.
- Display an accurate count of all saved notes.
- Save and restore notes using browser localStorage.
- Responsive layout for desktop and mobile screens.
- Display a helpful message when a search returns no results.

## Technologies Used

- HTML5 — page structure and semantic elements.
- CSS3 — styling, Flexbox, category colours, and responsive design.
- JavaScript — DOM manipulation, events, validation, search, and note management.
- Browser localStorage — persistent note storage.
- Git and GitHub — version control and project hosting.

## How to Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR-GITHUB-USERNAME/quicknotes-app.git
   ```

2. Enter the project directory:

   ```bash
   cd quicknotes-app
   ```

3. Open `index.html` in your web browser.

No installation or build process is required.

## What I Learned

- How to structure a web page using semantic HTML5 elements and accessible form labels.
- How to style responsive layouts using CSS Flexbox and media queries.
- How to select DOM elements, handle form events, and create elements dynamically with JavaScript.
- How to manage an array of objects to add, display, search, and delete notes.
- How to validate user input and display useful error messages.
- How to persist application data using `localStorage`, `JSON.stringify()`, and `JSON.parse()`.
- How to use Git commits to track development progress and GitHub to host a project.