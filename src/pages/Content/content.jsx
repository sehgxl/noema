import { useState } from "react";
import SideBox from "../Components/SideBox";
import "../../style.css";

const App = () => {
  const [showSideBox, setShowSideBox] = useState(false);
  // Listener waiting to inject a section in the main dom tree
  chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((res) => {
      if (res.showSideBox === true) {
        setShowSideBox(true);
      }
    });
  });

  return showSideBox ? <SideBox setShowSideBox={setShowSideBox} /> : null;
};

export default App;
