// URLs for fetching Pinyin map data
const pinyinMapURLs = [
    "https://pylib.vercel.app/pyData/dat_a.json",
    "https://pylib.vercel.app/pyData/dat_b.json",
    "https://pylib.vercel.app/pyData/dat_c.json",
    "https://pylib.vercel.app/pyData/dat_d.json",
    "https://pylib.vercel.app/pyData/dat_e.json",
    "https://pylib.vercel.app/pyData/dat_f.json",
    "https://pylib.vercel.app/pyData/dat_g.json",
    "https://pylib.vercel.app/pyData/dat_h.json",
    "https://pylib.vercel.app/pyData/dat_j.json",
    "https://pylib.vercel.app/pyData/dat_k.json",
    "https://pylib.vercel.app/pyData/dat_l.json",
    "https://pylib.vercel.app/pyData/dat_m.json",
    "https://pylib.vercel.app/pyData/dat_n.json",
    "https://pylib.vercel.app/pyData/dat_o.json",
    "https://pylib.vercel.app/pyData/dat_p.json",
    "https://pylib.vercel.app/pyData/dat_q.json",
    "https://pylib.vercel.app/pyData/dat_r.json",
    "https://pylib.vercel.app/pyData/dat_s.json",
    "https://pylib.vercel.app/pyData/dat_t.json",
    "https://pylib.vercel.app/pyData/dat_w.json",
    "https://pylib.vercel.app/pyData/dat_x.json",
    "https://pylib.vercel.app/pyData/dat_y.json",
    "https://pylib.vercel.app/pyData/dat_z.json",
    // Add more URLs as needed
  ];
  
  // Function to fetch JSON data from a URL
  async function fetchJSON(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
  
  // Fetch Pinyin map JSON data from multiple URLs
  const fetchPromises = pinyinMapURLs.map(url => fetchJSON(url));
  
  Promise.all(fetchPromises)
    .then(jsonDataArray => {
      // Combine fetched JSON data from multiple URLs into a single Pinyin map
      const combinedPinyinMap = Object.assign({}, ...jsonDataArray);
  
      // Function to convert a single Chinese character to Pinyin
      function convertToPinyin(character) {
        return combinedPinyinMap[character] || character;
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
    })
    .catch(error => {
      console.error('Error fetching Pinyin map:', error);
    });