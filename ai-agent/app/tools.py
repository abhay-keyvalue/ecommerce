from langchain_core.tools import tool
from typing import Optional, List, Dict, Any
from .db import fetch_products

@tool
def search_products(search_term: Optional[str] = None, category: Optional[str] = None, max_price: Optional[float] = None) -> List[Dict[str, Any]]:
    """
    Search for products in the store's database. 
    Use this tool when users ask about what products are available, details about specific items, pricing, stock, fabric, color, etc.
    
    Args:
        search_term: A keyword to search in product name and description (e.g., "saree", "red", "silk").
        category: A specific category to filter by (e.g., "Sarees", "Lehengas").
        max_price: The maximum price the user is willing to spend (e.g., extract 3000 from "under 3000").
        
    Returns:
        List of matching products with their details (price, stock, fabric, etc).
    """
    try:
        products = fetch_products(search_term, category, max_price)
        return products
    except Exception as e:
        return [{"error": str(e)}]
