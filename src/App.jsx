import { useState } from "react";
import Header from "./components/Header";
import BookList from "./components/BookList";
import BookDetail from "./components/BookDetail";
import { searchBooks } from "./utils/api";

function App() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const data = await searchBooks(searchQuery);
      if (!data?.docs || data.docs.length === 0) {
        setError("No books found for this search.");
      } else {
        setBooks(data.docs.slice(0, 10));
      }
    } catch (err) {
      setError("Failed to fetch books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero / Search */}
      <div className="text-center my-8">
        <h2 className="text-3xl font-bold mb-2">Welcome to The Read Shop</h2>
        <p className="text-gray-700 mb-4">your next favorite read</p>
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Type book title or author"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <span
            className="absolute right-3 top-2 text-gray-400 text-lg cursor-pointer"
            onClick={handleSearch}
          >
            🔍
          </span>
        </div>
      </div>

      <div className="container mx-auto p-4">
        {/* Loading State */}
        {loading && <p className="text-center my-4 text-gray-600">Loading...</p>}

        {/* Error Message */}
        {error && !loading && (
          <p className="text-center my-4 text-red-600 font-semibold">{error}</p>
        )}

        {/* Book List */}
        {!loading && !error && (
          <BookList books={books} onBookClick={setSelectedBook} />
        )}

        {/* Featured Books Section */}
        <div className="text-center my-8">
          <h3 className="text-xl font-semibold mb-4">Featured Books</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {books && books.length > 0 ? (
              books.slice(0, 4).map((b, i) => (
                <div
                  key={b.key || i}
                  className="bg-white rounded shadow p-4 text-left overflow-hidden"
                >
                  <p className="font-bold text-sm truncate">{b.title}</p>
                  <p className="text-xs text-gray-600">
                    {b.author_name?.join(", ") || "Unknown Author"}
                  </p>
                </div>
              ))
            ) : (
              <>
                <div className="bg-green-500 text-white py-20 font-bold">BOOK 1</div>
                <div className="bg-yellow-400 text-white py-20 font-bold">BOOK 2</div>
                <div className="bg-red-500 text-white py-20 font-bold">BOOK 3</div>
                <div className="bg-blue-900 text-white py-20 font-bold">BOOK 4</div>
              </>
            )}
          </div>
        </div>

        {/* Book Detail Modal */}
        {selectedBook && (
          <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4">
        ©2025 The Read Shop
      </footer>
    </div>
  );
}

export default App;
