export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p className="text-gray-500">No books found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {books.map((book) => (
        <div key={book.key} className="p-4 bg-white shadow rounded">
          <p className="font-semibold">{book.title}</p>
          <p className="text-gray-600">{book.author_name?.join(", ") || "Unknown Author"}</p>
        </div>
      ))}
    </div>
  );
}