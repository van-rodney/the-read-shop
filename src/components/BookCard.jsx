export default function BookCard({ book, onClick }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <div
      onClick={() => onClick(book)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg cursor-pointer transition"
    >
      <img src={coverUrl} alt={book.title} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{book.title}</h3>
        <p className="text-sm text-gray-600">
          {book.author_name?.join(", ") || "Unknown Author"}
        </p>
        <p className="text-sm text-gray-500">
          {book.publisher?.[0] || "Unknown Publisher"}
        </p>
      </div>
    </div>
  );
}