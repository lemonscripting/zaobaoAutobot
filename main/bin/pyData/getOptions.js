// Find all the containers for the radio button options
const optionsContainers = document.querySelectorAll('.mcq_options_container');

// Create a 2-dimensional array to store the option text for each question
const optionTextsArray = [];

// Loop through each options container (for each question)
optionsContainers.forEach(optionsContainer => {
  // Find all the radio button elements within the container
  const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
  
  // Create an array to store the option text for this question
  const optionTexts = [];
  
  // Loop through the radio buttons and extract the corresponding text
  radioButtons.forEach(radioButton => {
    // Get the text associated with the radio button
    const textElement = radioButton.parentNode.nextElementSibling;
    const optionText = textElement.textContent.trim();
    
    // Push the text into the array
    optionTexts.push(optionText);
  });
  
  // Push the array of option text for this question into the 2-dimensional array
  optionTextsArray.push(optionTexts);
});

// Now the optionTextsArray contains the option text for each question
console.log(optionTextsArray);
