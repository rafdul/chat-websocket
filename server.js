const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];
let findedUser = {name: '', id: ''};

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '/client/index.html'));
});

const server = app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
	console.log('New client! Its id – ' + socket.id);
	socket.on('user', (user) => {
		console.log('New user ' + socket.id + ' is logged.');
		users.push({name: user, id: socket.id});
		// console.log('users', users);
		socket.broadcast.emit('newUser', {author: 'ChatBot', content: `${user} has joined the conversation!`});
	});
	socket.on('message', (message) => { 
		console.log('Oh, I\'ve got something from ' + socket.id);
		messages.push(message);
		socket.broadcast.emit('message', message);
	});
	socket.on('disconnect', () => { 
		console.log('Oh, socket ' + socket.id + ' has left');
		const userToRemove = users.findIndex(user => user.id == socket.id);
		findedUser = users.find(user => user.id == socket.id);
		if(findedUser != undefined) {
			socket.broadcast.emit('quitUser', {author: 'ChatBot', content: `${findedUser.name} has left the conversation... :(`});
		}
		users.splice(userToRemove, 1);
	});
	console.log('I\'ve added a listener on message event \n');
});