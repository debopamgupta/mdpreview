const previewWindow = document.querySelector("#preview");
const textAreaInput = document.querySelector("#editor-textarea");
const copyButton = document.querySelector("#copybtn");

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
  "# MD Preview\n \n## Hello World\n \nThis is a markdown previewer.\nCopy your markdown with the top right copy button.\n <!-- Paste/Type your markdown here -->";
parseAndDisplay(textAreaInput.defaultValue);

copyButton.addEventListener("click", function () {
  // copy raw text to clipboard
  textAreaInput.select();
  textAreaInput.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(textAreaInput.value);
});
