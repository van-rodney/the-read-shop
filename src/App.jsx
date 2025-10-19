import { useState } from "react";
import Header from "./components/Header";
import BookList from "./components/BookList";
import BookCard from "./components/BookCard";
import BookDetail from "./components/BookDetail";
import { searchBooks, fetchWorkDetails, fetchBookByISBN } from "./utils/api";
import featuredBooks from "./data/featuredBooks";

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

    // Preload featured book details so modal opens instantly for featured items
    useEffect(() => {
      let mounted = true;
      async function preload() {
        try {
          const promises = featuredBooks.map(async (b) => {
            const workKey = b.key?.startsWith("/works/") ? b.key : b.key ? `/works/${b.key.replace('/works/', '')}` : null;
            const work = workKey ? await fetchWorkDetails(workKey) : null;
            const isbn = b.isbn?.[0] || (b.cover_edition_key ? b.cover_edition_key : null);
            const isbnData = isbn ? await fetchBookByISBN(isbn) : null;
            return { ...b, _details: { work, isbn: isbnData } };
          });

          const enriched = await Promise.all(promises);
          if (mounted) {
            // replace featuredBooks' objects in-place for simplicity
            enriched.forEach((eb, i) => (featuredBooks[i] = eb));
          }
        } catch (err) {
          // preload errors are non-fatal
          console.error('preload featured failed', err);
        }
      }

      preload();
      return () => {
        mounted = false;
      };
    }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Hero / Search */}
      <div className="flex justify-center my-10 px-4">
        <div className="w-full max-w-3xl bg-gradient-to-r from-indigo-50 via-white to-indigo-50 rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-2 text-center text-[#0f172a]">Welcome to The Read Shop</h2>
          <p className="text-gray-600 mb-6 text-center">Find your next favorite read — quick and easy.</p>

          <div className="relative w-full max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Type book title or author"
              className="w-full border border-gray-200 rounded-full py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            {searchQuery ? (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 text-gray-600 rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-300 shadow"
                onClick={() => {
                  setSearchQuery("");
                  setBooks([]);
                  setError("");
                }}
                aria-label="Clear search"
              >
                ✖
              </button>
            ) : (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-indigo-600 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-indigo-700 shadow"
                onClick={handleSearch}
                aria-label="Search"
              >
                🔍
              </button>
            )}
          </div>
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
        <div className="my-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-semibold mb-2 text-[#0f172a]">Featured Books</h3>
            <p className="text-gray-600 mb-6">Hand-picked selections just for you</p>
          </div>

          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {books && books.length > 0 ? (
                books.slice(0, 4).map((b, i) => (
                  <div
                    key={b.key || i}
                    className="bg-white rounded-lg shadow p-4 text-left overflow-hidden hover:shadow-lg transition"
                  >
                    <p className="font-bold text-sm truncate">{b.title}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      {b.author_name?.join(", ") || "Unknown Author"}
                    </p>
                  </div>
                ))
              ) : (
                featuredBooks.map((b) => (
                  <div key={b.key} className="cursor-pointer">
                    <BookCard book={b} onClick={setSelectedBook} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Book Detail Modal */}
        {selectedBook && (
          <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-6 bg-gradient-to-t from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-sm text-gray-600">©2025 The Read Shop</p>
            <p className="text-sm text-gray-500">Built with ❤️ · Open Library API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
