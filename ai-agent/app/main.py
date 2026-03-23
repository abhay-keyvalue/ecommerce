from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from dotenv import load_dotenv

load_dotenv()

from .agent import graph

app = FastAPI(title="Aavya Ecommerce AI Agent")

# Allow frontend to call us directly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    messages: List[Dict[str, Any]]

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    try:
        # Convert raw dictionaries to generic messages for Langchain
        # Langgraph MessagesState can accept standard dict representation of messages [{ "role": "user", "content": "..."}]
        result = graph.invoke({"messages": request.messages})
        
        # We return the latest message (the AI's response)
        final_message = result["messages"][-1]
        
        return {
            "role": "assistant",
            "content": final_message.content
        }
    except Exception as e:
        # To handle missing API key errors clearly
        if "api_key" in str(e).lower() or "authentication" in str(e).lower():
            raise HTTPException(status_code=401, detail="OpenAI API key is missing or invalid. Please check .env file.")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok"}
