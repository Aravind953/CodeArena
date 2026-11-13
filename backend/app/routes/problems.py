
from fastapi import APIRouter, HTTPException, Query
from app.database import supabase

router = APIRouter(
    prefix="/api/problems",
    tags=["Problems"]
)


@router.get("/")
async def get_problems(
    difficulty: str | None = None,
    category: str | None = None,
    search: str | None = None
):
    try:
        query = (
            supabase.table("problems")
            .select("*")
            .eq("is_published", True)
        )

        if difficulty:
            query = query.eq("difficulty", difficulty)

        if category:
            query = query.eq("category", category)

        if search:
            query = query.ilike("title", f"%{search}%")

        response = query.order("id").execute()

        return {
            "count": len(response.data),
            "problems": response.data
        }

    except Exception as error:
        print("Problems API error:", error)
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve problems"
        )


@router.get("/{slug}")
async def get_problem(slug: str):
    try:
        response = (
            supabase.table("problems")
            .select("*")
            .eq("slug", slug)
            .eq("is_published", True)
            .maybe_single()
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=404,
                detail="Problem not found"
            )

        return response.data

    except HTTPException:
        raise

    except Exception as error:
        print("Problem detail API error:", error)
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve problem"
        )
