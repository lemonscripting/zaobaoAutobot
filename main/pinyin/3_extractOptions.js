// Select all option elements
const optionElements = document.querySelectorAll('.quiz_question .mcq_options_container input[type="radio"]');

// Initialize a two-dimensional array to store option text and "name" attribute
const optionsArray = [];

// Iterate through each option element and extract information
optionElements.forEach((optionElement) => {
  // Traverse to find the option text
  const optionTextElement = optionElement.closest('tr').querySelector('.mcq_option_text.vedit_text');

  if (optionTextElement) {
    // Get the option text
    const optionText = optionTextElement.textContent.trim();

    // Get the "name" attribute value
    const nameAttribute = optionElement.getAttribute('name');

    // Store option text and "name" attribute in an array
    optionsArray.push([optionText, nameAttribute]);
  } else {
    console.error('Error: Unable to find option text element for an option element');
  }
});

console.log('Options Array:', optionsArray);