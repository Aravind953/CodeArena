
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI, HTTPException
from app.database import supabase
from app.routes.problems import router as problems_router

BASE_DIR = Path(__file__).resolve().parent

app = FastAPI(
    title="CodeArena API",
    description="Backend API for the CodeArena competitive programming platform",
    version="1.0.0",
    docs_url=None,
    redoc_url=None
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/static",
    StaticFiles(directory=BASE_DIR / "static"),
    name="static"
)
app.include_router(problems_router)

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=f"{app.title} - API Documentation",
        swagger_js_url="/static/swagger-ui-bundle.js",
        swagger_css_url="/static/swagger-ui.css"
    )


@app.get("/")
async def root():
    return {
        "message": "Welcome to CodeArena API",
        "status": "running",
        "version": "1.0.0"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "CodeArena Backend"
    }
@app.get("/health/supabase")
async def supabase_health_check():
    try:
        supabase.table("profiles").select("id").limit(1).execute()

        return {
            "status": "connected",
            "database": "Supabase",
            "message": "Successfully connected to CodeArena database"
        }

    except Exception as error:
        print("Supabase connection error:", error)

        raise HTTPException(
            status_code=503,
            detail="Unable to connect to Supabase. Check backend configuration and database permissions."
        )
        