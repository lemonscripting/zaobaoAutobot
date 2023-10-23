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

const modifiedSentences = sentences.map(questionSentences => {
    return questionSentences.map(sentence =>
      sentence.replace(/Q4: /g, '')
              .replace(/Q3: /g, '')
              .replace(/。/g, '')
              .replace(/\s+/g, ' ')
              .trim()  // Trim extra spaces at the beginning and end
    );
  });

console.log(modifiedSentences);
//localStorage.setItem('modifiedSentences', modifiedSentences);
localStorage.setItem('modifiedSentences', JSON.stringify(modifiedSentences));


const paragraph = localStorage.getItem('rawPageData');
var Q3;
var Q4;

// Q3
for (var i = 0; i < 3; i++) {
    const searchString = modifiedSentences[0][i];
    console.log("searching" + searchString);
    Q3 = i;
    if (paragraph.includes(searchString)) {
      
      console.log('Q3:', Q3);
      break;  // Exit the loop once we've found a match
    } else {
        console.log("not found, attempt:" + i);
    }
  }
  
  // Q4
  for (var i = 0; i < 3; i++) {
    const searchString = modifiedSentences[1][i];
    Q4 = i;
    if (paragraph.includes(searchString)) {
      
      console.log('Q4:', Q4);
      break;  // Exit the loop once we've found a match
    }
  }
  

//const questionsContainer = document.getElementById("quiz_questions_container");

const attribute = Array.from(questionsContainer.querySelectorAll(".quiz_question"))
  .slice(2, 4) // Select questions 3 and 4
  .map(questionElement => {
    const attributeName = questionElement.querySelector("input[type='radio']").getAttribute('name');
    return attributeName;
  });

console.log(attribute);
localStorage.setItem('attribute', attribute);

  //Q3
    var respValue = attribute[0];
    var index = Q3;
    var statement = `document.querySelectorAll('input[name="${respValue}"]')[${index}].checked = true;`;
    console.log(statement);
    eval(statement);
    
  //Q4
  var respValue = attribute[1];
  var index = Q4;
  var statement = `document.querySelectorAll('input[name="${respValue}"]')[${index}].checked = true;`;
  console.log(statement);
  eval(statement);