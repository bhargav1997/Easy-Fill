// var port = chrome.runtime.connect({ name: 'popup' });

document.addEventListener('DOMContentLoaded', function () {
   // Event listener for form fill button click
   document.getElementById('fillFormBtn').addEventListener('click', function () {
      // Get all field containers
      const fieldContainers = document.querySelectorAll('.fieldContainer');

      // Loop through each field container
      fieldContainers.forEach(function (container) {
         console.log('container', container);
         // Get field type and value
         let fieldType = container.querySelector('label').getAttribute('data-field-type');
         let fieldValue = container.querySelector('input').value;

         console.log('fieldType', fieldType);
         console.log('fieldValue', fieldValue);

         // Check if corresponding input and label elements exist on the page
         let inputExists = document.querySelector(`input[name="${fieldType}"]`);
         let labelExists = document.querySelector(`label[for="${fieldType}"]`);

         // If both input and label elements exist, auto-fill the form
         if (inputExists && labelExists) {
            // Get all input elements inside the container
            const allInputs = document.querySelectorAll('input');

            // Loop through each input element
            allInputs.forEach(function (input) {
               console.log('input', input);
               // Get input name and value
               const inputName = input.name;
               const testIn = inputName.toLowerCase();

               if (testIn === fieldType.toLowerCase()) {
                  // Check if corresponding label exists for the input
                  const labelExistsOfDom = document.querySelector(`label[for="${inputName}"]`);
                  const fieldExistsOfDom = document.querySelector(`input[for="${inputName}"]`);

                  // If label exists, log the input name and value
                  if (labelExists) {
                     console.log(`Field Name: ${inputName}, Field Value: ${fieldValue}`);
                     setInputValue(inputName, fieldValue);
                  }
               }
            });
         }
      });

      console.log('clicked..');
      // Send a message to the content script to fill the form
      //   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //       console.log('tabs',tabs);
      //       chrome.runtime.sendMessage({ action: 'fill_form' });
      //   });
   });

   document.getElementById('addFieldBtn').addEventListener('click', function () {
      // Prompt user for field name and value
      var fieldName = prompt('Enter field name:', 'Username');
      var fieldValue = prompt('Enter field value:', 'Bhau712');

      // Validate input fields
      if (fieldName && fieldValue) {
         // Create input field, label, and delete button dynamically
         createInputField(fieldName, fieldValue);

         // Save the new data to chrome storage
         var newData = {};
         newData[fieldName] = fieldValue;
         chrome.storage.sync.set({ ['key']: newData });
      } else {
         alert('Please enter both field name and value.');
      }
   });

   // Use event delegation for the delete buttons
   document.getElementById('fieldsContainerForm').addEventListener('click', function (event) {
      if (event.target && event.target.matches('button.deleteBtn')) {
         // Get the parent field container of the clicked button
         const fieldContainer = event.target.closest('.fieldContainer');

         // If the field container exists, remove it
         if (fieldContainer) {
            fieldContainer.remove();
            console.log('Field container deleted.');
            // Delete the field from chrome storage
            chrome.storage.sync.remove(fieldContainer);
         }
      }
   });

   // Function to create input field and delete button dynamically
   function createInputField(name, value) {
      // var container = document.getElementById('fieldContainer');
      var containerFields = document.getElementById('fieldsContainerForm');

      var label = document.createElement('label');
      label.innerText = name + ':';
      label.setAttribute('data-field-type', name);
      label.setAttribute('for', name);

      var input = document.createElement('input');
      input.type = 'text';
      input.value = value || '';
      input.name = name;
      input.setAttribute('data-field-type', name);

      var deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('deleteBtn'); // Add a class for event delegation
      deleteButton.dataset.field = name; // Store the field name as a data attribute
      deleteButton.setAttribute('data-field-type', name);

      var container = document.createElement('div');
      container.classList.add('fieldContainer');

      container.appendChild(label);
      container.appendChild(input);
      container.appendChild(deleteButton);
      containerFields.appendChild(container);
   }

   // port.postMessage({ message: 'Hello from popup!' });

   // port.onMessage.addListener(function (msg) {
   //     console.log('Message from background:', msg);
   // });

   // Function to set value of an input field
   function setInputValue(inputName, inputValue) {
      // Find the input element with the specified name
      const inputElement = document.querySelector(`input[name="${inputName}"]`);

      // If the input element exists, set its value
      if (inputElement) {
         inputElement.value = inputValue;
      }
   }
});
