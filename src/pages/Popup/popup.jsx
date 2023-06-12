import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../../style.css";
import signIn from "./signIn";
import PrimaryBtn from "../Components/PrimaryButton";
import logout from "./logout";
const App = () => {
  const [LoggedIn, setLoggedIn] = useState(false);

  const checkLogin = async () => {
    const result = await chrome.storage.sync.get(["AUTH_ACCESS_TOKEN"]);
    if (result.AUTH_ACCESS_TOKEN !== undefined) {
      setLoggedIn(true);
    }
  };
  checkLogin();

  const start = () => {
    if (LoggedIn) {
      //Send a message to the content script to inject a section in the main dom.
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({
          showSideBox: true,
        });
        // port.onMessage.addListener((res) => {});
      });
    }
  };

  return (
    <section className="flex w-full flex-col justify-start gap-4 bg-slate-800 px-8 py-4 text-green-600 ">
      <h1 className="text-lg ">ReadMojo</h1>
      {LoggedIn ? (
        <div className="flex flex-col items-center justify-start gap-2">
          <PrimaryBtn btnText={"Start"} handleClick={start} />
          <PrimaryBtn
            btnText={"Logout"}
            handleClick={logout}
            handleProps={setLoggedIn}
          />
        </div>
      ) : (
        <PrimaryBtn
          btnText={"Sign In"}
          handleClick={signIn}
          handleProps={setLoggedIn}
        >
          Sign In
        </PrimaryBtn>
      )}
    </section>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
