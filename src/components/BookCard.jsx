export default function BookCard({ book, onClick }) {
  const coverId = book.cover_i;
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/128x180?text=No+Cover";

  return (
    <div
      onClick={() => onClick(book)}
      className="cursor-pointer p-4 bg-white border border-gray-100 shadow-sm rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all flex flex-col items-center"
    >
      <img src={coverUrl} alt={book.title} className="w-32 h-44 mb-3 object-cover rounded" />
      <div className="text-center">
        <p className="font-semibold text-sm truncate w-40">{book.title}</p>
        <p className="text-gray-600 text-xs mt-1">
          {book.author_name?.join(", ") || "Unknown Author"}
        </p>
        <p className="text-gray-500 text-xs mt-1">
          {book.publisher ? book.publisher[0] : "Unknown Publisher"}
        </p>
      </div>
    </div>
  );
}
