// Sample customer data
const customers = [
  { id: 1, name: "Ariyan Khan", email: "ariyan@example.com", phone: "01700000001", joinDate: "2024-01-10", status: "Active" },
  { id: 2, name: "Sadia Rahman", email: "sadia@example.com", phone: "01700000002", joinDate: "2024-02-12", status: "Inactive" },
  { id: 3, name: "Jahid Hasan", email: "jahid@example.com", phone: "01700000003", joinDate: "2024-03-20", status: "Active" },
  { id: 4, name: "Mehedi Alam", email: "mehedi@example.com", phone: "01700000004", joinDate: "2024-04-15", status: "Active" },
  { id: 5, name: "Nusrat Jahan", email: "nusrat@example.com", phone: "01700000005", joinDate: "2024-05-05", status: "Inactive" },
];

let currentPage = 1;
const rowsPerPage = 3;

function renderCustomers() {
  const tbody = document.getElementById("customersTable");
  tbody.innerHTML = "";

  const start = (currentPage - 1) * rowsPerPage;
  const paginated = customers.slice(start, start + rowsPerPage);

  paginated.forEach((c, i) => {
    const row = `
      <tr>
        <td class="p-3 border-b">${start + i + 1}</td>
        <td class="p-3 border-b">${c.name}</td>
        <td class="p-3 border-b">${c.email}</td>
        <td class="p-3 border-b">${c.phone}</td>
        <td class="p-3 border-b">${c.joinDate}</td>
        <td class="p-3 border-b">
          <span class="px-2 py-1 rounded text-sm ${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}">
            ${c.status}
          </span>
        </td>
        <td class="p-3 border-b">
          <button class="text-blue-600 hover:underline" onclick="openModal(${c.id})">View</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  document.getElementById("pageInfo").textContent = `Page ${currentPage}`;
}

function openModal(id) {
  const customer = customers.find(c => c.id === id);
  if (!customer) return;

  document.getElementById("modalContent").innerHTML = `
    <p><strong>Name:</strong> ${customer.name}</p>
    <p><strong>Email:</strong> ${customer.email}</p>
    <p><strong>Phone:</strong> ${customer.phone}</p>
    <p><strong>Join Date:</strong> ${customer.joinDate}</p>
    <p><strong>Status:</strong> ${customer.status}</p>
  `;

  document.getElementById("customerModal").classList.remove("hidden");
  document.getElementById("deactivateBtn").onclick = () => deactivateCustomer(id);

   // Active button এর নতুন লজিকটি এইখানে যোগ করতে হবে:
  document.getElementById("activateBtn").onclick = () => activateCustomer(id);
}

function deactivateCustomer(id) {
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index].status = "Inactive";
    renderCustomers();
    closeModal();
  }
}

function activateCustomer(id) {
  const index = customers.findIndex(c => c.id === id);
  if (index !== -1) {
    customers[index].status = "Active";
    renderCustomers();
    closeModal();
  }
}

function closeModal() {
  document.getElementById("customerModal").classList.add("hidden");
}

// Pagination
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    renderCustomers();
  }
});
document.getElementById("nextPage").addEventListener("click", () => {
  if (currentPage * rowsPerPage < customers.length) {
    currentPage++;
    renderCustomers();
  }
});

// Search
document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const tbody = document.getElementById("customersTable");
  tbody.innerHTML = "";

  customers
    .filter(c => c.name.toLowerCase().includes(keyword) || c.email.toLowerCase().includes(keyword))
    .forEach((c, i) => {
      const row = `
        <tr>
          <td class="p-3 border-b">${i + 1}</td>
          <td class="p-3 border-b">${c.name}</td>
          <td class="p-3 border-b">${c.email}</td>
          <td class="p-3 border-b">${c.phone}</td>
          <td class="p-3 border-b">${c.joinDate}</td>
          <td class="p-3 border-b">
            <span class="px-2 py-1 rounded text-sm ${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}">
              ${c.status}
            </span>
          </td>
          <td class="p-3 border-b">
            <button class="text-blue-600 hover:underline" onclick="openModal(${c.id})">View</button>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });
});

// Export CSV
document.getElementById("exportCSV").addEventListener("click", () => {
  let csv = "ID,Name,Email,Phone,Join Date,Status\n";
  customers.forEach(c => {
    csv += `${c.id},${c.name},${c.email},${c.phone},${c.joinDate},${c.status}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "customers.csv";
  link.click();
});

// Close modal
document.getElementById("closeModal").addEventListener("click", closeModal);

// Initial render
renderCustomers();
