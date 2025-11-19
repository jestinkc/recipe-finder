'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import RecipeGrid from './recipe-grid'
import RecipeModal from './recipe-modal'
import SearchHistory from './search-history'

interface Recipe {
  id: number
  title: string
  image: string
  usedIngredients: Array<{ name: string }>
  missedIngredients: Array<{ name: string }>
}

export default function SearchSection() {
  const [ingredients, setIngredients] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [error, setError] = useState('')
  const [searchHistory, setSearchHistory] = useState<string[]>([])

  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('pantrypal-search-history')
    if (saved) {
      setSearchHistory(JSON.parse(saved))
    }
  }, [])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ingredients.trim()) return

    setLoading(true)
    setError('')
    setRecipes([])

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredients.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        console.log('[v0] API error response:', data)
        throw new Error(data.error || 'Failed to fetch recipes')
      }

      setRecipes(data)

      // Update search history
      const newHistory = [ingredients.trim(), ...searchHistory.filter(h => h !== ingredients.trim())].slice(0, 5)
      setSearchHistory(newHistory)
      localStorage.setItem('pantrypal-search-history', JSON.stringify(newHistory))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Could not find recipes. Try different ingredients.'
      setError(`Oops! ${errorMessage}`)
      console.error('[v0] Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleHistoryClick = (query: string) => {
    setIngredients(query)
    // Trigger search by creating and submitting a form event
    const formEvent = new Event('submit', { bubbles: true }) as any
    formEvent.preventDefault = () => {}
    handleSearch(formEvent)
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <form onSubmit={handleSearch} className="mb-12">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="text"
            placeholder="Enter ingredients (e.g., chicken, tomato, pasta)..."
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="flex-1 h-12"
          />
          <Button
            type="submit"
            disabled={loading}
            className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? 'Searching...' : 'Find Recipes'}
          </Button>
        </div>
      </form>

      {searchHistory.length > 0 && !recipes.length && (
        <SearchHistory history={searchHistory} onSelect={handleHistoryClick} />
      )}

      {error && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {recipes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Found {recipes.length} Recipes
          </h2>
          <RecipeGrid recipes={recipes} onRecipeClick={setSelectedRecipe} />
        </div>
      )}

      {selectedRecipe && (
        <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
      )}
    </section>
  )
}
