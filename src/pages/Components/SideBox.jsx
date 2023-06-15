import PrimaryBtn from "./PrimaryButton";
import { useState } from "react";
import { AiOutlineCloseSquare as CloseIcon } from "react-icons/ai";
import { BsDashSquare as MinimiseIcon } from "react-icons/bs";
import { MdContentCopy as CopyIcon } from "react-icons/md";
import { BsArrowUpRightSquare as EnlargeIcon } from "react-icons/bs";

import getSummary from "./getSummary";
const SideBox = ({ setShowSideBox }) => {
  const [Summary, setSummary] = useState("");
  const [showSmry, setShowSmry] = useState(false);
  const [Loading, setLoading] = useState(false);

  return (
    <section className="fixed bottom-2 right-2 z-10 flex w-72 flex-col items-center justify-start bg-slate-800 px-2 pb-4 pt-9 text-green-600">
      <div className="absolute right-2  top-2 flex flex-row gap-2 ">
        {showSmry ? (
          <MinimiseIcon
            onClick={() => {
              setShowSmry(false);
            }}
            className="scale-[1.3] cursor-pointer"
          />
        ) : Summary !== "" ? (
          <EnlargeIcon
            onClick={() => {
              setShowSmry(true);
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
          setSummary={setSummary}
          setLoading={setLoading}
          setShowSmry={setShowSmry}
        />
      ) : (
        <PrimaryBtn
          btnText={"Get Summary"}
          handleClick={getSummary}
          setSummary={setSummary}
          setLoading={setLoading}
          setShowSmry={setShowSmry}
        />
      )}
      <div className="mt-4">
        {Loading ? (
          <div className="flex flex-col items-center justify-start">
            <p>Loading...</p>
          </div>
        ) : null}
        {showSmry ? (
          <div className="flex h-96 flex-col items-center justify-start gap-4">
            <p className="h-full overflow-scroll px-2 text-justify text-base">
              {Summary}
            </p>
            <CopyIcon
              onClick={() => {
                const unsecuredCopyToClipboard = (text) => {
                  const textArea = document.createElement("textarea");
                  textArea.value = text;
                  document.body.appendChild(textArea);
                  textArea.focus();
                  textArea.select();
                  try {
                    document.execCommand("copy");
                  } catch (err) {
                    console.error("Unable to copy to clipboard", err);
                  }
                  document.body.removeChild(textArea);
                };

                const copyToClipboard = (content) => {
                  if (window.isSecureContext && navigator.clipboard) {
                    navigator.clipboard.writeText(content);
                  } else {
                    unsecuredCopyToClipboard(content);
                  }
                };
                copyToClipboard(Summary);
              }}
              className="scale-[1.3] cursor-pointer"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default SideBox;
