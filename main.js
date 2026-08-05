// ================= NAVBAR =================

const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".navbar nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("show");
});


// Close mobile menu after clicking a link

const navLinks = document.querySelectorAll(".navbar nav a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("show");

    });

});


// ================= CART =================

let cart = [];

const cartBtn = document.getElementById("cartBtn");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

const clearCartBtn = document.getElementById("clearCart");


// Open cart

cartBtn.addEventListener("click", () => {

    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");

});


// Close cart

function closeCartSidebar() {

    cartSidebar.classList.remove("active");
    cartOverlay.classList.remove("active");

}

closeCart.addEventListener("click", closeCartSidebar);

cartOverlay.addEventListener("click", closeCartSidebar);


// ================= ADD TO CART =================

const addButtons = document.querySelectorAll(".add-btn");

addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                quantity: 1
            });

        }

        updateCart();

        cartSidebar.classList.add("active");
        cartOverlay.classList.add("active");

    });

});


// ================= UPDATE CART =================

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "0 EGP";

        return;
    }


    let total = 0;
    let itemCount = 0;


    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;

        total += itemTotal;

        itemCount += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    ${item.price} EGP × ${item.quantity}
                </p>

            </div>


            <button
                class="remove-item"
                data-index="${index}"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = itemCount;

    cartTotal.textContent =
        ${total} EGP;


    // Remove product

    const removeButtons =
        document.querySelectorAll(".remove-item");


    removeButtons.forEach(button => {

        button.addEventListener("click", () => {

            const index =
                Number(button.dataset.index);

            cart.splice(index, 1);

            updateCart();

        });

    });

}


// ================= CLEAR CART =================

clearCartBtn.addEventListener("click", () => {

    cart = [];

    updateCart();

});


// ================= SEARCH =================

const searchInput =
    document.getElementById("searchInput");

const foodCards =
    document.querySelectorAll(".food-card");


searchInput.addEventListener("input", () => {

    const searchValue =
        searchInput.value.toLowerCase().trim();


    foodCards.forEach(card => {

        const name =
            card.querySelector("h3")
                .textContent
                .toLowerCase();


        if (name.includes(searchValue)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

});


// ================= FILTER =================

const filterButtons =
    document.querySelectorAll(".filter-btn");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        const category =
            button.dataset.category;


        foodCards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            if (
                category === "all" ||
                cardCategory === category
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// ================= CONTACT FORM =================

const contactForm =
    document.getElementById("contactForm");


contactForm.addEventListener("submit", event => {

    event.preventDefault();


    const name =
        document.getElementById("name").value;


    alert(
        Thank you, ${name}! Your message has been sent.
    );


    contactForm.reset();

});


// ================= SCROLL ANIMATION =================

const sections =
    document.querySelectorAll(".section");


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.1
        }
    );


sections.forEach(section => {

    observer.observe(section);

});


// ================= INITIAL CART =================

updateCart();