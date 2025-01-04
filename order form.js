<script>
  document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list"); // Cart container

    // Load cart from localStorage if available
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem("cart"));
      if (storedCart) {
        storedCart.forEach(product => {
          addProductToCart(product.name, product.price);
        });
      }
    };

    // Save the cart to localStorage
    const saveCartToLocalStorage = () => {
      const cartItems = [];
      document.querySelectorAll(".product-item").forEach(item => {
        const productName = item.querySelector("p").textContent.split(" - ")[0];
        const productPrice = item.querySelector("p").textContent.split(" - $")[1];
        cartItems.push({ name: productName, price: productPrice });
      });
      localStorage.setItem("cart", JSON.stringify(cartItems));
    };

    // Function to add product to cart
    const addProductToCart = (name, price) => {
      // Create product item div
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      // Add product details
      productItem.innerHTML = `
        <p>${name} - $${price}</p>
        <button class="remove-product">Remove</button>
      `;

      // Append product to the cart
      productList.appendChild(productItem);

      // Handle remove button inside the product item
      productItem.querySelector(".remove-product").addEventListener("click", function () {
        productList.removeChild(productItem); // Remove product
        saveCartToLocalStorage(); // Save updated cart to localStorage
      });

      saveCartToLocalStorage(); // Save updated cart to localStorage
    };

    // Handle adding products to cart
    document.querySelectorAll(".add-to-product-list").forEach(button => {
      button.addEventListener("click", function () {
        const productName = this.getAttribute("data-product-name");
        const productPrice = this.getAttribute("data-product-price");

        addProductToCart(productName, productPrice); // Add product to cart
      });
    });

    // Load existing cart when the page loads
    loadCart();

    // Checkout button click event
    document.getElementById("checkout-button").addEventListener("click", function () {
      // Collect the cart items (product name and price)
      const cartItems = [];
      document.querySelectorAll(".product-item").forEach(item => {
        const productName = item.querySelector("p").textContent.split(" - ")[0];
        const productPrice = parseFloat(item.querySelector("p").textContent.split(" - $")[1]);
        cartItems.push({ name: productName, price: productPrice });
      });

      // Calculate the total price
      const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

      // Store cart data in localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));
      localStorage.setItem("totalPrice", totalPrice);

      // Navigate to the checkout page
      window.location.href = "/checkout-page"; // You can update this to the correct path
    });
  });
</script>
