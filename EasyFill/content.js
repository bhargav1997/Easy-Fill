// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log('Message received:', request);
        // Retrieve field-value pairs from chrome storage
        chrome.storage.sync.get(null, function (data) {
            // Loop through the stored data and fill the corresponding form fields
            Object.keys(data).forEach(function (fieldName) {
                var fieldValue = data[fieldName];
                var fieldElement = document.getElementById(fieldName);

                // Check if the field element exists on the page
                if (fieldElement) {
                    // Autofill the form field
                    fieldElement.value = fieldValue;
                }
            });
        });
    }
);

