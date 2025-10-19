import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
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
      <div className="container mx-auto p-4">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

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

        {/* Book Detail Modal */}
        {selectedBook && (
          <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />
        )}
      </div>
    </div>
  );
}

export default App;
