import BookCard from "./BookCard";

export default function BookList({ books, onBookClick }) {
  if (!books || books.length === 0) {
    return <p className="text-gray-500 text-center mt-4">No books found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.key} book={book} onClick={onBookClick} />
      ))}
    </div>
  );
}