const addNote = document.querySelector(".add");
const wrapper = document.querySelector(".wrapper");
let storedNotes = JSON.parse(localStorage.getItem("notes"));

if (storedNotes) {
  storedNotes.forEach((note) => {
    addNotes(note);
  });
}

addNote.addEventListener("click", () => {
  addNotes();
});

function addNotes(text = "") {
  let div = document.createElement("div");
  div.classList.add("notes");
  div.innerHTML = `
  <div class="tools">
    <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
    <button class="delete"><i class="fa-solid fa-trash"></i></button>
  </div>
  <div class="container">
    <div class="text-container hidden"></div>
    <div class="text-content">
      <textarea></textarea>
    </div>
  </div>`;
  wrapper.appendChild(div);

  const edit = div.querySelector(".edit");
  const del = div.querySelector(".delete");
  const textMarker = div.querySelector(".text-container");
  const textArea = div.querySelector("textarea");
  textArea.value = text;
  textMarker.innerHTML = marked.parse(text);

  edit.addEventListener("click", () => {
    textMarker.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;
    textMarker.innerHTML = marked.parse(value);
    updateLocalStorage();
  });

  del.addEventListener("click", (e) => {
    div.remove();
    updateLocalStorage();
  });
}

function updateLocalStorage() {
  const allTextNotes = document.querySelectorAll("textarea");
  let notesArr = [];
  allTextNotes.forEach((note) => {
    notesArr.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notesArr));
}
