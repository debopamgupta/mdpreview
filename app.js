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
}

function parseAndDisplay(text) {
  previewWindow.innerHTML = marked.parse(text);
}

textAreaInput.addEventListener("input", getTextInput);

textAreaInput.defaultValue =
  "# MD Preview\n \n## Hello World\n \nThis is a markdown previewer.\n <!-- Paste/Type your markdown here -->";
parseAndDisplay(textAreaInput.defaultValue);
