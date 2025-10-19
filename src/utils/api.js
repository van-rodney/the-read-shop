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

/**
 * Fetch work details from Open Library using the work key (e.g. '/works/OL12345W' or 'OL12345W')
 */
export async function fetchWorkDetails(workKey) {
  if (!workKey) return null;
  let key = workKey;
  if (!key.startsWith("/")) {
    // normalize if just the id was provided
    if (!key.startsWith("/works/")) {
      key = `/works/${key}`;
    } else {
      key = `/${key}`;
    }
  }

  const url = `https://openlibrary.org${key}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('fetchWorkDetails error', err);
    return null;
  }
}

/**
 * Fetch book data by ISBN using the Books API (returns the data object for the ISBN key)
 */
export async function fetchBookByISBN(isbn) {
  if (!isbn) return null;
  const key = `ISBN:${isbn}`;
  const url = `https://openlibrary.org/api/books?bibkeys=${encodeURIComponent(key)}&format=json&jscmd=data`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    return data[key] || null;
  } catch (err) {
    console.error('fetchBookByISBN error', err);
    return null;
  }
}
