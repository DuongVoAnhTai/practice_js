function init() {
    addNote()
    loadNotes()
}

const $ = document.querySelector.bind(document)
let notes = []

const noteForm = $('.note-form')
const noteList = $('.note-list')

const addBtn = $('.add-btn')
const deleteBtn = $('.delete-btn')
const save = $('.save-btn')

const noteTitle = $('.note-title-input')
const noteContent = $('.note-content-input')

function handleAddBtn() {
    if(getComputedStyle(noteForm).display === 'none') {
        noteList.style.display = 'none'
        noteForm.style.display = 'block'
    }
    else {
        noteForm.style.display = 'none'
        noteList.style.display = 'block'
    }
}

function handleDeleteBtn() {
    const index = notes.findIndex(note => note.title === noteTitle.value && note.content === noteContent.value);
    const note = notes[index]
    console.log(notes[index]);
    noteTitle.value = note.title
    noteContent.value = note.content

    notes.splice(index, 1)

    noteTitle.value = ''
    noteContent.value = ''

    noteForm.style.display = 'none'
    noteList.style.display = 'block'
    saveNotes()
    displayNotes()
}

function handleSaveBtn() {
    addNote()
    saveNotes()
    displayNotes()
}

function handleChooseNoteItem(index) {
    const note = notes[index]
    noteTitle.value = note.title
    noteContent.value = note.content
    
    noteList.style.display = 'none'
    noteForm.style.display = 'block'
}

function addNote() {
    const title = noteTitle.value
    const content = noteContent.value
    if(title || content) {
        notes.push({
            title,
            content
        })
        noteTitle.value = ''
        noteContent.value = ''
        noteForm.style.display = 'none'
        noteList.style.display = 'block'
    }
}

function displayNotes() {
    noteList.innerHTML = ''
    const template = notes.map((item, index) => 
        `
            <li>
                <button onclick="handleChooseNoteItem(${index})" class="note-item-btn">
                    ${item.title}
                </button>
            </li>
        `
    ).join('')
    noteList.innerHTML = template
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes))
}

function loadNotes() {
    notes = JSON.parse(localStorage.getItem('notes')) || []
    displayNotes()
}

init()

