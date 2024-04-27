import { NOT_ALLOWED_WORDS } from "./constants";

export function handleSearchWeb(word) {
  window.open(`https://www.google.com/search?q=${word}`, "_blank");
}

export function emulateFind(word, findSelection, setFindSelection) {
  const searchElements = document.body.querySelectorAll(
    "p, h1, h2, h3, h4, h5, h6"
  );
  const special = /[\\[{().+*?|^$]/g;

  if (findSelection && word !== "") {
    if (special.test(word)) word = word.replace(special, "\\$&");
    let regexp = new RegExp(word, "gi");

    searchElements.forEach((element) => {
      element.innerHTML = element.innerText.replace(regexp, "<mark>$&</mark>");
    });
    setFindSelection(false);
  } else {
    if (special.test(word)) word = word.replace(special, "\\$&");
    let regexp = new RegExp(`<mark>${word}</mark>`, "gi");

    searchElements.forEach((element) => {
      element.innerHTML = element.innerText.replace(regexp, word);
    });

    setFindSelection(true);
  }
}

export function copyPasteWord(word) {
  window.navigator.clipboard.writeText(word);
}


//This prevents copying wrong text when clicked very rapidly
export function filterSelection() {
  const selectedNode = window.getSelection();
  const selectedText = selectedNode.toString().trim();

  if (selectedText.includes(NOT_ALLOWED_WORDS)) {
    selectedNode.removeAllRanges();
  }
}