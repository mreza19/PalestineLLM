import { Api, TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions/index.js";
import readline from "readline";
import dotenv from "dotenv";
import { NewMessage } from "telegram/events/index.js";
import { NewMessageEvent } from "telegram/events/index.js";
import OllamaChat from "./ollama.js";
import levelDatabase from "./db.js";

dotenv.config();

const chat = new OllamaChat( process.env.HOST || "http://127.0.0.1:11434", process.env.MODEL || "unsloth_model" );
chat.setSystemMessage( process.env.SYSTEM_MESSAGE || "" );


const apiId = +process.env.APP_ID;
const apiHash = process.env.APP_HASH;
const stringSession = new StringSession( process.env.SESSION ); // fill this later with the value from session.save()

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});



void async function main ()
{
	console.log( "Loading AmiraAI ..." );
	const client = new TelegramClient( stringSession, apiId, apiHash, {
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

	const allDialogs = await client.getDialogs();
	const users = {};

	async function handler ( event )
	{
		const eventt = new NewMessageEvent( event );
		console.log( eventt.message.message.peerId.className );
		console.log( eventt.message.message.message );
		if ( eventt.message.message.peerId.className == "PeerUser" && eventt.message.message.message )
		{
			let chatHistory = await client.getMessages( eventt.message._chatPeer, {
				limit: 20, // Fetch last 20 messages
				reverse: false // Oldest messages first
			});
			chatHistory = chatHistory.map( chat => { return { role: chat.message } || ""; });
			if ( !users[eventt.message.message.peerId.userId.value] )
			{
				users[eventt.message.message.peerId.userId.value] = chatHistory;
			}
			chat.setHistoryMessage( chatHistory );
			const userMessage = eventt.message.message.message;
			const response = await chat.chatWithModel( userMessage ); // Send the user's message to the model

			// Send the response back to the user
			await client.sendMessage( eventt.message.message.peerId.userId.value, { message: response.content });
		}
	}
	client.addEventHandler( handler, new NewMessage({}) );
}();