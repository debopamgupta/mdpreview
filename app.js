const previewWindow = document.querySelector("#preview");
const textAreaInput = document.querySelector("#editor-textarea");

function getTextInput() {
  const text = this.value;
  sanitizeInput(text);
}

function sanitizeInput(text) {
  let clean = "";
  clean = DOMPurify.sanitize(text);

  parseAndDisplay(clean);
  store(clean);
}

function parseAndDisplay(text) {
  previewWindow.innerHTML = marked.parse(text);
}

function store(text) {
  localStorage.setItem("markdown", text);
}

textAreaInput.addEventListener("input", getTextInput);

// get last stored markdown else show default message
textAreaInput.defaultValue =
  localStorage.getItem("markdown") ||
  "# MD Preview\n \n## Hello World\n \nThis is a markdown previewer.\n <!-- Paste/Type your markdown here -->";
parseAndDisplay(textAreaInput.defaultValue);
