export default function SearchBar({ searchQuery, setSearchQuery, handleSearch }) {
  return (
    <div className="my-4 flex justify-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search books..."
        className="border p-2 rounded-l w-64 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 rounded-r hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}