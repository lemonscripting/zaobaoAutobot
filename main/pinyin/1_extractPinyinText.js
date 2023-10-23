// Function to process the quiz questions
function processQuizQuestions() {
    const optionsContainers = document.querySelectorAll('.mcq_options_container');
    const optionTextsArray = [];
    const pinyinText = []; // Array to store pinyin text
  
    optionsContainers.forEach((optionsContainer, index) => {
      const radioButtons = optionsContainer.querySelectorAll('input[type="radio"]');
      const optionTexts = [];
      
      radioButtons.forEach(radioButton => {
        const textElement = radioButton.nextElementSibling;
        const optionText = textElement ? textElement.textContent.trim() : '';
        optionTexts.push(optionText);
      });
      
      const questionElements = document.querySelectorAll('.PTBN_heading');
      const questionElement = questionElements[index].querySelector('u');
      const questionText = questionElement ? questionElement.textContent : '';
      
      const chineseCharacterQuestion = optionTexts.some(text => /[\u4e00-\u9fa5]/.test(text));
      
      if (chineseCharacterQuestion) {
        optionTextsArray.push({ type: 'sentence', options: optionTexts });
      } else {
        pinyinText.push(questionText); // Store pinyin text
        optionTextsArray.push({ type: 'pinyin', options: optionTexts });
      }
    });
  
    // Store the pinyinText array in local storage
    localStorage.setItem('pinyinText', JSON.stringify(pinyinText));
    // Store the optionTextsArray in local storage
    localStorage.setItem('quizData', JSON.stringify(optionTextsArray));
  }
  
  // Call the function to process quiz questions
  processQuizQuestions();
  
  // Output the optionTextsArray to console
  console.log(JSON.parse(localStorage.getItem('quizData')));
  console.log(JSON.parse(localStorage.getItem('pinyinText')));
  