/* script.js */

const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');
const difficultySelect = document.getElementById('difficulty');
const themeSelect = document.getElementById('theme');
const newStoryButton = document.getElementById('new-story-btn');

const stories = {
    easy: [
        { text: 'You are in a bright room. There is a door to the left and a window to the right. What do you do?', choices: [{ text: 'Go through the door', next: 'easy_door' }, { text: 'Look out the window', next: 'easy_window' }] },
        { text: 'You find yourself in a dimly lit hallway. There are two doors: one on the left and one on the right. Which door do you choose?', choices: [{ text: 'Left door', next: 'easy_leftDoor' }, { text: 'Right door', next: 'easy_rightDoor' }] },
        { text: 'You see a garden outside. Suddenly, you notice a shadowy figure approaching. What do you do?', choices: [{ text: 'Hide', next: 'easy_hide' }, { text: 'Confront the figure', next: 'easy_confront' }] }
    ],
    medium: [
        { text: 'You are in a dim room. There is a door to the left and a window to the right. What do you do?', choices: [{ text: 'Go through the door', next: 'medium_door' }, { text: 'Look out the window', next: 'medium_window' }] },
        { text: 'You find yourself in a mysterious hallway. There are two doors: one on the left and one on the right. Which door do you choose?', choices: [{ text: 'Left door', next: 'medium_leftDoor' }, { text: 'Right door', next: 'medium_rightDoor' }] },
        { text: 'You see a garden outside. Suddenly, you notice a shadowy figure approaching. What do you do?', choices: [{ text: 'Hide', next: 'medium_hide' }, { text: 'Confront the figure', next: 'medium_confront' }] },
        { text: 'You find the body of the victim. You must find clues to identify the murderer. What do you do first?', choices: [{ text: 'Examine the body', next: 'medium_examineBody' }, { text: 'Look for fingerprints', next: 'medium_fingerprints' }] }
    ],
    hard: [
        { text: 'You are in a dark room. There is a door to the left and a window to the right. What do you do?', choices: [{ text: 'Go through the door', next: 'hard_door' }, { text: 'Look out the window', next: 'hard_window' }] },
        { text: 'You find yourself in a spooky hallway. There are two doors: one on the left and one on the right. Which door do you choose?', choices: [{ text: 'Left door', next: 'hard_leftDoor' }, { text: 'Right door', next: 'hard_rightDoor' }] },
        { text: 'You see a garden outside. Suddenly, you notice a shadowy figure approaching. What do you do?', choices: [{ text: 'Hide', next: 'hard_hide' }, { text: 'Confront the figure', next: 'hard_confront' }] },
        { text: 'You find the body of the victim. You must find clues to identify the murderer. What do you do first?', choices: [{ text: 'Examine the body', next: 'hard_examineBody' }, { text: 'Look for fingerprints', next: 'hard_fingerprints' }] },
        { text: 'You discover a secret passage leading to another room. You hear someone talking. What do you do?', choices: [{ text: 'Enter the passage', next: 'hard_secretPassage' }, { text: 'Stay and listen', next: 'hard_listen' }] }
    ]
};

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomStory() {
    const difficulty = difficultySelect.value;
    return getRandomElement(stories[difficulty]);
}

function updateStory(element) {
    storyElement.innerHTML = element.text;
    choicesElement.innerHTML = '';
    element.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.className = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        button.addEventListener('click', () => updateStory(getRandomStory()));
        choicesElement.appendChild(button);
    });
}

function updateTheme(theme) {
    document.body.className = theme + '-mode';
    const buttons = choicesElement.querySelectorAll('button');
    buttons.forEach(button => {
        button.className = theme + '-mode';
    });
}

difficultySelect.addEventListener('change', () => {
    updateStory(getRandomStory());
});

themeSelect.addEventListener('change', (event) => {
    updateTheme(event.target.value);
});

newStoryButton.addEventListener('click', () => {
    updateStory(getRandomStory());
});

// Start the game with a random story
updateStory(getRandomStory());
updateTheme(themeSelect.value);
