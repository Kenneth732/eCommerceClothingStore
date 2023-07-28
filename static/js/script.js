// JavaScript
document.addEventListener('DOMContentLoaded', () => {
  const clothingList = document.getElementById('clothingList');
  const cartItems = document.getElementById('cartItems');
  const totalPriceElement = document.getElementById('totalPrice');
  const cartIcon = document.getElementById('cartIcon');
  const cart = [];

  // Fetch clothing data from JSON and render it on the webpage
  fetch('db.json')
    .then((res) => res.json())
    .then((data) => {
      data.clothingData.forEach((item) => {
        renderClothingItem(item);
      });
    })
    .catch((error) => console.error('Error fetching data:', error));

  // Function to render a single clothing item on the webpage
  function renderClothingItem(item) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${item.name}</h3>
      <img src="${item.image}" alt="${item.name}">
      <p>Price: $${item.price}</p>
      <button class="addToCartBtn" data-id="${item.id}">Add to Cart</button>
    `;

    const addToCartBtn = card.querySelector('.addToCartBtn');
    addToCartBtn.addEventListener('click', () => {
      addToCart(item);
    });

    clothingList.appendChild(card);
  }

  // Function to add an item to the cart
  function addToCart(item) {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    updateCart();
  }

});
