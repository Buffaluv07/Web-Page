const input = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");

convertBtn.addEventListener("click", () => {
  console.log("hittt")
  const number = +input.value
  if (!number) {
    output.innerText = "Please enter a valid number"
    return;
  }
  if (number < 0) {
    output.innerText = "Please enter a number greater than or equal to 1"
    return;
  }
  if (number >= 4000){
    output.innerText = "Please enter a number less than or equal to 3999"
    return;
  }
  const result = convertNumToRoman(+input.value)
  output.innerText = result
})
function convertNumToRoman(num) {
  const val = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1]
  const syms = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
  let roman = '';
  let i = 0;
  while (num > 0) {
    const div = Math.floor(num / val[i]);
    num -= div * val[i]
    roman += syms[i].repeat(div)
    i++
  }
  return roman;
}