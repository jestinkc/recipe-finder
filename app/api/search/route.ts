import { NextRequest, NextResponse } from 'next/server'

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY

export async function POST(request: NextRequest) {
  if (!SPOONACULAR_API_KEY) {
    console.error('[v0] SPOONACULAR_API_KEY is not configured')
    return NextResponse.json(
      { error: 'Spoonacular API key is not configured. Please add SPOONACULAR_API_KEY to your environment variables.' },
      { status: 500 }
    )
  }

  try {
    const { ingredients } = await request.json()

    if (!ingredients) {
      return NextResponse.json(
        { error: 'Ingredients are required' },
        { status: 400 }
      )
    }

    console.log('[v0] Searching recipes with ingredients:', ingredients)

    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=12&apiKey=${SPOONACULAR_API_KEY}`,
      { method: 'GET' }
    )

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[v0] Spoonacular API error:', response.status, errorText)
      throw new Error(`Spoonacular API returned status ${response.status}`)
    }

    const recipes = await response.json()
    console.log('[v0] Found recipes:', recipes.length)
    return NextResponse.json(recipes)
  } catch (error) {
    console.error('[v0] Search API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to search recipes' },
      { status: 500 }
    )
  }
}
