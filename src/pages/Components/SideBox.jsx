import { useState, useEffect, useRef } from "react";
import CustomDrawer from "./CustomDrawer.jsx";
import "./sidebox.css";

const notAllowedWords = ["Copied!"];

function handleSearchWeb(word) {
  window.open(`https://www.google.com/search?q=${word}`, "_blank");
}

function emulateFind(word, findSelection, setFindSelection) {
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

function flagSelectedWord(parentNode, word) {
  const searchElements = parentNode;
  const special = /[\\[{().+*?|^$]/g;

  if (word !== "") {
    if (special.test(word)) word = word.replace(special, "\\$&");
    let regexp = new RegExp(word, "gi");

    searchElements.innerHTML = searchElements.innerText.replace(
      regexp,
      "<span  id='noema-clickable-element' >$&</span>"
    );
  }
}

function copyPasteWord(word) {
  window.navigator.clipboard.writeText(word);
}

function filterSelection() {
  const selectedNode = window.getSelection();
  const selectedText = selectedNode.toString().trim();

  if (selectedText.includes(notAllowedWords)) {
    selectedNode.removeAllRanges();
  }
}

function SideBox() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [copyAreaPosition, setCopyAreaPosition] = useState({
    x: 0,
    y: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [meaning, setMeaning] = useState(null);
  const copyAreaRef = useRef(null);
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  const [prevShow, setPrevShow] = useState(false);

  const findSelectionButton = useRef(null);
  const [findSelection, setFindSelection] = useState(true);

  useEffect(() => {
    function handleMouseUp(e) {
      const selectedNode = window.getSelection();
      const selectedText = selectedNode.toString().trim();
      const selectedWordParentNode = selectedNode.anchorNode.parentElement;

      flagSelectedWord(selectedWordParentNode, selectedText);

      filterSelection();
      if (selectedText && !notAllowedWords.includes(selectedText)) {
        setSelectedWord(selectedText);
        const clickableElements = document.querySelectorAll(
          "#noema-clickable-element"
        );
        console.log(clickableElements);
        clickableElements.forEach((element) => {
          element.addEventListener("click", () => {
            setCopyAreaPosition((prev) => {
              return {
                ...prev,
                x: element.offsetLeft,
                y: element.offsetTop,
              };
            });
            setMenuOpen(true);
            filterSelection();
          });
        });
      }
    }
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (copyAreaRef.current && !copyAreaRef.current.contains(event.target)) {
        copyAreaRef.current.classList.add("scale-out-bottom");
        //this setTimeout runs after the animation ends
        setTimeout(() => {
          setMenuOpen(false);
          setPrevShow(false);
        }, 110);
        if (findSelection) {
          emulateFind(selectedWord, findSelection, setFindSelection);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      copyAreaRef.current.classList.remove("scale-out-bottom");
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [copyAreaRef]);

  useEffect(() => {
    if (
      selectedWord &&
      selectedWord.split(" ").length <= 2 &&
      !notAllowedWords.includes(selectedWord)
    ) {
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`)
        .then((res) => res.json())
        .then((data) => {
          setMeaning(data[0]);
        });
    }
  }, [selectedWord]);

  return (
    <>
      {menuOpen ? (
        <div
          style={{
            display: "flex",
            backgroundColor: "#FAFAFA",
            position: "absolute",
            left: copyAreaPosition.x - 50,
            top: copyAreaPosition.y - 50,
          }}
          className="scale-in-bottom w-max select-none overflow-hidden rounded-lg font-sans text-black shadow-md shadow-gray-400 transition-all"
          ref={copyAreaRef}
        >
          {prevShow ? (
            <span
              className="cursor-pointer select-none !border-r-[0.5px] border-gray-700 p-4 duration-150 ease-in-out hover:bg-gray-200"
              onClick={() => {
                menu1.current.classList.remove("slide-out-left");
                menu2.current.classList.add("slide-out-right");
                setTimeout(() => {
                  menu2.current.classList.add("hide");
                  menu1.current.classList.remove("hide");
                  menu1.current.classList.add("slide-in-right");
                  setPrevShow(false);
                }, 100);
              }}
            >
              <div className="color-[#374151] flex h-2 w-2 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path
                    fill="#374151"
                    d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
                  />
                </svg>
              </div>
            </span>
          ) : null}

          <div className="flex" ref={menu1}>
            <span
              className="cursor-pointer select-none !border-r-[0.5px] border-gray-700 px-4 py-2 duration-150 ease-in-out hover:bg-gray-200"
              onClick={() => {
                copyPasteWord(selectedWord);
                copyAreaRef.current.classList.add("scale-out-bottom");
              }}
            >
              Copy
            </span>

            <span
              ref={findSelectionButton}
              className="cursor-pointer select-none !border-r-[0.5px] border-gray-700 px-4 py-2 duration-150 ease-in-out hover:bg-gray-200"
              onClick={() => {
                emulateFind(selectedWord, findSelection, setFindSelection);
              }}
            >
              {findSelection ? "Find Selection" : "Clear Selection"}
            </span>

            <span
              className="cursor-pointer select-none !border-r-[0.5px] border-gray-700 px-4 py-2 duration-150 ease-in-out hover:bg-gray-200"
              onClick={() => {
                setDrawerOpen(true);

                copyAreaRef.current.classList.add("scale-out-bottom");
              }}
            >
              Look Up
            </span>
          </div>

          <div className="hide flex" ref={menu2}>
            <span className="cursor-pointer select-none !border-r-[0.5px] border-gray-700 px-4 py-2 duration-150 ease-in-out hover:bg-gray-200">
              Translate
            </span>

            <span
              onClick={() => {
                handleSearchWeb(selectedWord);
              }}
              className="cursor-pointer select-none !border-r-[0.5px] border-gray-700 px-4 py-2 duration-150 ease-in-out hover:bg-gray-200"
            >
              Search Web
            </span>
          </div>
          {!prevShow ? (
            <span
              className="cursor-pointer select-none p-4 duration-150 ease-in-out hover:bg-gray-200"
              onClick={() => {
                menu2.current.classList.remove("slide-out-right");
                menu1.current.classList.add("slide-out-left");
                setTimeout(() => {
                  menu1.current.classList.add("hide");
                  menu2.current.classList.remove("hide");
                  menu2.current.classList.add("slide-in-right");
                  setPrevShow(true);
                }, 100);
              }}
            >
              <div className="color-[#374151] flex h-2 w-2 items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </div>
            </span>
          ) : null}
        </div>
      ) : null}

      {/* <div
        onClick={() => {
          setMenuOpen(true);
          filterSelection();
        }}
        style={{
          height: "2rem",
          width: selectedWord.length + "ch",
          backgroundColor: "transparent",
          position: "absolute",
          left: `calc(${copyAreaPosition.x}px - ${selectedWord.length / 2}ch)`,
          top: `calc(${copyAreaPosition.y}px - 1rem)`,
        }}
      ></div> */}

      <CustomDrawer
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        selectedWord={selectedWord}
        meaning={meaning}
      />
    </>
  );
}

export default SideBox;
