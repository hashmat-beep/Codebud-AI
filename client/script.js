import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

function loader(element) {
    element.textContent = '';
    loadInterval = setInterval(() => {
        element.textContent += '.';
    }, 300);
}

function typeText(element, text) {
    let index = 0;
    let preTag = element.querySelector('pre');

    let interval = setInterval(() => {
        if (index < text.length) {
            preTag.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
}

function generateUniqueId() {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value = "", uniqueId = "") {
    return (
        `
        <div class="wrapper ${isAi ? 'ai' : ''}">
            <div class="chat">
                <div class="profile">
                    <img 
                      src=${isAi ? bot : user} 
                      alt="${isAi ? 'bot' : 'user'}" 
                    />
                </div>
                <div class="message" id=${uniqueId}><pre>${value}</pre></div>
            </div>
        </div>
        `
    );
}

const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // user's message
    chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
    form.reset();

    // bot placeholder
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    const messageDiv = document.getElementById(uniqueId);
    loader(messageDiv.querySelector('pre'));

    // get response from backend
    try {
        const response = await fetch('https://codebud-ai.onrender.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.get('prompt'),
            }),
        });

        clearInterval(loadInterval);
        messageDiv.innerHTML = "<pre></pre>";

        if (response.ok) {
            const responseData = await response.json();
            const parsedData = responseData.bot.trim();
            typeText(messageDiv, parsedData);
        } else {
            const err = await response.text();
            messageDiv.querySelector('pre').textContent = "Something went wrong";
            alert(err);
        }
    } catch (err) {
        clearInterval(loadInterval);
        messageDiv.querySelector('pre').textContent = "Something went wrong";
        alert("Server error");
    }
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
    }
});
