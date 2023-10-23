async function calculateSHA256Hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

let state;
const code = `
  const userInput = prompt("请输入密码");
  if (userInput === "ZV6I323NBJ7BAW2WMODBHKSZ") {
    alert("Login Success✓");
    state = 1;
  } else {
    alert("USER NOT REGISTERED");
    state = 0;
  }
`;
eval(code);

calculateSHA256Hash(code)
  .then(hash => {
    console.log('SHA-256 hash:', hash);
    if (state === 0) {
      alert("代码效验失败");
      return;
    } else {
      alert("代码效验成功");
    }
    if (hash !== "fff0a7a7c4f142a28770f194150b274d54d6e7304fada5846387aedec9d0f10b") {
      alert("HASH效验失败");
      return;
    } else {
      alert("HASH效验成功");
    }
  })
  .catch(error => {
    console.error('Error calculating hash:', error);
  });
