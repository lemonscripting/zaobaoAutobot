const optionsContainers = document.querySelectorAll('.mcq_options_container');
const optionTextsArray = [];

optionsContainers.forEach(optionsContainer => {
  const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
  const optionTexts = [];
  
  radioButtons.forEach(radioButton => {
    const textElement = radioButton.parentNode.nextElementSibling;
    const optionText = textElement.textContent.trim();
    optionTexts.push(optionText);
  });

  // Check if the question involves 华文字 or 拼音
  const chineseCharacterQuestion = optionTexts.some(text => /[\u4e00-\u9fa5]/.test(text));
  
  // If it's a 华文字 question, add the 华文字 itself as an option
  if (chineseCharacterQuestion) {
    optionTexts.unshift("sentence");
  } else {
    optionTexts.unshift("pinyin");
  }
  
  // Push the array of options for the current question
  optionTextsArray.push(optionTexts);
});

console.log(optionTextsArray);