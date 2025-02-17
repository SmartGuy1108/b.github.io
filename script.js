/* script.js */

const storyElement = document.getElementById('story');
const choicesElement = document.getElementById('choices');

const gameData = {
    start: {
        text: 'You are in a dark room. There is a door to the left and a window to the right. What do you do?',
        choices: [
            { text: 'Go through the door', next: 'door' },
            { text: 'Look out the window', next: 'window' }
        ]
    },
    door: {
        text: 'You find yourself in a dimly lit hallway. There are two doors: one on the left and one on the right. Which door do you choose?',
        choices: [
            { text: 'Left door', next: 'leftDoor' },
            { text: 'Right door', next: 'rightDoor' }
        ]
    },
    window: {
        text: 'You see a garden outside. Suddenly, you notice a shadowy figure approaching. What do you do?',
        choices: [
            { text: 'Hide', next: 'hide' },
            { text: 'Confront the figure', next: 'confront' }
        ]
    },
    leftDoor: {
        text: 'You find the body of the victim. You must find clues to identify the murderer. What do you do first?',
        choices: [
            { text: 'Examine the body', next: 'examineBody' },
            { text: 'Look for fingerprints', next: 'fingerprints' }
        ]
    },
    rightDoor: {
        text: 'You discover a secret passage leading to another room. You hear someone talking. What do you do?',
        choices: [
            { text: 'Enter the passage', next: 'secretPassage' },
            { text: 'Stay and listen', next: 'listen' }
        ]
    },
    hide: {
        text: 'You hide behind the curtains. The figure enters the room and leaves without noticing you. You are safe for now.',
        choices: [
            { text: 'Wait for a while', next: 'wait' },
            { text: 'Search the room', next: 'searchRoom' }
        ]
    },
    confront: {
        text: 'You confront the figure. It turns out to be a detective looking for the murderer. You join forces to solve the mystery.',
        choices: [
            { text: 'Search for clues together', next: 'searchClues' }
        ]
    }
    // Add more story elements as needed
};

function updateStory(element) {
    storyElement.innerHTML = element.text;
    choicesElement.innerHTML = '';
    element.choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice.text;
        button.addEventListener('click', () => updateStory(gameData[choice.next]));
        choicesElement.appendChild(button);
    });
}

// Start the game
updateStory(gameData.start);
