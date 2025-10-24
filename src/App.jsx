import { useState } from "react";
import Header from "./components/Header";
import { searchBooks } from "./utils/api";
import "./App.css";

export default function App() {
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
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="text-center my-10">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Welcome to The Read Shop
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            Your next favorite read awaits
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="relative w-full max-w-xs sm:max-w-sm mx-auto"
          >
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search books or authors..."
              className="w-full border border-gray-300 rounded-full py-1.5 px-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <button
              type="submit"
              className="absolute right-3 top-1.5 text-gray-400 text-base"
            >
              🔍
            </button>
          </form>
        </div>

        {/* Search Results */}
        <section className="text-center my-10 px-4">
          {loading && <p className="text-gray-700">Loading books...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && books.length === 0 && query && (
            <p className="text-gray-500">No books found. Try another search!</p>
          )}

          {books.length > 0 && (
            <>
              <h3 className="text-xl font-semibold mb-6">Search Results</h3>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-screen-md mx-auto px-4">
                {books.map((book, i) => (
                  <div
                    key={i}
                    className="bg-white p-3 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105 duration-200 border border-gray-100"
                  >
                    <img
                      src={
                        book.cover_i
                          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                          : "https://via.placeholder.com/120x160?text=No+Cover"
                      }
                      alt={book.title}
                      className="w-full h-40 object-cover mb-2 rounded"
                    />
                    <h4 className="font-medium text-gray-800 text-sm truncate">
                      {book.title}
                    </h4>
                    <p className="text-gray-500 text-xs truncate">
                      {book.author_name
                        ? book.author_name.join(", ")
                        : "Unknown Author"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Featured Books */}
        <section className="relative text-center my-16 px-6 py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">
          {/* Floating background orbs */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-10 left-10 w-56 h-56 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-spin-slow"></div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-10 text-gray-800 relative z-10">
            Featured Books
          </h3>

          {/* Books Grid */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-screen-md mx-auto px-4">

            {[
              {
                title: "Atomic Habits",
                author: "James Clear",
                cover: "https://covers.openlibrary.org/b/id/9259251-L.jpg",
                link: "https://openlibrary.org/works/OL20697783W/Atomic_Habits",
              },
              {
                title: "Becoming",
                author: "Michelle Obama",
                cover: "https://covers.openlibrary.org/b/id/9254814-L.jpg",
                link: "https://openlibrary.org/works/OL17350936W/Becoming",
              },
              {
                title: "The Alchemist",
                author: "Paulo Coelho",
                cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg",
                link: "https://openlibrary.org/works/OL262758W/The_Alchemist",
              },
              {
                title: "The 7 Habits of Highly Effective People",
                author: "Stephen R. Covey",
                cover: "https://covers.openlibrary.org/b/id/8165262-L.jpg",
                link: "https://openlibrary.org/works/OL45804W/The_7_Habits_of_Highly_Effective_People",
              },
            ].map((book, i) => (
              <a
                key={i}
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="p-3 text-left">
                  <h4 className="font-semibold text-gray-800 text-sm mb-1 truncate">
                    {book.title}
                  </h4>
                  <p className="text-gray-600 text-xs">{book.author}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 py-4 text-sm">
        ©2025 The Read Shop
      </footer>
    </div>
  );
}