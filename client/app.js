const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

const login= event => {
  event.preventDefault;
  if(!userNameInput.value){
    alert('You have to log in');
  } else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
};

const addMessage = (user, text) => {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if(user === userName) {
    message.classList.add('message--self');
  }
  message.innerHTML = `
    <h3 class="message__author">${user === userName ? 'You' : user}</h3>
    <div class="message__content">${text}</div>
  `;
  messagesList.appendChild(message);
};

const sendMessage = event => {
  event.preventDefault;
  if(!messageContentInput.value) {
    alert('You have to write something');
  } else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
};


loginForm.addEventListener('submit', event => {
  login(event);
});

addMessageForm.addEventListener('submit', event => {
  sendMessage(event);
});
