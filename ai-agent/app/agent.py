from typing import Annotated
import os
from langgraph.graph import StateGraph, MessagesState, START, END
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage

from .tools import search_products

# Define tools
tools = [search_products]
tool_node = ToolNode(tools)

# Initialize the model (requires OPENAI_API_KEY in environment)
# Using gpt-4o-mini as standard, but could be adjusted for local models
model = ChatOpenAI(
    model="llama-3.1-8b-instant", 
    temperature=0.2, 
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)
bound_model = model.bind_tools(tools)

def chat_node(state: MessagesState):
    """Call the LLM with the system prompt and conversation history"""
    messages = state["messages"]
    
    # We inject a system prompt if not present at index 0 or conceptually right before the LLM
    system_prompt = SystemMessage(
        content=(
            "You are a helpful e-commerce AI assistant for Aavya Ethnic Couture. "
            "You help users find products (like sarees, lehengas) using the search_products tool. "
            "When a user asks for products under a certain budget (e.g., 'less than 5000'), YOU MUST map that number directly to the `max_price` argument in the tool. Do NOT put 'less than X' in the search_term. "
            "When responding, provide concise and friendly answers about the product name, price, fabric, and stock. "
            "If a tool returns nothing, politely inform the user we couldn't find matches."
        )
    )
    
    # Run the model
    response = bound_model.invoke([system_prompt] + messages)
    return {"messages": [response]}

# Build Graph
builder = StateGraph(MessagesState)
builder.add_node("agent", chat_node)
builder.add_node("tools", tool_node)

builder.add_edge(START, "agent")
builder.add_conditional_edges("agent", tools_condition)
builder.add_edge("tools", "agent")

# Compile graph
graph = builder.compile()
