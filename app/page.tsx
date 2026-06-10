import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground relative z-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Enhanced Header Section */}
        <header className="text-center space-y-6 pt-12 pb-8">
          {/* Logo with enhanced styling */}
          <div className="relative inline-block mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-parrot to-beak rounded-full opacity-20 blur-xl"></div>
            <img 
              src="/logo.png" 
              alt="Recipe Parrot Logo" 
              className="relative mx-auto w-48 h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300" 
            />
          </div>
          
          {/* Main title with gradient text */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-wood dark:text-cream drop-shadow-sm">
              🍳 Recipe Parrot
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-parrot to-beak mx-auto rounded-full opacity-60"></div>
          </div>
          
          {/* Subtitle with enhanced description */}
          <p className="text-lg text-wood-light dark:text-cream-dark max-w-2xl mx-auto leading-relaxed">
            Welcome to your <span className="font-semibold text-parrot">AI-Powered Recipe Finder</span>! 
            <br />
            <span className="text-sm opacity-90">
              Enter the ingredients you have at home, and discover delicious recipes that match perfectly.
            </span>
          </p>

          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <span className="px-4 py-2 bg-parrot/10 text-parrot rounded-full text-sm font-medium border border-parrot/20">
              ✨ AI-Enhanced Recipes
            </span>
            <span className="px-4 py-2 bg-beak/10 text-beak rounded-full text-sm font-medium border border-beak/20">
              🎯 Smart Matching
            </span>
            <span className="px-4 py-2 bg-cream dark:bg-wood-light/30 text-wood dark:text-cream rounded-full text-sm font-medium">
              📚 Large Database
            </span>
          </div>
        </header>

        {/* Enhanced Search Section */}
        <section className="search-section p-8 rounded-2xl shadow-xl border border-cream/40 dark:border-wood-light/40 backdrop-blur-md">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-wood dark:text-cream mb-2">
              🥘 What's in Your Kitchen?
            </h2>
            <p className="text-sm text-wood-light dark:text-cream-dark">
              Enter ingredients separated by commas (e.g., egg, onion, tomato)
            </p>
          </div>
          <SearchBar />
        </section>

        {/* Footer decoration */}
        <footer className="text-center pt-8 pb-4">
          <p className="text-sm text-wood-light/60 dark:text-cream-dark/60">
            🌿 Farm-to-Table Recipes • Made with <span className="text-tie">❤️</span> for food lovers
          </p>
        </footer>
      </div>
    </main>
  );
}
