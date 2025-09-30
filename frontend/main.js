import axios from 'axios';

const API = "http://localhost:4000/api";

const booksList = document.getElementById("booksList");
const loansList = document.getElementById("loansList");
const createBookBtn = document.getElementById("createBookBtn");

async function fetchBooks() {
  try {
    const res = await axios.get(`${API}/books`);
    renderBooks(res.data);
  } catch (err) {
    console.error("Error fetching books:", err);
  }
}

async function fetchLoans() {
  try {
    const res = await axios.get(`${API}/loans`);
    renderLoans(res.data);
  } catch (err) {
    console.error("Error fetching loans:", err);
  }
}

async function createBook() {
  try {
    await axios.post(
      `${API}/books`,
      { title: "Nuevo Libro desde Front", author: "Autor Demo" },
      { headers: { Authorization: "Bearer 12345" } }
    );

    alert("Libro creado");
    await fetchBooks();
  } catch (err) {
    alert(err.response?.data?.message || "Error al crear libro");
    console.error("Error creating book:", err);
  }
}

function renderBooks(books) {
  booksList.innerHTML = "";
  books.forEach(b => {
    const li = document.createElement("li");
    li.textContent = `${b.title} - ${b.author}`;
    booksList.appendChild(li);
  });
}

function renderLoans(loans) {
  loansList.innerHTML = "";
  loans.forEach(l => {
    const li = document.createElement("li");
    li.textContent = `${l.book?.title || "Unknown"} — borrower: ${l.borrower?.email || "N/A"} — return: ${l.return_date || "N/A"} — status: ${l.status || "N/A"}`;
    loansList.appendChild(li);
  });
}

await fetchBooks();
await fetchLoans();
createBookBtn.addEventListener("click", createBook);
