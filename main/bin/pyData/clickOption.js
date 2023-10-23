const targetValue = 'A';

// Find the radio button element based on its value
const radioButton = document.querySelector(`input[type="radio"][value="${targetValue}"]`);

// Check the radio button
if (radioButton) {
  radioButton.checked = true;
}
