import { useEffect, useState } from "react";
import { getBookDetails } from "../utils/api";

export default function BookDetail({ book, onClose }) {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDetails() {
      try {
        const data = await getBookDetails(book.key);
        setDetails(data);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchDetails();
  }, [book]);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://via.placeholder.com/300x400?text=No+Cover";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full overflow-auto max-h-[90vh] shadow-xl">
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 float-right m-4 font-bold"
        >
          ✕
        </button>
        <div className="p-6">
          <img src={coverUrl} alt={book.title} className="w-48 mx-auto rounded mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-center">{book.title}</h2>
          <p className="text-gray-700 text-center mb-2">
            {book.author_name?.join(", ") || "Unknown Author"}
          </p>
          {error && <p className="text-red-500">{error}</p>}
          {details ? (
            <>
              <p className="text-gray-600 mb-2">
                <strong>Description:</strong>{" "}
                {details.description?.value || details.description || "No description available."}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Published:</strong> {book.first_publish_year || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>ISBN:</strong> {book.isbn?.[0] || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Subjects:</strong>{" "}
                {details.subjects?.slice(0, 5).join(", ") || "N/A"}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Pages:</strong> {details.number_of_pages || "N/A"}
              </p>
            </>
          ) : (
            <p className="text-gray-500">Loading details...</p>
          )}
        </div>
      </div>
    </div>
  );
}