

document.getElementById("survey-form").addEventListener("submit", function (event) {
    event.preventDefault(); 
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const number = document.getElementById("number").value.trim();
  
    if (name === "") {
      alert("Name is required!");
      return;
    }
  
    if (!email.includes("@")) {
      alert("Please enter a valid email address!");
      return;
    }
 
    if (number && (isNaN(number) || number < 0 || number > 9999999999)) {
      alert("Please enter a valid phone number!");
      return;
    }

    alert("Thank you for submitting the survey!");
  });