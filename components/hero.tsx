export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-transparent py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Your Pantry, Endless Recipes
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          Enter the ingredients you have on hand and discover delicious recipes waiting to be made.
        </p>
        <p className="text-sm text-muted-foreground">
          From quick weeknight dinners to impressive dinner party dishes—all from what you already have.
        </p>
      </div>
    </section>
  )
}
