import "../../style.css";
import { useState, useRef, useEffect } from "react";
import CustomDrawer from "../Components/CustomDrawer";
import { emulateFind, filterSelection } from "./helpers";
import { NOT_ALLOWED_WORDS } from "./constants";
import { useMeaning } from "./hooks";
import Menu from "../Components/Menu";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [copyAreaPosition, setCopyAreaPosition] = useState({
    x: 0,
    y: 0,
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const meaning = useMeaning(selectedWord);
  const copyAreaRef = useRef(null);

  const [prevShow, setPrevShow] = useState(false);
  const [findSelection, setFindSelection] = useState(true);
  const [enableExtension, setEnableExtension] = useState(true);

  useEffect(() => {
    function handleMouseUp(e) {
      const selectedText = window.getSelection().toString().trim();
      filterSelection();
      if (selectedText && !NOT_ALLOWED_WORDS.includes(selectedText)) {
        setSelectedWord(selectedText);
        setCopyAreaPosition((prev) => ({
          ...prev,
          x: e.pageX,
          y: e.pageY,
        }));
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
        copyAreaRef.current?.classList.add("scale-out-bottom");
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
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [copyAreaRef]);

  useEffect(() => {
    function handleMessage(res, port) {
      let response;
      console.log({ res: res });
      if (res.action === "checkExtensionStatus") {
        response = enableExtension ? "extensionEnabled" : "extensionDisabled";
      } else if (res.action === "toggleExtension") {
        setEnableExtension(res.enableExtension);
      }

      if (response) {
        port.postMessage({ response });
        console.log({ message: response });
      }
    }

    chrome.runtime.onConnect.addListener((port) => {
      port.onMessage.addListener((res) => {
        try {
          handleMessage(res, port);
        } catch (error) {
          console.error("Error handling message:", error);
        }
      });
    });
  }, [enableExtension]);

  return enableExtension ? (
    <>
      <Menu
        menuOpen={menuOpen}
        prevShow={prevShow}
        copyAreaRef={copyAreaRef}
        selectedWord={selectedWord}
        setFindSelection={setFindSelection}
        findSelection={findSelection}
        copyAreaPosition={copyAreaPosition}
        setDrawerOpen={setDrawerOpen}
        setPrevShow={setPrevShow}
      />

      <div
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
      ></div>

      <CustomDrawer
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        selectedWord={selectedWord}
        meaning={meaning}
      />
    </>
  ) : null;
}

export default App;
