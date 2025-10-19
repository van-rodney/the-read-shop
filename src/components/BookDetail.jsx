export default function BookDetail({ book, onClose }) {
  if (!book) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative transform transition-transform duration-300 scale-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-1">
          <strong>Author(s):</strong> {book.author_name?.join(", ") || "Unknown"}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Publisher:</strong> {book.publisher ? book.publisher[0] : "Unknown"}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>First Published:</strong> {book.first_publish_year || "N/A"}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>ISBN:</strong> {book.isbn ? book.isbn[0] : "N/A"}
        </p>
        <p className="text-gray-600 mb-1">
          <strong>Subjects:</strong> {book.subject?.join(", ") || "N/A"}
        </p>
      </div>
    </div>
  );
}