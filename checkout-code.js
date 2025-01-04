<script>
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('#wf-form-note'); // Targets your specific form by ID

  document.getElementById("order-now").addEventListener("click", async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const formData = new FormData(form);
    const name = formData.get("name") || "N/A";
    const phone = formData.get("phone") || "N/A"; // Collect phone data
    const address = formData.get("address") || "N/A"; // Collect address data
    const codAmount = parseFloat(formData.get("cod-amount").replace(/[^\d.-]/g, '').trim()) || 0; // Remove dollar sign and parse to float
    const products = formData.get("product-name") || "N/A"; // Collect product names from textarea

    // Log the COD Amount for debugging
    console.log("COD Amount: ", codAmount); // Log to see the value

    // Validate phone number
    if (!/^\d{11}$/.test(phone)) {
      alert("Invalid phone number. It must be 11 digits.");
      return;
    }

    // Validate if cod-amount is a valid positive number
    if (isNaN(codAmount) || codAmount <= 0) {
      console.log("Invalid COD Amount:", codAmount); // Log invalid codAmount
      alert("Invalid COD amount. It must be a positive number.");
      return;
    }

    // Format product names with serial numbers (line by line)
    const productNames = products.split('\n').map((product, index) => `${index + 1}. ${product}`).join('\n'); // Add serial numbers

    // Prepare the order object for Steadfast API
    const order = {
      invoice: "INV-" + Date.now(), // Unique invoice using timestamp
      recipient_name: name,
      recipient_phone: phone,
      recipient_address: address,
      cod_amount: codAmount, // Use parsed cod-amount value
      note: "Products: \n" + productNames // Add product names with serial numbers and new line in note
    };

    try {
      // API endpoint and credentials
      const apiUrl = "https://portal.packzy.com/api/v1/create_order"; // Steadfast API endpoint
      const apiKey = "qqttx8cimje2yucn4hphhlvwwwutnnqh"; // Your API Key
      const secretKey = "nwkqyxy3de61qpfduvd8fwdn"; // Your Secret Key

      // Send POST request to Steadfast API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Api-Key": apiKey,
          "Secret-Key": secretKey,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Order sent successfully! Tracking Code: " + result.consignment.tracking_code);
        console.log("Response:", result);
      } else {
        alert("Failed to send order. Check your inputs or API credentials.");
        console.error("Error:", result);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  });
});
</script>



<script>

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the cart data from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cart"));

  if (cartItems) {
    // Select the form with id 'wf-form-note'
    const form = document.getElementById("wf-form-note");
    
    if (form) {
      // Select the cod-amount and product-name fields inside the form
      const codAmountField = form.querySelector("#cod-amount");
      const productNameField = form.querySelector("#product-name");

      if (codAmountField && productNameField) {
        // Initialize variables to store total price and product names
        let totalPrice = 0;
        let productNames = "";

        // Loop through the cart items and calculate total price and concatenate product names
        cartItems.forEach(item => {
          totalPrice += parseFloat(item.price); // Add price to the total
          productNames += item.name + ", "; // Add product name, comma-separated
        });

        // Update the cod-amount and product-name fields with the appropriate values
        codAmountField.value = `$${totalPrice.toFixed(2)}`; // Set the total price
        productNameField.value = productNames.slice(0, -2); // Remove trailing comma and space
      }
    }
  }
});

</script>
