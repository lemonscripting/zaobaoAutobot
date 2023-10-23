const dataContentElement = document.querySelector('.data-content.enable-tts');

if (dataContentElement) {
  const extractedText = dataContentElement.textContent;

  // Update the regular expression to match Chinese words, numbers, and common punctuations including spaces
  const chineseAndNumbersAndPunctuations = extractedText.match(/[\u4e00-\u9fa5\d，。！？、\s]+/g);

  if (chineseAndNumbersAndPunctuations) {
    // Join the matched elements and remove all spaces
    const paragraph = chineseAndNumbersAndPunctuations.join('').replace(/\s+/g, '');

    localStorage.setItem('rawPageData', paragraph);

    console.log('Chinese words, numbers, and punctuations extracted and stored in local storage.');
  } else {
    console.log('No Chinese words, numbers, or punctuations found in the content.');
  }
} else {
  console.log('Element with class "data-content enable-tts" not found.');
}
