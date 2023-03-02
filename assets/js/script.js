const plus = document.getElementById("plus");
const colors = document.getElementsByClassName("color");
const rotate = document.getElementById("rotate");
console.log(colors);
plus.addEventListener("click", () => {
  Array.from(colors).map((color) => {
    if (Array.from(color.classList).includes("show")) {
      color.classList.remove("show");
      color.classList.add("hide");
      rotate.classList.remove("rotate-in");
      rotate.classList.add("rotate-back");
      console.log("show");
    } else {
      color.classList.remove("hide");
      color.classList.add("show");
      rotate.classList.remove("rotate-back");
      rotate.classList.add("rotate-in");
      console.log("hide");
    }
  });
});

let index = 0;
let colorData = {};
let notesData = {};
function createNote(color) {
  const noteContainer = document.createElement("div");
  noteContainer.classList.add("note-container");
  noteContainer.id = `note-${index + 1}`;
  noteContainer.innerHTML = `
                <textarea class="note ${color}" id="note" cols="30" rows="10" onchange="handleChange(this.value, ${
    index + 1
  })"></textarea>
                <div class="date-time">${new Date().toDateString()} ${
    new Date().toTimeString().split(" ")[0]
  }</div>
                <button class="button ${color}" id="note-${
    index + 1
  }" onclick="deleteNote(this.id)"><i class="fas fa-trash"></i></button>
            `;
  noteContainer.style.backgroundColor = color;
  if (localStorage.getItem("colors") === null) {
    colorData[`note-${index + 1}`] = color;
    localStorage.setItem("colors", JSON.stringify(colorData));
    console.log("If");
  } else {
    let colors = localStorage.getItem("colors");
    colorsObj = JSON.parse(colors);
    colorsObj[`note-${index + 1}`] = color;
    localStorage.setItem("colors", JSON.stringify(colorsObj));
    console.log(colorsObj);
    console.log("Else");
  }
  document
    .getElementsByClassName("notes-container")[0]
    .appendChild(noteContainer);
  index++;
}

function displayNotes() {
  let notes = localStorage.getItem("notes");
  let colors = localStorage.getItem("colors");
  if (colors) {
    notesObj = JSON.parse(notes);
    colorsObj = JSON.parse(colors);
    for (let key in colorsObj) {
      if (notesObj === null) {
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");
        noteContainer.id = key;
        noteContainer.innerHTML = `
                        <textarea class="note ${
                          colorsObj[key]
                        }" id="note" cols="30" rows="10" onchange="handleChange(this.value, ${
          key.split("-")[1]
        })"></textarea>
                        <div class="date-time">${new Date().toDateString()} ${
          new Date().toTimeString().split(" ")[0]
        }</div>
                        <button class="button ${
                          colorsObj[key]
                        }" id="${key}" onclick="deleteNote(this.id)"><i class="fas fa-trash"></i></button>
                    `;
        noteContainer.style.backgroundColor = colorsObj[key];
        document
          .getElementsByClassName("notes-container")[0]
          .appendChild(noteContainer);
        index++;
      } else {
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note-container");
        noteContainer.id = key;
        noteContainer.innerHTML = `
                        <textarea class="note ${
                          colorsObj[key]
                        }" id="note" cols="30" rows="10" onchange="handleChange(this.value, ${
          key.split("-")[1]
        })">${notesObj[key] === undefined ? "" : notesObj[key]}</textarea>
                        <div class="date-time">${new Date().toDateString()} ${
          new Date().toTimeString().split(" ")[0]
        }</div>
                        <button class="button ${
                          colorsObj[key]
                        }" id="${key}" onclick="deleteNote(this.id)"><i class="fas fa-trash"></i></button>
                    `;
        noteContainer.style.backgroundColor = colorsObj[key];
        document
          .getElementsByClassName("notes-container")[0]
          .appendChild(noteContainer);
        index++;
      }
    }
  }
}
displayNotes();

function handleChange(value, id) {
  if (localStorage.getItem("notes") == null) {
    notesData[`note-${id}`] = value;
    localStorage.setItem("notes", JSON.stringify(notesData));
  } else {
    let notes = localStorage.getItem("notes");
    notesObj = JSON.parse(notes);
    notesObj[`note-${id}`] = value;
    localStorage.setItem("notes", JSON.stringify(notesObj));
  }
}

function deleteNote(id) {
  console.log(id);
  document.getElementById(id).remove();
  const notes = localStorage.getItem("notes");
  const colors = localStorage.getItem("colors");
  const notesObj = JSON.parse(notes);
  const colorsObj = JSON.parse(colors);
  delete colorsObj[id];
  if (notesObj !== null) {
    delete notesObj[id];
  }
  localStorage.setItem("notes", JSON.stringify(notesObj));
  localStorage.setItem("colors", JSON.stringify(colorsObj));
}
