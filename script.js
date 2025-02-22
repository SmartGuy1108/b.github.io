// script.js
const suspects = ['Alice', 'Bob', 'Charlie', 'Diana'];
let interrogatedCharacters = [];
let currentRound = 1;
let points = 0;
let murderer = getRandomSuspect();

const clues = {
    Alice: [],
    Bob: [],
    Charlie: [],
    Diana: []
};

function changeTheme() {
    const theme = document.querySelector('input[name="theme"]:checked').value;
    if (theme === 'dark') {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
    }
}

function getRandomSuspect() {
    return suspects[Math.floor(Math.random() * suspects.length)];
}

function interrogate(character) {
    if (!interrogatedCharacters.includes(character)) {
        interrogatedCharacters.push(character);

        let story = '';
        let clue = '';

        switch (character) {
            case 'Alice':
                story = 'Alice seems nervous. She says she saw someone running away from the crime scene but couldn\'t identify them. You sense she\'s hiding something.';
                clue = 'Alice has a secret that she\'s not revealing.';
                break;
            case 'Bob':
                story = 'Bob is calm and collected. He claims he was at the bar all night and has an alibi. However, you find his story too perfect.';
                clue = 'Bob has a strong alibi, but is it too perfect?';
                break;
            case 'Charlie':
                story = 'Charlie is agitated and avoids eye contact. He insists he knows nothing but slips up, mentioning a detail only the perpetrator would know.';
                clue = 'Charlie knows a detail that only the perpetrator would know.';
                break;
            case 'Diana':
                story = 'Diana is in tears. She says she\'s been framed and begs you to believe her. You notice she has a strange bruise on her arm.';
                clue = 'Diana has a bruise on her arm that seems suspicious.';
                break;
        }

        clues[character].push(clue);
        updateStory(character, story);
        updateClues(character);

        if (interrogatedCharacters.length === 4) {
            document.getElementById('murder-selection').style.display = 'block';
        }
    } else {
        alert('You have already interrogated this character. Choose someone else.');
    }
}

function updateStory(character, story) {
    const storyElement = document.getElementById('story');
    storyElement.innerText += `\n\nInterrogation with ${character}:\n${story}`;
}

function updateClues(character) {
    const cluesElement = document.getElementById('clues');
    cluesElement.innerText = 'Clues found so far:\n';
    for (const char of interrogatedCharacters) {
        cluesElement.innerText += `\n${char}:\n`;
        for (const clue of clues[char]) {
            cluesElement.innerText += `- ${clue}\n`;
        }
    }
}

function submitSelection() {
    const selectedMurderer = document.getElementById('murderer').value;
    const reason = document.getElementById('reason').value;
    if (selectedMurderer === murderer) {
        points += 10;
        alert(`You correctly identified ${murderer} as the murderer!\nReason: ${reason}\nYou earned 10 points.`);
    } else {
        points -= 5;
        alert(`You incorrectly identified ${selectedMurderer} as the murderer.\nReason: ${reason}\nYou lost 5 points.`);
    }
    document.getElementById('points').innerText = `Points: ${points}`;
    startNewRound();
}

function startNewRound() {
    currentRound++;
    document.getElementById('round').innerText = `Round: ${currentRound}`;
    interrogatedCharacters = [];
    clues.Alice = [];
    clues.Bob = [];
    clues.Charlie = [];
    clues.Diana = [];
    murderer = getRandomSuspect();
    document.getElementById('story').innerText = '';
    document.getElementById('clues').innerText = '';
    document.getElementById('murder-selection').style.display = 'none';
}

// Set initial theme and round
document.body.classList.add('dark-theme');
document.getElementById('points').innerText = `Points: ${points}`;
document.getElementById('round').innerText = `Round: ${currentRound}`;
