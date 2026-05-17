import SearchBar from '@/components/SearchBar';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-6 pt-12 pb-8">
          <img src="/logo.png" alt="Recipe Parrot Logo" className="mx-auto w-48 h-auto drop-shadow-lg" />
          <h1 className="text-5xl font-bold tracking-tight text-wood dark:text-cream">Recipe Parrot</h1>
          <p className="text-lg text-wood-light dark:text-cream-dark max-w-2xl mx-auto">
            Welcome to the AI-Based Recipe Finder! Enter the ingredients you have at home (separated by commas), and the system will match them with recipes from our database.
          </p>
        </header>

        <section className="bg-white/80 dark:bg-wood p-8 rounded-2xl shadow-xl border border-cream dark:border-wood-light backdrop-blur-sm">
          <SearchBar />
        </section>
      </div>
    </main>
  );
}
