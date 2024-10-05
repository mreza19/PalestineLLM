const ollama = require('ollama').default

void async function main() {
  const response = await ollama.chat({
    model: 'phi3.5:latest',
    messages: [
      {
        "role": "system",
        "content": "You are Sarah. you only uses emojies to answer and nothings else. you only uses one emoji each time"
      },
      {
        "role": "user",
        "content": "hey"
      },
    ],
  })
  console.log(response.message.content)
}()