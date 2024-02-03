chrome.runtime.onInstalled.addListener(function () {
    console.log('Extension installed.');
  });
  

  chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs && tabs.length > 0) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: yourContentScriptFunction,
        });
      } else {
        console.error('No valid tabs found.');
      }
    });
  });
  
  function yourContentScriptFunction() {
    // Your content script logic here
    console.log('it works')
  }
  

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'fill_form') {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs && tabs.length > 0) {
                chrome.storage.sync.get(["key"]).then((formData) => {
                    console.log('formData',formData);
                    chrome.scripting.executeScript({
                        target: { tabId: tabs[0].id },
                        function: fillFormFunction,
                        args: [formData]
                    });
                });
            }
        });
    }
});

function fillFormFunction(formData) {
    // Your auto-fill logic here
    // For example:
    for (const [fieldName, fieldValue] of Object.entries(formData)) {
        var element = document.getElementById(fieldName);
        if (element) {
            element.value = fieldValue;
        }
    }
}