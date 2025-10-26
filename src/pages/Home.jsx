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
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="text-center my-12">
        <h2 className="text-3xl font-bold mb-2 text-gray-800">
          Welcome to The Read Shop
        </h2>
        <p className="text-gray-600 mb-6">Your next favorite read awaits</p>

        {/* Search Bar */}
        <form
  onSubmit={handleSearch}
  className="relative w-full max-w-lg mx-auto flex items-center bg-white border border-gray-300 rounded-xl shadow-sm focus-within:border-blue-500 transition-all duration-300"
>
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search for books, authors, or topics"
    className="flex-grow px-5 py-3 text-gray-800 placeholder-gray-400 border-none focus:outline-none rounded-l-xl text-base"
  />
  <button
    type="submit"
    className="bg-blue-700 text-white px-6 py-3 font-medium rounded-r-xl hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-colors duration-200"
  >
    Search
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

      {/* Featured Books Section */}
      <section className="bookshelf-section text-center my-20 px-6">
        <h3 className="text-3xl font-bold mb-12 text-gray-800 tracking-wide">
          Featured Books
        </h3>

        <div className="bookshelf flex flex-wrap justify-center gap-6">
          {[
            {
              title: "The Subtle Art of Not Giving a F*ck",
              author: "Mark Manson",
              cover: "https://covers.openlibrary.org/b/id/8379856-L.jpg",
              link: "https://openlibrary.org/works/OL17851373W/The_Subtle_Art_of_Not_Giving_a_Fck",
            },
            {
              title: "Educated",
              author: "Tara Westover",
              cover: "https://covers.openlibrary.org/b/id/9258983-L.jpg",
              link: "https://openlibrary.org/works/OL20491388W/Educated",
            },
            {
              title: "The Psychology of Money",
              author: "Morgan Housel",
              cover: "https://covers.openlibrary.org/b/id/10420461-L.jpg",
              link: "https://openlibrary.org/works/OL25268277W/The_Psychology_of_Money",
            },
            {
              title: "Can't Hurt Me",
              author: "David Goggins",
              cover: "https://covers.openlibrary.org/b/id/9365645-L.jpg",
              link: "https://openlibrary.org/works/OL20891310W/Cant_Hurt_Me",
            },
          ].map((book, i) => (
            <a
              key={i}
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="book-card group"
            >
              <img
                src={book.cover}
                alt={book.title}
                className="book-cover group-hover:opacity-90 rounded-lg"
              />
              <div className="book-info mt-2">
                <h4 className="group-hover:text-blue-600 transition-colors duration-300 font-semibold">
                  {book.title}
                </h4>
                <p className="text-sm text-gray-600">{book.author}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}