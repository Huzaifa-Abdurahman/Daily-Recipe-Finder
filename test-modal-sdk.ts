import OpenAI from 'openai';
import { config } from 'dotenv';

// Load environment variables from .env
config();

async function main() {
  const openai = new OpenAI({
    baseURL: 'https://api.us-west-2.modal.direct/v1',
    apiKey: process.env.MODAL_API_KEY || 'modalresearch_piXfN1n9rG0orkmKzgX3IcMNpkrpFiMaZyPgBmEjo7M',
  });

  try {
    const completion = await openai.chat.completions.create({
      model: "zai-org/GLM-5.1-FP8",
      messages: [{ role: "user", content: "How many r-s are in strawberry?" }],
      max_tokens: 500,
    });

    console.log(completion.choices[0].message.content);
  } catch (error) {
    console.error("Error calling Modal API:", error);
  }
}

main();
