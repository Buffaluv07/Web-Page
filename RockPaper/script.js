document.addEventListener('DOMContentLoaded', function() {
    const rockBtn = document.getElementById('rock-btn');
    const paperBtn = document.getElementById('paper-btn');
    const scissorsBtn = document.getElementById('scissors-btn');
    const resetGameBtn = document.getElementById('reset-game-btn');
    const resultsMsg = document.getElementById('results-msg');
    const winnerMsg = document.getElementById('winner-msg');
    const playerScoreSpan = document.getElementById('player-score');
    const computerScoreSpan = document.getElementById('computer-score');

    let playerScore = 0;
    let computerScore = 0;

    function getComputerChoice() {
        const choices = ['Rock', 'Paper', 'Scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    function playRound(playerChoice) {
        const computerChoice = getComputerChoice();
        let result = '';

        if (playerChoice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (playerChoice === 'Rock' && computerChoice === 'Scissors') ||
            (playerChoice === 'Scissors' && computerChoice === 'Paper') ||
            (playerChoice === 'Paper' && computerChoice === 'Rock')
        ) {
            result = `You win! ${playerChoice} beats ${computerChoice}`;
            playerScore++;
        } else {
            result = `You lose! ${computerChoice} beats ${playerChoice}`;
            computerScore++;
        }

        resultsMsg.textContent = result;
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;

        if (playerScore === 3 || computerScore === 3) {
            winnerMsg.textContent = playerScore === 3 ? 'You are the overall winner!' : 'The computer is the overall winner!';
            disableButtons();
        }
    }

    function disableButtons() {
        rockBtn.disabled = true;
        paperBtn.disabled = true;
        scissorsBtn.disabled = true;
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreSpan.textContent = playerScore;
        computerScoreSpan.textContent = computerScore;
        resultsMsg.textContent = '';
        winnerMsg.textContent = '';
        rockBtn.disabled = false;
        paperBtn.disabled = false;
        scissorsBtn.disabled = false;
    }

    rockBtn.addEventListener('click', () => playRound('Rock'));
    paperBtn.addEventListener('click', () => playRound('Paper'));
    scissorsBtn.addEventListener('click', () => playRound('Scissors'));
    resetGameBtn.addEventListener('click', resetGame);
});