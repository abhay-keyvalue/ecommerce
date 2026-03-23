import os
import psycopg2
from psycopg2.extras import DictCursor
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = os.getenv("DB_PORT", "5432")
DB_USER = os.getenv("DB_USER", "oms_user")
DB_PASSWORD = os.getenv("DB_PASSWORD", "oms_password")
DB_NAME = os.getenv("DB_NAME", "oms_database")

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            user=DB_USER,
            password=DB_PASSWORD,
            dbname=DB_NAME
        )
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}")
        return None

def fetch_products(search_term=None, category=None, max_price=None):
    conn = get_db_connection()
    if not conn:
        return []

    try:
        with conn.cursor(cursor_factory=DictCursor) as cur:
            query = "SELECT id, name, description, price, stock, category, fabric, color FROM products WHERE 1=1"
            params = []
            
            if search_term:
                query += " AND (name ILIKE %s OR description ILIKE %s)"
                term = f"%{search_term}%"
                params.extend([term, term])
                
            if category:
                query += " AND category ILIKE %s"
                params.append(f"%{category}%")
                
            if max_price is not None:
                query += " AND price <= %s"
                params.append(max_price)
                
            query += " LIMIT 20;"
            
            cur.execute(query, params)
            rows = cur.fetchall()
            return [dict(row) for row in rows]
    finally:
        conn.close()
