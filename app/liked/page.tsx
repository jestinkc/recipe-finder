"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import RecipeCard from '@/components/recipe-card'
import RecipeModal from '@/components/recipe-modal'
import { Button } from '@/components/ui/button'

interface DetailedRecipe {
  id: number
  title: string
  image: string
  usedIngredients?: Array<{ name: string }>
  missedIngredients?: Array<{ name: string }>
  extendedIngredients?: Array<{ original: string }>
  instructions?: string
  sourceUrl?: string
  readyInMinutes?: number
  servings?: number
}

export default function LikedPage() {
  const router = useRouter()
  const [recipes, setRecipes] = useState<DetailedRecipe[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRecipe, setActiveRecipe] = useState<DetailedRecipe | null>(null)

  useEffect(() => {
    const loadFavorites = async () => {
      if (typeof window === 'undefined') return
      const favorites = JSON.parse(localStorage.getItem('pantrypal-favorites') || '[]') as number[]
      if (!favorites || favorites.length === 0) {
        setRecipes([])
        setLoading(false)
        return
      }

      try {
        const results = await Promise.all(favorites.map(async (id) => {
          const res = await fetch(`/api/recipe/${id}`)
          if (res.ok) return res.json()
          return null
        }))
        setRecipes(results.filter(Boolean))
      } catch (err) {
        console.error('Failed to load favorite recipes', err)
      } finally {
        setLoading(false)
      }
    }

    loadFavorites()
  }, [])

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Liked Recipes</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push('/')}>Home</Button>
        </div>
      </div>

      {loading ? (
        <p>Loading favorites...</p>
      ) : recipes.length === 0 ? (
        <div className="bg-muted p-6 rounded-lg text-center">
          <p className="text-muted-foreground">You haven't liked any recipes yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r: DetailedRecipe) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              onClick={() => setActiveRecipe(r)}
            />
          ))}
        </div>
      )}

      {activeRecipe && (
        <RecipeModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} />
      )}
    </div>
  )
}
