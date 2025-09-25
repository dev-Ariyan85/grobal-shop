const showProducts = () => {

    const productsTable = document.getElementById("products-table-body");
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(products => {
            products.forEach(product => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="px-4 py-2">${product.id}</td>
                    <td class="px-4 py-2">${product.name}</td>
                    <td class="px-4 py-2">${product.price}</td>
                    <td class="px-4 py-2">${product.description}</td>
                    <td class="px-4 py-2">
                        <button class="bg-blue-600 text-white px-2 py-1 rounded">Edit</button>
                        <button class="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                    </td>
                `;
                productsTable.appendChild(row);
            });
        });

}
showProducts();

// INsert product
const addProductForm = document.getElementById("add-product-form");
if (addProductForm) {
    addProductForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("product-name").value;
        const price = document.getElementById("product-price").value;
        const description = document.getElementById("product-description").value;

        const newProduct = {
            name: name,
            price: parseFloat(price),
            description: description
        };

        fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(response => response.json())
            .then(data => {
                alert("Product added successfully!");
                
            })
            .catch(error => {
                console.error('Error:', error);
            }
            );
    });
}


// edit button save //
let currentRow = null;

function deleteRow(button) {
  const row = button.closest("tr");
  if (row) row.remove();
}

function editRow(button) {
  currentRow = button.closest("tr");

  // Row থেকে ডেটা আনা
  document.getElementById("editId").value = currentRow.cells[0].innerText;
  document.getElementById("editName").value = currentRow.cells[1].innerText;
  document.getElementById("editPrice").value = currentRow.cells[2].innerText;
  document.getElementById("editDesc").value = currentRow.cells[3].innerText;

  // Modal ওপেন করা
  document.getElementById("editModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
}

// Save করার পর টেবিল আপডেট হবে
document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (currentRow) {
    currentRow.cells[0].innerText = document.getElementById("editId").value;
    currentRow.cells[1].innerText = document.getElementById("editName").value;
    currentRow.cells[2].innerText = document.getElementById("editPrice").value;
    currentRow.cells[3].innerText = document.getElementById("editDesc").value;
  }

  closeModal();
});
