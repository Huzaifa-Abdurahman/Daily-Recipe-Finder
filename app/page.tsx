import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none opacity-10 z-0">
        {/* Vegetable pattern background */}
        <div className="absolute top-20 left-10 text-6xl">🥕</div>
        <div className="absolute top-40 right-20 text-7xl">🧅</div>
        <div className="absolute bottom-32 left-1/4 text-6xl">🍅</div>
        <div className="absolute bottom-20 right-1/3 text-7xl">🥬</div>
        <div className="absolute top-1/2 right-10 text-6xl">🌽</div>
        <div className="absolute bottom-1/3 left-20 text-5xl">🥔</div>
        <div className="absolute top-1/3 right-1/2 text-6xl">🍊</div>
        <div className="absolute bottom-40 right-20 text-6xl">🥦</div>
      </div>

      {/* Decorative recipe cards pattern */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 z-0">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <pattern id="recipe-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
            <rect width="200" height="200" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="1200" height="800" fill="url(#recipe-pattern)" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto space-y-8 relative z-10">
        <header className="text-center space-y-6 pt-12 pb-8">
          {/* Logo with glow effect */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-parrot/20 blur-2xl rounded-full"></div>
              <img 
                src="/logo.png" 
                alt="Recipe Parrot Logo" 
                className="mx-auto w-48 h-auto drop-shadow-lg relative z-10 hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl font-bold tracking-tight text-wood dark:text-cream">
              Recipe Parrot
            </h1>
            <div className="flex justify-center gap-2 text-2xl opacity-60">
              <span>🍳</span>
              <span>🥘</span>
              <span>🍜</span>
            </div>
          </div>

          <p className="text-lg text-wood-light dark:text-cream-dark max-w-2xl mx-auto leading-relaxed">
            Welcome to the AI-Based Recipe Finder! Enter the ingredients you have at home (separated by commas), and the system will match them with recipes from our database.
          </p>
        </header>

        {/* Main search section with enhanced styling */}
        <section className="bg-white/80 dark:bg-wood p-8 rounded-2xl shadow-xl border border-cream dark:border-wood-light backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🔍</span>
            <h2 className="text-2xl font-semibold text-wood dark:text-cream">Find Your Recipe</h2>
          </div>
          <SearchBar />
        </section>

        {/* Recipe tips section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="bg-gradient-to-br from-parrot/10 to-transparent p-6 rounded-xl border border-parrot/20 hover:border-parrot/50 transition-all duration-300">
            <div className="text-3xl mb-3">👨‍🍳</div>
            <h3 className="font-semibold text-wood dark:text-cream mb-2">Chef's Pick</h3>
            <p className="text-sm text-wood-light dark:text-cream-dark">Discover recipes recommended by our AI chef</p>
          </div>
          <div className="bg-gradient-to-br from-beak/10 to-transparent p-6 rounded-xl border border-beak/20 hover:border-beak/50 transition-all duration-300">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-semibold text-wood dark:text-cream mb-2">Quick Meals</h3>
            <p className="text-sm text-wood-light dark:text-cream-dark">Find recipes ready in 30 minutes or less</p>
          </div>
          <div className="bg-gradient-to-br from-tie/10 to-transparent p-6 rounded-xl border border-tie/20 hover:border-tie/50 transition-all duration-300">
            <div className="text-3xl mb-3">✨</div>
            <h3 className="font-semibold text-wood dark:text-cream mb-2">AI Enhanced</h3>
            <p className="text-sm text-wood-light dark:text-cream-dark">Get professional cooking tips and suggestions</p>
          </div>
        </section>
      </div>
    </main>
  );
}
