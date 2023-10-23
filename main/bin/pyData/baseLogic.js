// Map of Chinese characters to Pinyin
const pinyinMap = {
  你: "nǐ",
  好: "hǎo",
  // Add more characters and their Pinyin here
};

// Function to convert a single Chinese character to Pinyin
function convertToPinyin(character) {
  return pinyinMap[character] || character;
}

// Function to convert a Chinese sentence to Pinyin
function sentenceToPinyin(sentence) {
  const characters = sentence.split("");
  const pinyinArray = characters.map(convertToPinyin);
  return pinyinArray.join(" ");
}

// Replace this with the Chinese sentence you want to convert
const chineseSentence = "你好";

// Convert the Chinese sentence to Pinyin
const pinyinSentence = sentenceToPinyin(chineseSentence);

// Print the Pinyin sentence
console.log(pinyinSentence);
