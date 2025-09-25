function deleteRow(button) {
  // row (tr) খুঁজে বের করে মুছে ফেলবে
  const row = button.closest("tr");
  if (row) {
    row.remove();
  }
}


let currentRow = null; // কোন row edit হচ্ছে সেটা রাখবো

function deleteRow(button) {
  const row = button.closest("tr");
  if (row) row.remove();
}

function editRow(button) {
  currentRow = button.closest("tr"); // Row ধরে রাখলাম

  // Row থেকে ডেটা নিয়ে Modal ফর্মে বসানো
  document.getElementById("editName").value = currentRow.cells[0].innerText;
  document.getElementById("editCategory").value = currentRow.cells[1].innerText;
  document.getElementById("editPrice").value = currentRow.cells[2].innerText;
  document.getElementById("editStock").value = currentRow.cells[3].innerText;

  document.getElementById("editModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
}

// ফর্ম সাবমিট হলে ডেটা আপডেট করবো
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (currentRow) {
    currentRow.cells[0].innerText = document.getElementById("editName").value;
    currentRow.cells[1].innerText = document.getElementById("editCategory").value;
    currentRow.cells[2].innerText = document.getElementById("editPrice").value;
    currentRow.cells[3].innerText = document.getElementById("editStock").value;
  }

  closeModal();
});
