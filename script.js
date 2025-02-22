// script.js
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

function interrogate(character) {
    let story = '';

    switch(character) {
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

    document.getElementById('story').innerText = story;
}

// Set initial theme
document.body.classList.add('dark-theme');
