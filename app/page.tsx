import Navigation from '@/components/navigation'
import Hero from '@/components/hero'
import SearchSection from '@/components/search-section'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <SearchSection />
      </main>
    </div>
  )
}
