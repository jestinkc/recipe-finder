'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X, Loader2, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Recipe {
  id: number
  title: string
  image: string
  usedIngredients?: Array<{ name: string }>
  missedIngredients?: Array<{ name: string }>
}

interface DetailedRecipe {
  id: number
  title: string
  image: string
  instructions?: string
  sourceUrl?: string
  readyInMinutes?: number
  servings?: number
  usedIngredients?: Array<{ name: string }>
  missedIngredients?: Array<{ name: string }>
  extendedIngredients?: Array<{ original: string }>
}

export default function RecipeModal({
  recipe,
  onClose,
}: {
  recipe: Recipe
  onClose: () => void
}) {
  const [details, setDetails] = useState<DetailedRecipe | null>(null)
  const [loading, setLoading] = useState(true)
  const [ingredientChecks, setIngredientChecks] = useState<Record<string, boolean>>({})
  const [showFullRecipe, setShowFullRecipe] = useState(false)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`/api/recipe/${recipe.id}`)
        if (response.ok) {
          const data = await response.json()
          setDetails(data)
        } else {
          setDetails(recipe as DetailedRecipe)
        }
      } catch (err) {
        console.error('Failed to fetch recipe details:', err)
        setDetails(recipe as DetailedRecipe)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [recipe])

  const toggleIngredient = (name: string) => {
    setIngredientChecks(prev => ({
      ...prev,
      [name]: !prev[name]
    }))
  }

  const usedIngredients = details?.usedIngredients || []
  const missedIngredients = details?.missedIngredients || []
  const extendedIngredients = details?.extendedIngredients || []

  const displayIngredients = extendedIngredients.length > 0 && usedIngredients.length === 0
    ? extendedIngredients.map(ing => ({ name: ing.original }))
    : [...usedIngredients, ...missedIngredients]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold text-foreground pr-8">{details?.title || recipe.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <Image
              src={details?.image || recipe.image || '/placeholder.svg?height=256&width=400&query=recipe'}
              alt={details?.title || recipe.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          {details?.readyInMinutes && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">Ready in</p>
                <p className="text-lg font-semibold text-foreground">{details.readyInMinutes} min</p>
              </div>
              {details?.servings && (
                <div className="bg-muted p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">Servings</p>
                  <p className="text-lg font-semibold text-foreground">{details.servings}</p>
                </div>
              )}
            </div>
          )}

          {/* Ingredients Checklist */}
          {displayIngredients.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Ingredients</h3>
              <div className="space-y-2">
                {displayIngredients.map((ing, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={ingredientChecks[ing.name] || false}
                      onChange={() => toggleIngredient(ing.name)}
                      className="w-4 h-4"
                    />
                    <span className={`text-sm ${ingredientChecks[ing.name] ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                      {ing.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          {details?.instructions ? (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Instructions</h3>
              <p className="text-foreground whitespace-pre-wrap text-sm leading-relaxed">
                {details.instructions}
              </p>
            </div>
          ) : (
            <div className="bg-muted p-4 rounded-lg text-center">
              <p className="text-muted-foreground text-sm">
                {loading ? 'Loading recipe details...' : 'Full instructions available on the recipe source'}
              </p>
            </div>
          )}

          <Button
            onClick={() => setShowFullRecipe(!showFullRecipe)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center gap-2"
          >
            {showFullRecipe ? 'Hide Full Recipe' : 'View Full Recipe'}
            <ChevronDown size={18} className={`transition-transform ${showFullRecipe ? 'rotate-180' : ''}`} />
          </Button>

          {showFullRecipe && (
            <div className="border-t border-border pt-6 space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold text-foreground mb-2">Recipe Source</h4>
                {details?.sourceUrl ? (
                  <div className="flex items-center gap-3">
                    <a
                      href={details.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary underline wrap-break-word"
                    >
                      {details.sourceUrl}
                    </a>
                    <a
                      href={details.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm px-3 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      Open source
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">N/A</p>
                )}
              </div>
              {/* Removed external credit text per request */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
