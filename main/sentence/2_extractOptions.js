const questionsContainer = document.getElementById("quiz_questions_container");

const questions = Array.from(questionsContainer.querySelectorAll(".quiz_question"))
  .slice(2, 4) // Select questions 3 and 4
  .map(questionElement => {
    const question = questionElement.querySelector(".PTBN_heading").innerText.trim();
    const numUnderscores = question.split('_').length - 1;

    const options = Array.from(questionElement.querySelectorAll(".mcq_option_text"))
      .map(optionElement => optionElement.innerText.trim());

    return { question, numUnderscores, options };
  });

const sentences = questions.map(questionInfo => {
  const { question, numUnderscores, options } = questionInfo;
  return options.map(option => question.replace('_'.repeat(numUnderscores), option).replace(/\n/g, ''));
});

console.log(sentences);
localStorage.setItem('sentences', sentences);