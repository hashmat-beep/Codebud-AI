import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();
console.log('Loaded API Key:', process.env.OPENAI_API_KEY ? '✅ Loaded' : '❌ Missing');


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

// Fix: no async here since it's not needed
app.get('/', (req, res) => {
  console.log('GET / hit!');
  res.status(200).json({ message: 'Hello from CodeBud!' });
});


app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
    });
    
    res.status(200).send({
      bot: response.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`AI server started on http://localhost:${PORT}`));


