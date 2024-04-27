const button = document.getElementById("noema-extension-toggle-btn")

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const port = chrome.tabs.connect(tabs[0].id);
  port.postMessage({
    action: "checkExtensionStatus",
  });


  port.onMessage.addListener((res) => {
    if (res.response === "extensionEnabled") {
      button.innerText = "Disable Extension";
    }
    if (res.response === "extensionDisabled") {
      button.innerText = "Enable Extension";
    }
  });
});





button.addEventListener("click", (e) => {
  const buttonText = button.innerText

  if (buttonText === "Disable Extension") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const port = chrome.tabs.connect(tabs[0].id);
      port.postMessage({
        action: "toggleExtension",
        enableExtension: false
      });
    });

    button.innerText = "Enable Extension";
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const port = chrome.tabs.connect(tabs[0].id);
      port.postMessage({
        action: "toggleExtension",
        enableExtension: true
      });
    });

    button.innerText = "Disable Extension";
  }

})
