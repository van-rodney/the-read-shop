export default function Header() {
  return (
    <header className="bg-[#1B1464] text-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto py-3 md:py-4 flex flex-col items-center gap-2">
        <h1 className="text-lg md:text-xl font-bold flex items-center gap-3 uppercase tracking-wider">
          <span className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/20 flex items-center justify-center text-base">📚</span>
          <span>The Read Shop</span>
        </h1>

        <nav className="mt-1 text-center">
          <a href="#" className="text-sm font-medium uppercase hover:underline hover:text-gray-200 transition px-3">Home</a>
          <a href="#" className="text-sm font-medium uppercase hover:underline hover:text-gray-200 transition px-3">Login</a>
          <a href="#" className="text-sm font-medium uppercase hover:underline hover:text-gray-200 transition px-3">About</a>
        </nav>
      </div>
    </header>
  );
}
