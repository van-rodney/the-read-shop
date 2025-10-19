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

  const handleSearch = async () => {
    if (!searchQuery) return;
    const data = await searchBooks(searchQuery);
    setBooks(data?.docs.slice(0, 10) || []);
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
        <BookList books={books} onBookClick={setSelectedBook} />
        {selectedBook && <BookDetail book={selectedBook} onClose={() => setSelectedBook(null)} />}
      </div>
    </div>
  );
}

export default App;
