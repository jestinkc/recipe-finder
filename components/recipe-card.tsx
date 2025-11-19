'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Recipe {
  id: number
  title: string
  image: string
  usedIngredients: Array<{ name: string }>
  missedIngredients: Array<{ name: string }>
}

export default function RecipeCard({
  recipe,
  onClick,
}: {
  recipe: Recipe
  onClick: () => void
}) {
  const [isFavorited, setIsFavorited] = useState(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('pantrypal-favorites') || '[]')
      return favorites.includes(recipe.id)
    }
    return false
  })

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation()
    const favorites = JSON.parse(localStorage.getItem('pantrypal-favorites') || '[]')
    const newFavorites = isFavorited
      ? favorites.filter((id: number) => id !== recipe.id)
      : [...favorites, recipe.id]
    localStorage.setItem('pantrypal-favorites', JSON.stringify(newFavorites))
    setIsFavorited(!isFavorited)
  }

  return (
    <div
      className="recipe-card bg-card rounded-lg overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        <Image
          src={recipe.image || "/placeholder.svg"}
          alt={recipe.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-3 line-clamp-2">
          {recipe.title}
        </h3>

        <div className="mb-4">
          {(() => {
            const usedIngredients = recipe.usedIngredients || []
            return (
              <>
                <p className="text-xs text-muted-foreground mb-2">
                  Using {usedIngredients.length} ingredients
                </p>
                <div className="flex flex-wrap gap-1">
                  {usedIngredients.slice(0, 3).map((ing, idx) => (
                    <span key={idx} className="ingredient-badge">
                      {ing.name}
                    </span>
                  ))}
                  {usedIngredients.length > 3 && (
                    <span className="ingredient-badge">
                      +{usedIngredients.length - 3} more
                    </span>
                  )}
                </div>
              </>
            )
          })()}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onClick}
          >
            View Recipe
          </Button>
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-lg transition ${
              isFavorited
                ? 'bg-primary/10 text-primary'
                : 'bg-muted text-muted-foreground hover:bg-muted'
            }`}
          >
            <Heart size={18} fill={isFavorited ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}
