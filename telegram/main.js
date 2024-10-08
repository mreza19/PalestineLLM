import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "readline";
import dotenv from "dotenv";
import { NewMessage } from "telegram/events/index.js";
import { NewMessageEvent } from "telegram/events/index.js";
import OllamaChat from "../ollama/main.js";

dotenv.config();

const apiId = +process.env.APP_ID;
const apiHash = process.env.APP_HASH;
const stringSession = new StringSession(process.env.SESSION); // fill this later with the value from session.save()

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

(async () => {
	const chat = new OllamaChat();
	console.log("Loading ...");
	const client = new TelegramClient(stringSession, apiId, apiHash, {
		connectionRetries: 5,
	});
	await client.connect();

	let users = {};

	async function handler(event) {
		const eventt = new NewMessageEvent(event);
		console.log(eventt.message.peerId.className);
		console.log(eventt.message.message);
		
		// Check if the message is from a user
		if (eventt.message.peerId.className === 'PeerUser' && eventt.message.message) {
			// Keep track of users
			if (!users[eventt.message.peerId.userId.value]) {
				let chatDialogs = await client.getDialogs();
				users[eventt.message.peerId.userId.value] = 1;
			}
			
			// Process the message using the Ollama model
			let userMessage = eventt.message.message;
			await chat.chatWithModel(userMessage);  // Send the user's message to the model
			
			// Get the model's response
			let ollamaResponse = chat.messages[chat.messages.length - 1].content;
			
			// Send the response back to the user
			await client.sendMessage(eventt.message.peerId.userId.value, { message: ollamaResponse });
		}
	}
	
	client.addEventHandler(handler, new NewMessage({}));
})();
