#!/bin/bash

# You can source your .env file or just use the key directly
# source .env

curl -X POST "https://api.us-west-2.modal.direct/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer modalresearch_piXfN1n9rG0orkmKzgX3IcMNpkrpFiMaZyPgBmEjo7M" \
  -d '{"model": "zai-org/GLM-5.1-FP8", "messages": [{"role": "user", "content": "How many r-s are in strawberry?"}], "max_tokens": 500}'
