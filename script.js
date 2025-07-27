// Defining food items
const foodItems = [
  { name: "Jollof Rice", price: 1500 },
  { name: "Egusi Soup", price: 2000 },
  { name: "Oha Soup", price: 1800 },
  { name: "Suya", price: 700 },
  { name: "Ofada Rice", price: 1700 },
  { name: "Beans and Plantain", price: 1400 }
];

const cart = [];
const cartItemsEl = document.getElementById("cart-items");
const totalEl = document.getElementById("total");
const submitBtn = document.getElementById("submit-order");
const printBtn = document.getElementById("print-order");
const loader = document.getElementById("loader");

// Attaching event listeners to all "Add To Plate" buttons
document.querySelectorAll(".menu-container .card").forEach((card, index) => {
  const button = card.querySelector("button");
  button.addEventListener("click", () => {
    addToCart(foodItems[index]);
  });
});

function addToCart(item) {
  cart.push(item);
  updateCart();
}

function updateCart() {
  cartItemsEl.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - N${item.price}`;
    cartItemsEl.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalEl.textContent = `Total: N${total}`;
}

//Determining success of Placing Order
submitBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("You haven’t added anything to your plate yet!");
    return;
  }

  loader.style.display = "block";
  submitBtn.disabled = true;

  setTimeout(() => {
    loader.style.display = "none";
    alert("Your order has been submitted successfully!");
    cart.length = 0;
    updateCart();
    submitBtn.disabled = false;
  }, 2000);
});

//Determining success of Printing
printBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your plate is empty. Add something before printing.");
    return;
  }

  const printWindow = window.open("", "", "width=600,height=400");
  printWindow.document.write("<html><head><title>Print Order</title></head><body>");
  printWindow.document.write("<h1>Your Plate</h1><ul>");

  cart.forEach((item) => {
    printWindow.document.write(`<li>${item.name} - N${item.price}</li>`);
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  printWindow.document.write(`</ul><h2>Total: N${total}</h2><p>Buka 9 Foods and Eateries</p>`);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.print();
});