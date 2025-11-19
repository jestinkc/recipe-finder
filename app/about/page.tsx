import Navigation from '@/components/navigation'
import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-6">About PantryPal</h1>
        
        <div className="prose prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              PantryPal is built with one simple mission: to reduce food waste and inspire creativity in the kitchen. We believe everyone has ingredients sitting in their pantry that could become something delicious. By connecting you with recipes based on what you already have, we make cooking easier, more sustainable, and more fun.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Using the powerful Spoonacular Recipe API, PantryPal searches through thousands of recipes to find ones that match your ingredients. Whether you have just a few items or a fully stocked kitchen, we'll help you discover what you can make tonight.
            </p>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>Enter the ingredients you have on hand</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>Browse recipes that use those ingredients</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>Save favorites and check off ingredients as you cook</span>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Why PantryPal?</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Reduce food waste by using what you have
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Get inspired with new recipes daily
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Save your favorite recipes for later
              </li>
              <li className="flex items-center gap-2">
                <span className="text-accent">✓</span> Track your search history
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Get Started</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Ready to discover what you can cook? Head back to the home page and start searching!
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition"
            >
              Find Recipes Now
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
