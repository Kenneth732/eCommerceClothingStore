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
 
});
