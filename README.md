# CodeBud AI 💬

This is a simple AI chatbot I built using Vite and OpenAI’s ChatGPT API.

## 🧠 What it does

You type in a question, and the AI gives you a smart answer.  
It’s like having your own ChatGPT on a website.

## 🛠️ What I used

- **Vite** – to run the frontend (HTML, CSS, JS)
- **Express (Node.js)** – to run the backend server
- **OpenAI API** – to generate smart AI responses
- **Fetch API** – to connect frontend and backend

## 🚀 How it works

1. You open the website
2. You type a question
3. The question is sent to the backend
4. Backend calls OpenAI
5. The answer is shown on your screen


🔧 Setup & Run (local)

Open two terminals (one for server, one for client).
cd server
npm install
# create a file named .env with your key:
# OPENAI_API_KEY=sk-...

npm run server

cd client

npm install

npm run dev

Vite will show a local URL (usually http://localhost:5173).
Open that link in your browser.

## 🌐 Live Site
Check it out here: [CodeBud AI](https://codebud-ai.vercel.app)
