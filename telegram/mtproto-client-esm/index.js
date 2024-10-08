import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "readline";
import dotenv from "dotenv";
import { NewMessage } from "telegram/events/index.js";
import { NewMessageEvent } from "telegram/events/index.js";
import OllamaChat from "../../ollama/main.js";

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
	console.log("Loading interactive example...");
	const client = new TelegramClient(stringSession, apiId, apiHash, {
		connectionRetries: 5,
	});
	await client.connect();
	// await client.start({
	//   phoneNumber: async () =>
	//     new Promise((resolve) =>
	//       rl.question("Please enter your number: ", resolve)
	//     ),
	//   password: async () =>
	//     new Promise((resolve) =>
	//       rl.question("Please enter your password: ", resolve)
	//     ),
	//   phoneCode: async () =>
	//     new Promise((resolve) =>
	//       rl.question("Please enter the code you received: ", resolve)
	//     ),
	//   onError: (err) => console.log(err),
	// });
	// console.log("You should now be connected.");
	// console.log(client.session.save()); // Save this string to avoid logging in again
	// await client.sendMessage("me", { message: "Hello!" });

	let users = {};

	async function handler(event) {
		const eventt = new NewMessageEvent(event);
			console.log(eventt.message.message.peerId.className)
			console.log(eventt.message.message.message)
			if(eventt.message.message.peerId.className == 'PeerUser' && eventt.message.message.message){
				if(!users[eventt.message.message.peerId.userId.value]){
					let chat = await client.getDialogs();
					users[eventt.message.message.peerId.userId.value] = 1;
				}
				await client.sendMessage(eventt.message.message.peerId.userId.value, { message: eventt.message.message.message });
			}
		}
	client.addEventHandler(handler, new NewMessage({}));
})();