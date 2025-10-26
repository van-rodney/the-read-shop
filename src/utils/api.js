import axios from "axios";

const BASE_URL = "https://openlibrary.org";

export async function searchBooks(query) {
  try {
    const response = await axios.get(`${BASE_URL}/search.json?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
}