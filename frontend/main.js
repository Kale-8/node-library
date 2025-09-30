const API = "http://localhost:4000/api";

async function fetchBooks() {
    const res = await fetch(`${API}/books`);
    const data = await res.json();
    const ul = document.getElementById("books");
    ul.innerHTML = "";
    data.forEach(b => {
        const li = document.createElement("li");
        li.textContent = `${b.title} - ${b.author}`;
        ul.appendChild(li);
    });
}

async function fetchLoans() {
    const res = await fetch(`${API}/loans`);
    const data = await res.json();
    const ul = document.getElementById("loans");
    ul.innerHTML = "";
    data.forEach(l => {
        const li = document.createElement("li");
        li.textContent = `${l.book_title || l.book?.title || 'book'} — borrower: ${l.borrower_email || l.borrower?.email || 'unknown'} — return: ${l.return_date} — status: ${l.status}`;
        ul.appendChild(li);
    });
}

document.getElementById("createBook").addEventListener("click", async () => {
    try {
        const res = await fetch(`${API}/books`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": "Bearer 12345"},
            body: JSON.stringify({title: "Libro desde Front", author: "Autor Front"})
        });
        if (!res.ok) throw new Error("Error creating");
        alert("Libro creado");
        await fetchBooks();
    } catch (e) {
        alert("error: " + e);
    }
});
fetchBooks().then(r => r);
fetchLoans().then(r => r);