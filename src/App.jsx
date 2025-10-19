import Header from "./components/Header";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="text-center my-12">
          <h2 className="text-3xl font-bold mb-2">Welcome to The Read Shop</h2>
          <p className="text-gray-700 mb-6">your next favorite read</p>

          {/* Search Bar */}
          <div className="relative w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Type book title or author"
              className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400 text-lg">🔍</span>
          </div>
        </div>

        {/* Featured Books */}
        <section className="text-center my-10">
          <h3 className="text-xl font-semibold mb-6">Featured Books</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { color: "bg-green-500", label: "BOOK 1" },
              { color: "bg-yellow-400", label: "BOOK 2" },
              { color: "bg-red-500", label: "BOOK 3" },
              { color: "bg-blue-900", label: "BOOK 4" },
            ].map((book, i) => (
              <div
                key={i}
                className={`${book.color} text-white py-20 font-bold text-lg rounded shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl`}
              >
                {book.label}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4">
        ©2025 The Read Shop
      </footer>
    </div>
  );
}
