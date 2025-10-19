import { useState } from "react";
import { searchBooks } from "../utils/api";

export default function Home() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const data = await searchBooks(query);
      setBooks(data.docs);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-12 min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-2 text-gray-800">
        Welcome to The Read Shop
      </h2>
      <p className="text-gray-600 mb-6">Your next favorite read awaits</p>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-full max-w-md mx-auto mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search books or authors..."
          className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-3 top-2 text-gray-400 text-lg"
        >
          🔍
        </button>
      </form>

      {/* Search Results */}
      {loading && <p className="text-gray-700">Loading books...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && books.length === 0 && query && (
        <p className="text-gray-500">No books found. Try another search!</p>
      )}

      {books.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {books.map((book, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition transform hover:scale-105"
            >
              <img
                src={
                  book.cover_i
                    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                    : "https://via.placeholder.com/150x200?text=No+Cover"
                }
                alt={book.title}
                className="w-full h-48 object-cover mb-2 rounded"
              />
              <h4 className="font-semibold text-sm text-gray-800">
                {book.title}
              </h4>
              <p className="text-gray-600 text-xs">
                {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}