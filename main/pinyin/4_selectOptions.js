// Retrieve pinyinConvertedText array and optionsArray from local storage
const pinyinConvertedText_final = JSON.parse(localStorage.getItem('pinyinConvertedText')) || [];
const optionsArray_final = JSON.parse(localStorage.getItem('optionsArray')) || [];

// Iterate through pinyinConvertedText array and optionsArray and adjust matching indices
const adjustedIndices = [];
pinyinConvertedText_final.forEach((pinyinText, pinyinIndex) => {
    optionsArray_final.forEach((option, optionIndex) => {
        if (option[0] === pinyinText) {
            let adjustedIndex = optionIndex;
            if (adjustedIndex < 3) {
                adjustedIndex += 1;
            } else {
                adjustedIndex = (adjustedIndex + 1) % 4;
            }
            adjustedIndices.push({ optionIndex: adjustedIndex, option: optionsArray[optionIndex][1] });
        }
    });
});

console.log('Adjusted Indices:', adjustedIndices);


//console.log(firstElement.option); // Accessing the 'option' property
//console.log(firstElement.optionIndex); // Accessing the 'optionIndex' property


for (var i = 0; i < adjustedIndices.length; i++) {
    const firstElement = adjustedIndices[i];
    //document.querySelectorAll(firstElement.option)[firstElement.optionIndex].checked = true;
    //document.querySelectorAll('input[name="resp[251015]"]')[1].checked = true;   --sample
    //document.querySelectorAll('input[name="resp[251012]]"]')[3].checked = true;  --testcase
    const respValue = firstElement.option;
    const index = firstElement.optionIndex - 1;
    const statement = `document.querySelectorAll('input[name="${respValue}"]')[${index}].checked = true;`;

    console.log(statement);
    eval(statement); //--may be blocked by:  <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">

    /*alternative method*/
    /*
    
    const executeStatement = new Function(statement);  // Create a function
        executeStatement();  // Call the function
    */
}