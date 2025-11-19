import { NextRequest, NextResponse } from 'next/server'

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!SPOONACULAR_API_KEY) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    )
  }

  try {
    const { id } = await params

    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`,
      { method: 'GET' }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch recipe details')
    }

    const recipe = await response.json()
    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Recipe detail API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch recipe details' },
      { status: 500 }
    )
  }
}
