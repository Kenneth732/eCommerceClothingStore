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

  // Function to update the cart and render it
  function updateCart() {
    cartItems.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement('li');
      cartItem.classList.add('cartItem');
      cartItem.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <span>${item.name}</span>
        <button class="quantityBtn decrease" data-id="${item.id}">-</button>
        <span>${item.quantity}</span>
        <button class="quantityBtn increase" data-id="${item.id}">+</button>
        <span>$${item.price * item.quantity}</span>
        <button class="removeBtn" data-id="${item.id}">Remove</button>
      `;

      const decreaseBtn = cartItem.querySelector('.decrease');
      const increaseBtn = cartItem.querySelector('.increase');
      const removeBtn = cartItem.querySelector('.removeBtn');

      decreaseBtn.addEventListener('click', () => {
        decreaseQuantity(item);
      });

      increaseBtn.addEventListener('click', () => {
        increaseQuantity(item);
      });

      removeBtn.addEventListener('click', () => {
        removeFromCart(item);
      });

      cartItems.appendChild(cartItem);
      totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = totalPrice;
    document.getElementById('cartItemCount').textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  // Function to decrease the quantity of an item in the cart
  function decreaseQuantity(item) {
    item.quantity = Math.max(0, item.quantity - 1);
    updateCart();
  }

  // Function to increase the quantity of an item in the cart
  function increaseQuantity(item) {
    item.quantity++;
    updateCart();
  }

  // Function to remove an item from the cart
  function removeFromCart(item) {
    const index = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    updateCart();
  }

  // Toggle the cart display when clicking on the cart icon
  cartIcon.addEventListener('click', () => {
    const cartDiv = document.getElementById('cart');
    cartDiv.classList.toggle('active');
  });
});
