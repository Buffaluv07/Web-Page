
function checkPalindrome() {
  const inputText = document.getElementById("text-input").value;
  if (!inputText) {
    alert("Please input a value");
    return;
  }
  const result = document.getElementById("result");
  const inputArr = inputText.toLowerCase().split("").filter((c) => !c.match(/[\(\)\\.\s_,-]/gi));
  console.log(inputArr);

  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] !== inputArr[inputArr.length - i - 1]) {
      console.log(inputArr[i]);
      result.innerText = `${inputText} is not a palindrome`;
      return;
    }
  }
  result.innerText = `${inputText} is a palindrome`;
}