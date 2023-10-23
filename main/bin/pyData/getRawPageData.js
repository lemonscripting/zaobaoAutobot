// Use querySelector to select the element with the specified class
const dataContentElement = document.querySelector('.data-content.enable-tts');

if (dataContentElement) {
  // Extract text content from the selected element
  const extractedText = dataContentElement.textContent;

  // Use regular expression to match Chinese words
  const chineseWords = extractedText.match(/[\u4e00-\u9fa5]+/g);

  if (chineseWords) {
    // Join the Chinese words to form the paragraph
    const paragraph = chineseWords.join('');

    // Store the paragraph of Chinese words in local storage
    localStorage.setItem('rawPageData', paragraph);

    console.log('Raw Chinese words extracted and stored in local storage.');
  } else {
    console.log('No Chinese words found in the content.');
  }
} else {
  console.log('Element with class "data-content enable-tts" not found.');
}
