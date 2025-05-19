let number = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
  let guess = parseInt(document.getElementById("guessInput").value);
  let result = document.getElementById("result");

  if (guess < number) {
    result.textContent = "Zyada bada socho.";
  } else if (guess > number) {
    result.textContent = "Zyada chhota socho.";
  } else {
    result.textContent = "Sahi jawab! Mubarak ho!";
  }
}
