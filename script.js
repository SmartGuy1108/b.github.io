// script.js
const suspects = ['Alice', 'Bob', 'Charlie', 'Diana'];
let interrogatedCharacters = [];
let currentRound = 1;
let points = 0;
let murderer = getRandomSuspect();

const clues = {
    Alice: ['Alice has a secret that she\'s not revealing.', 'Alice seems nervous.'],
    Bob: ['Bob has a strong alibi, but is it too perfect?', 'Bob is calm and collected.'],
    Charlie: ['Charlie knows a detail that only the perpetrator would know.', 'Charlie is agitated.'],
    Diana: ['Diana has a bruise on her arm that seems suspicious.', 'Diana is in tears.']
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

function getRandomClue(character) {
    return clues[character][Math.floor(Math.random() * clues[character].length)];
}

function interrogate(character) {
    if (!interrogatedCharacters.includes(character)) {
        interrogatedCharacters.push(character);

        let story = '';
        const clue = getRandomClue(character);

        switch (character) {
            case 'Alice':
                story = 'Alice seems nervous. She says she saw someone running away from the crime scene but couldn\'t identify them. You sense she\'s hiding something.';
                break;
            case 'Bob':
                story = 'Bob is calm and collected. He claims he was at the bar all night and has an alibi. However, you find his story too perfect.';
                break;
            case 'Charlie':
                story = 'Charlie is agitated and avoids eye contact. He insists he knows nothing but slips up, mentioning a detail only the perpetrator would know.';
                break;
            case 'Diana':
                story = 'Diana is in tears. She says she\'s been framed and begs you to believe her. You notice she has a strange bruise on her arm.';
                break;
        }

        updateStory(character, story);
        updateClue(clue);

        if (interrogatedCharacters.length === 4) {
            document.getElementById('murder-selection').style.display = 'block';
            generateReasonOptions();
        }
    } else {
        alert('You have already interrogated this character. Choose someone else.');
    }
}

function updateStory(character, story) {
    const storyElement = document.getElementById('story');
    storyElement.innerText = `Interrogation with ${character}:\n${story}`;
}

function updateClue(clue) {
    const clueElement = document.getElementById('clue');
    clueElement.innerText = `New Clue: ${clue}`;
}

function generateReasonOptions() {
    const reasons = ['Motive', 'Alibi', 'Clue'];
    const reasonSelect = document.getElementById('reason');
    reasonSelect.innerHTML = '';

    for (const reason of reasons) {
        const option = document.createElement('option');
        option.value = reason;
        option.text = reason;
        reasonSelect.add(option);
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
    murderer = getRandomSuspect();
    document.getElementById('story').innerText = '';
    document.getElementById('clue').innerText = '';
    document.getElementById('murder-selection').style.display = 'none';
}

// Set initial theme and round
document.body.classList.add('dark-theme');
document.getElementById('points').innerText = `Points: ${points}`;
document.getElementById('round').innerText = `Round: ${currentRound}`;
