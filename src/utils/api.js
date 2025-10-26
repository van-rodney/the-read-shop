import axios from "axios";

const BASE_URL = "https://openlibrary.org/search.json";

export async function searchBooks(query) {
  try {
    const response = await axios.get(`${BASE_URL}?q=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Unable to fetch books. Please try again later.");
  }
}

export async function getBookDetails(workKey) {
  try {
    const response = await axios.get(`https://openlibrary.org${workKey}.json`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book details:", error);
    throw new Error("Unable to fetch book details.");
  }
}