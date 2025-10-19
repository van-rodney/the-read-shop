// Minimal API utility for searching books using Open Library
// Exports a named function `searchBooks(query)` used by src/App.jsx
export async function searchBooks(query) {
  if (!query) return null;

  const encoded = encodeURIComponent(query);
  const url = `https://openlibrary.org/search.json?q=${encoded}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error('OpenLibrary responded with', res.status);
      return null;
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('searchBooks error', err);
    return null;
  }
}

export default { searchBooks };
