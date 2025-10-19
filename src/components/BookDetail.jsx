import { useEffect, useState, useRef } from "react";
import { fetchWorkDetails, fetchBookByISBN } from "../utils/api";

export default function BookDetail({ book, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      if (!book) return;
      setLoading(true);
      setError("");
      setDetails(null);

      try {
        // Prefer work details if available
        const workKey = book.key?.startsWith("/works/") ? book.key : book.key ? `/works/${book.key.replace('/works/', '')}` : null;
        let workData = null;
        if (workKey) {
          workData = await fetchWorkDetails(workKey);
        }

        // If ISBN available, try the books API for page count and publish date
        let isbnData = null;
        const isbn = book.isbn?.[0] || (book.cover_edition_key ? book.cover_edition_key : null);
        if (isbn) {
          isbnData = await fetchBookByISBN(isbn);
        }

        if (mounted) {
          setDetails({ work: workData, isbn: isbnData });
        }
      } catch (err) {
        console.error(err);
        if (mounted) setError("Failed to load book details.");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [book]);

  if (!book) return null;

  const closeBtnRef = useRef(null);

  useEffect(() => {
    // focus the close button when modal opens
    if (closeBtnRef.current) closeBtnRef.current.focus();
  }, [book]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative transform transition-transform duration-300 scale-100">
        <button
          ref={closeBtnRef}
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
          aria-label="Close details"
        >
          ✖
        </button>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <img
              src={
                book.cover_i
                  ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                  : "https://via.placeholder.com/200x300?text=No+Cover"
              }
              alt={book.title}
              className="w-full h-auto rounded"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-2">
              <strong>Author(s):</strong> {book.author_name?.join(", ") || "Unknown"}
            </p>

            {loading && <p className="text-gray-500">Loading details...</p>}
            {error && <p className="text-red-600">{error}</p>}

            {!loading && (
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <strong>Publisher:</strong> {book.publisher ? book.publisher[0] : "Unknown"}
                </p>

                <p>
                  <strong>First Published:</strong> {book.first_publish_year || "N/A"}
                </p>

                <p>
                  <strong>ISBN:</strong> {book.isbn ? book.isbn.join(", ") : "N/A"}
                </p>

                <p>
                  <strong>Subjects:</strong> {book.subject?.slice(0, 8).join(", ") || "N/A"}
                </p>

                <p>
                  <strong>Number of pages:</strong>{" "}
                  {details?.isbn?.number_of_pages || details?.work?.pagination || "N/A"}
                </p>

                <div>
                  <strong>Description:</strong>
                  <p className="mt-1 text-gray-600">
                    {details?.work?.description?.value || details?.work?.description || details?.isbn?.notes || book.first_sentence || "No description available."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}