'use client'

import RecipeCard from './recipe-card'

interface Recipe {
  id: number
  title: string
  image: string
  usedIngredients: Array<{ name: string }>
  missedIngredients: Array<{ name: string }>
}

interface RecipeGridProps {
  recipes: Recipe[]
  onRecipeClick: (recipe: Recipe) => void
}

export default function RecipeGrid({ recipes, onRecipeClick }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => onRecipeClick(recipe)}
        />
      ))}
    </div>
  )
}
