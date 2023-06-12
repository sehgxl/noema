import { Readability } from "@mozilla/readability";
import PrimaryBtn from "./PrimaryButton";
import { useState } from "react";
import { AiOutlineCloseSquare as CloseIcon } from "react-icons/ai";
import { BsDashSquare as MinimiseIcon } from "react-icons/bs";
import { MdContentCopy as CopyIcon } from "react-icons/md";
const SideBox = ({ setShowSideBox }) => {
  const [Summary, setSummary] = useState("");
  const [showSmry, setShowSmry] = useState(false);
  const getSummary = () => {
    //call api and get summary back of that article
    let documentClone = document.cloneNode(true);
    let article = new Readability(documentClone).parse();
    setSummary("This is the summary text by the api.");
    setShowSmry(true);
  };
  return (
    <section className="fixed bottom-2 right-2 z-10 flex w-72 flex-col items-center justify-start bg-slate-800 px-8 pb-4 pt-9 text-green-600">
      <div className="absolute right-2  top-2 flex flex-row gap-2 ">
        {showSmry ? (
          <MinimiseIcon
            onClick={() => {
              setShowSmry(false);
            }}
            className="scale-[1.3] cursor-pointer"
          />
        ) : null}
        <CloseIcon
          onClick={() => {
            setShowSideBox(false);
          }}
          className="scale-[1.3] cursor-pointer"
        />
      </div>
      {showSmry ? (
        <PrimaryBtn
          btnText={"Get Summary Again"}
          handleClick={getSummary}
          handleProps={Summary}
        />
      ) : (
        <PrimaryBtn
          btnText={"Get Summary"}
          handleClick={getSummary}
          handleProps={Summary}
        />
      )}
      {showSmry ? (
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-center">{Summary}</p>
          <CopyIcon
            onClick={() => {
              navigator.clipboard.writeText(Summary);
            }}
            className="scale-[1.3] cursor-pointer"
          />
        </div>
      ) : null}
    </section>
  );
};

export default SideBox;
