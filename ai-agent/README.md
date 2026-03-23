# Aavya Ethnic Couture - AI Chatbot Agent
This repository contains the Python / Langgraph backend for the E-commerce AI chatbot. It uses standard Langchain tooling to search the local PostgreSQL database for product details.

## Setup Instructions

1. **Install Python via Pyenv or use standard Python 3.10+**:
   ```bash
   cd /Users/abhay/Sandbox/ecommerce/ai-agent
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   **IMPORTANT**: You must add a valid `OPENAI_API_KEY` inside `.env`. The database credentials default to your `oms-backend` local PostgreSQL configuration and should work out of the box.

3. **Run the Server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Test the Server**:
   The FastAPI server will be running on `http://localhost:8000`. You can test it using terminal:
   
   ```bash
   curl -X POST http://localhost:8000/chat \
        -H "Content-Type: application/json" \
        -d '{"messages": [{"role": "user", "content": "What sarees do you have?"}]}'
   ```
