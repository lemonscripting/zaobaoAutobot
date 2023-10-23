const questionsContainer = document.getElementById("quiz_questions_container");

const attribute = Array.from(questionsContainer.querySelectorAll(".quiz_question"))
  .slice(2, 4) // Select questions 3 and 4
  .map(questionElement => {
    const attributeName = questionElement.querySelector("input[type='radio']").getAttribute('name');
    return attributeName;
  });

console.log(attribute);
localStorage.setItem('attribute', attribute);