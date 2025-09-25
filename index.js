function showProducts() {
    fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');

            productList.innerHTML = '';


            data.forEach(product => {
                const li = document.createElement('div');
                li.innerHTML = `<div class="bg-white rounded-2xl shadow hover:shadow-lg p-4 transition">
                                    <img src="https://placehold.co/600x400" class="w-full h-48 object-cover rounded-xl" alt="Product 2">
                                    <input type="hidden" id="product-id" value="${product.id}">
                                    <h3 class="mt-4 text-lg font-semibold">${product.name}</h3>
                                    <p class="text-gray-600 mt-1">$${product.price}</p>
                                    <button class="mt-3 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition">
                                        Add to Cart
                                    </button>
                                </div>`;
                           
                productList.appendChild(li);
                updateCartButton(product.id);
            });

        })
        .catch(error => console.error('Error fetching products:', error));
}

document.addEventListener('DOMContentLoaded', showProducts);





// Add to Cart functionality (basic example)


const productList = document.getElementById('product-list');





// You can expand this functionality to maintain a cart state, show cart items, etc.
// This is a basic example to get you started.
const cart = [];

productList.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {

        const productId = event.target.parentElement.querySelector('#product-id').value;

        cart.push({ productId: productId, quantity: 1 });
        addToCart({ productId: productId, quantity: 1 });
    }
});



//show cart items on clicking cart icon
const cartButton = document.getElementById('cart-button');
cartButton.addEventListener('click', function () {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    let cartDetails = 'Items in your cart:\n';
    cart.forEach((item, index) => {
        cartDetails += `${index + 1}. ${item.name} - ${item.price}\n`;
    });

    alert(cartDetails);
});

// change add to cart button when cart has items

productList.addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        event.target.innerText = 'Added to Cart';
        event.target.disabled = true;
        event.target.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        event.target.classList.add('bg-green-600');
    }
});

// You can expand this functionality to maintain a cart state, show cart items, etc.
// This is a basic example to get you started.


function addToCart(product) {

    //save to database
    fetch('http://localhost:3000/carts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product added to cart:', data);
    })
    .catch(error => {
        console.error('Error adding product to cart:', error);
    });
}


//per product cart item update on product card
function updateCartButton(productId) {
    
    const buttons = productList.querySelectorAll('button');

    buttons.forEach(button => {

        const id = button.parentElement.querySelector('#product-id').value;

        if(id == productId) {
            //check if product is in cart
            fetch('http://localhost:3000/carts')
            .then(response => response.json())
            .then(data => {
                const isInCart = data.some(item => item.productId == productId);
                console.log(isInCart);
                
                if (isInCart) {
                    button.innerText = 'Added to Cart';
                    button.disabled = true;
                    button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                    button.classList.add('bg-green-600');
                }
            })
            .catch(error => console.error('Error fetching cart items:', error));
        }
    });

    // buttons.forEach(button => {
    //     const id = button.parentElement.querySelector('#product-id').value;
    //     if (id == productId) {
    //         button.innerText = 'Added to Cart';
    //         button.disabled = true;
    //         button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
    //         button.classList.add('bg-green-600');
    //     }
    // });
}   








// Fetch cart items and update cart icon
function fetchCartItems() {
    fetch('http://localhost:3000/carts')
        .then(response => response.json())
        .then(data => {
            
            console.log('Cart items:', data);
            if (data.length > 0) {
                cartButton.innerHTML = `
                    <svg class="w-6 h-6 text-gray-700 hover:text-blue-600 transition" fill="none" stroke="currentColor"
                        stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span
                        class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                        ${data.length}
                    </span>
                `;
            }

        })
        .catch(error => console.error('Error fetching cart items:', error));
}

document.addEventListener('DOMContentLoaded', fetchCartItems);






