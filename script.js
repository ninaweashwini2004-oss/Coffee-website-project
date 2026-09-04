// ================= NAVBAR =================

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});


// Close navbar after clicking link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});


// ================= CART =================

const cartIcon = document.getElementById("cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("close-cart");

cartIcon.addEventListener("click", () => {

    cart.classList.add("active");

});

closeCart.addEventListener("click", () => {

    cart.classList.remove("active");

});


// Cart Array

let cartData = [];


// ================= ADD TO CART =================

const addButtons = document.querySelectorAll(".add-cart");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingProduct = cartData.find(
            item => item.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cartData.push({

                name: name,
                price: price,
                quantity: 1

            });

        }

        updateCart();

        cart.classList.add("active");

    });

});


// ================= UPDATE CART =================

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    const cartCount = document.getElementById("cart-count");

    const cartTotal = document.getElementById("cart-total");


    cartItems.innerHTML = "";


    if (cartData.length === 0) {

        cartItems.innerHTML =
            '<p class="empty-cart">Your cart is empty.</p>';

    }


    let total = 0;
    let count = 0;


    cartData.forEach((item, index) => {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price} × ${item.quantity}
                </p>

            </div>

            <div>

                <strong>
                    ₹${item.price * item.quantity}
                </strong>

                <br>

                <span
                    class="remove-item"
                    onclick="removeItem(${index})">

                    Remove

                </span>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent = total;

}


// ================= REMOVE ITEM =================

function removeItem(index) {

    cartData.splice(index, 1);

    updateCart();

}


// ================= SEARCH =================

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase();


    document.querySelectorAll(".product-card")
        .forEach(card => {

            const productName =
                card.dataset.name.toLowerCase();


            if (productName.includes(searchValue)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

});


// ================= CATEGORY FILTER =================

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active

        categoryButtons.forEach(btn => {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        const category =
            button.dataset.category;


        document.querySelectorAll(".product-card")
            .forEach(card => {

                if (
                    category === "all" ||
                    card.dataset.category === category
                ) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

    });

});


// ================= CONTACT FORM =================

const contactForm =
    document.getElementById("contact-form");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    alert(
        `Thank you ${name}! Your message has been sent.`
    );


    contactForm.reset();

});


// ================= CHECKOUT =================

const checkout =
    document.getElementById("checkout");


checkout.addEventListener("click", () => {

    if (cartData.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Thank you for your order! ☕"
    );


    cartData = [];

    updateCart();

    cart.classList.remove("active");

});