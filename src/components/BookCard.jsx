export default function BookCard({ book, onClick }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/128x180?text=No+Cover";

  return (
    <div
      onClick={() => onClick(book)}
      className="cursor-pointer p-4 bg-white shadow rounded hover:shadow-lg transition"
    >
      <img src={coverUrl} alt={book.title} className="w-32 h-44 mx-auto mb-3 object-cover" />
      <p className="font-semibold text-center">{book.title}</p>
      <p className="text-gray-600 text-sm text-center">
        {book.author_name?.join(", ") || "Unknown Author"}
      </p>
      <p className="text-gray-500 text-xs text-center">
        {book.publisher ? book.publisher[0] : "Unknown Publisher"}
      </p>
    </div>
  );
}