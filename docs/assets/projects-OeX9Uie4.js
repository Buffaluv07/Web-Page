import"./modulepreload-polyfill-B5Qt9EMX.js";function i(){const n=document.getElementById("text-input").value;if(!n){alert("Please input a value");return}const l=document.getElementById("result"),t=n.toLowerCase().split("").filter(e=>!e.match(/[\(\)\\.\s_,-]/gi));console.log(t);for(let e=0;e<t.length;e++)if(t[e]!==t[t.length-e-1]){console.log(t[e]),l.innerText=`${n} is not a palindrome`;return}l.innerText=`${n} is a palindrome`}document.getElementById("check-btn").addEventListener("click",i);
