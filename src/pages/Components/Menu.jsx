import { useRef } from "react";
import MenuButton from "../Components/MenuButton";
import ChevronLeft from "../Components/ChevronLeft";
import ChevronRight from "../Components/ChevronRight";
import {
  copyPasteWord,
  handleSearchWeb,
  emulateFind,
} from "../Content/helpers";

const Menu = ({
  menuOpen,
  prevShow,
  copyAreaRef,
  selectedWord,
  setFindSelection,
  findSelection,
  copyAreaPosition,
  setDrawerOpen,
  setPrevShow,
}) => {
  const menu1 = useRef(null);
  const menu2 = useRef(null);
  function handleCopy() {
    copyPasteWord(selectedWord);
    copyAreaRef.current?.classList.add("scale-out-bottom");
  }

  function handleFindSelection() {
    emulateFind(selectedWord, findSelection, setFindSelection);
  }

  function handleLookUp() {
    setDrawerOpen(true);
    copyAreaRef.current?.classList.add("scale-out-bottom");
  }

  function handleSearchWebClick() {
    handleSearchWeb(selectedWord);
  }

  function handleNextButtonClick() {
    menu2?.current?.classList.remove("slide-out-right");
    menu1?.current?.classList.add("slide-out-left");
    setTimeout(() => {
      menu1?.current?.classList.add("hide");
      menu2?.current?.classList.remove("hide");
      menu2?.current?.classList.add("slide-in-right");
      setPrevShow(true);
    }, 100);
  }

  function handlePrevButtonClick() {
    menu1?.current?.classList.remove("slide-out-left");
    menu2?.current?.classList.add("slide-out-right");
    setTimeout(function () {
      menu2?.current?.classList.add("hide");
      menu1?.current?.classList.remove("hide");
      menu1?.current?.classList.add("slide-in-left");
      setPrevShow(false);
    }, 100);
  }

  return menuOpen ? (
    <div
      style={{
        left: `calc(${copyAreaPosition.x}px - ${selectedWord.length / 2}ch)`,
        top: `calc(${copyAreaPosition.y}px - 3.2rem)`,
      }}
      className="scale-in-bottom absolute flex select-none overflow-hidden rounded-lg bg-[#FAFAFA] font-sans text-black shadow-md shadow-gray-400 transition-all w-max"
      ref={copyAreaRef}
    >
      {prevShow ? (
        <MenuButton
          type="icon"
          buttonText={<ChevronLeft />}
          handleClick={handlePrevButtonClick}
        />
      ) : null}

      <div className="flex" ref={menu1}>
        <MenuButton buttonText={"Copy"} handleClick={handleCopy} />
        <MenuButton
          buttonText={findSelection ? "Find Selection" : "Clear Selection"}
          handleClick={handleFindSelection}
        />
        <MenuButton buttonText={"Look Up"} handleClick={handleLookUp} />
      </div>

      <div className="hide flex" ref={menu2}>
        <MenuButton
          rightBorder={"none"}
          buttonText={"Search Web"}
          handleClick={handleSearchWebClick}
        />
      </div>
      {!prevShow ? (
        <MenuButton
          type="icon"
          rightBorder={"none"}
          buttonText={<ChevronRight />}
          handleClick={handleNextButtonClick}
        />
      ) : null}
    </div>
  ) : null;
};

export default Menu;
