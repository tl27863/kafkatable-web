const socket = io("YOUR_BACKEND_SERVER_ADDRESS_HERE");
const tableBody = document.getElementById("kafka-table-body");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const currentPageSpan = document.getElementById("currentPage");
const totalPagesSpan = document.getElementById("totalPages");

const maxRows = 100;
const rowsPerPage = 10;
let currentPage = 1;
let allMessages = [];

function updatePaginationControls() {
  const totalPages = Math.ceil(allMessages.length / rowsPerPage);
  currentPageSpan.textContent = currentPage;
  totalPagesSpan.textContent = totalPages;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
}

function displayPage(page) {
  const start = (page - 1) * rowsPerPage;
  const end = start + rowsPerPage;
  const pageMessages = allMessages.slice(start, end);

  tableBody.innerHTML = "";
  pageMessages.forEach((message) => {
    const row = document.createElement("tr");
    const formattedData = JSON.stringify(message.data, null, 2);

    row.innerHTML = `
            <td>${message.timestamp}</td>
            <td><pre><code class="language-json">${formattedData}</code></pre></td>
        `;
    tableBody.appendChild(row);

    // Highlight the newly added code block
    row.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });
  });
}

socket.on("kafka-message", (message) => {
  allMessages.unshift(message);
  if (allMessages.length > maxRows) {
    allMessages = allMessages.slice(0, maxRows);
  }
  if (currentPage === 1) {
    displayPage(1);
  }
  updatePaginationControls();
});

prevPageBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
    updatePaginationControls();
  }
});

nextPageBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(allMessages.length / rowsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
    updatePaginationControls();
  }
});

socket.on("connect", () => {
  console.log("Connected to server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from server");
});

displayPage(1);
updatePaginationControls();
