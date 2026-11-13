import os
from pathlib import Path
from dotenv import load_dotenv

ENV_FILE = Path(__file__).resolve().parents[1] / ".env"

load_dotenv(ENV_FILE, override=True)

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_PUBLISHABLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Supabase environment variables are missing")
print("Supabase URL:", SUPABASE_URL)
print("Supabase key loaded:", bool(SUPABASE_KEY))