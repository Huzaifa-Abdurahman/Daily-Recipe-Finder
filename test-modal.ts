import { config } from 'dotenv';

// Load environment variables from .env
config();

async function testModalApi() {
  const apiKey = process.env.MODAL_API_KEY || "modalresearch_piXfN1n9rG0orkmKzgX3IcMNpkrpFiMaZyPgBmEjo7M";
  
  const response = await fetch("https://api.us-west-2.modal.direct/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "zai-org/GLM-5.1-FP8",
      messages: [{ role: "user", content: "How many r-s are in strawberry?" }],
      max_tokens: 500
    })
  });

  const data = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

testModalApi().catch(console.error);
