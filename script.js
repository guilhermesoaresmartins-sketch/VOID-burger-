const products = [

    {
        id: 1,
        name: "Void Classic",
        description: "Pão brioche, smash bovino, queijo e molho da casa.",
        price: 24.90,
        category: "burgers",
        emoji: "🍔"
    },

    {
        id: 2,
        name: "Blackout",
        description: "Duplo smash, cheddar, bacon crocante e molho especial.",
        price: 32.90,
        category: "burgers",
        emoji: "🍔"
    },

    {
        id: 3,
        name: "Red Room",
        description: "Smash, queijo, cebola caramelizada e molho picante.",
        price: 29.90,
        category: "burgers",
        emoji: "🌶️"
    },

    {
        id: 4,
        name: "Void Fries",
        description: "Batata crocante com tempero secreto da casa.",
        price: 14.90,
        category: "porcoes",
        emoji: "🍟"
    },

    {
        id: 5,
        name: "Cheese Fries",
        description: "Batata crocante coberta com cheddar cremoso.",
        price: 19.90,
        category: "porcoes",
        emoji: "🧀"
    },

    {
        id: 6,
        name: "Onion Rings",
        description: "Anéis de cebola empanados e crocantes.",
        price: 17.90,
        category: "porcoes",
        emoji: "🧅"
    },

    {
        id: 7,
        name: "Void Cola",
        description: "Refrigerante gelado 350ml.",
        price: 6.90,
        category: "bebidas",
        emoji: "🥤"
    },

    {
        id: 8,
        name: "Black Lemon",
        description: "Limonada artesanal com limão e hortelã.",
        price: 9.90,
        category: "bebidas",
        emoji: "🍋"
    },

    {
        id: 9,
        name: "Milkshake Void",
        description: "Milkshake cremoso de chocolate.",
        price: 16.90,
        category: "bebidas",
        emoji: "🥤"
    }

];


let cart = [];


/* ELEMENTOS */

const productsContainer =
    document.getElementById("products");

const cartElement =
    document.getElementById("cart");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");

const cartCount =
    document.getElementById("cartCount");

const cartButton =
    document.getElementById("cartButton");

const closeCart =
    document.getElementById("closeCart");

const checkout =
    document.getElementById("checkout");


/* FORMATAR PREÇO */

function formatPrice(price) {

    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* MOSTRAR PRODUTOS */

function renderProducts(category = "todos") {

    productsContainer.innerHTML = "";

    const filteredProducts =
        category === "todos"
            ? products
            : products.filter(
                product => product.category === category
            );


    filteredProducts.forEach(product => {

        const card =
            document.createElement("div");

        card.className = "product";

        card.innerHTML = `

            <div class="product-image">
                ${product.emoji}
            </div>

            <div class="product-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})">

                        + Adicionar

                    </button>

                </div>

            </div>

        `;

        productsContainer.appendChild(card);

    });

}


/* ADICIONAR AO CARRINHO */

function addToCart(productId) {

    const product =
        products.find(
            item => item.id === productId
        );


    const existing =
        cart.find(
            item => item.id === productId
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* ATUALIZAR CARRINHO */

function updateCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        cart.forEach(item => {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <span class="cart-item-price">
                        ${formatPrice(item.price)}
                    </span>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)">
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <strong>
                    ${formatPrice(item.price * item.quantity)}
                </strong>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    const quantity =
        cart.reduce(
            (sum, item) =>
                sum + item.quantity,
            0
        );


    cartTotal.textContent =
        formatPrice(total);

    cartCount.textContent =
        quantity;

}


/* ALTERAR QUANTIDADE */

function changeQuantity(productId, amount) {

    const item =
        cart.find(
            product => product.id === productId
        );


    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                product => product.id !== productId
            );

    }


    updateCart();

}


/* ABRIR CARRINHO */

function openCart() {

    cartElement.classList.add("open");

    cartOverlay.classList.add("show");

    document.body.classList.add("no-scroll");

}


/* FECHAR CARRINHO */

function closeCartFunction() {

    cartElement.classList.remove("open");

    cartOverlay.classList.remove("show");

    document.body.classList.remove("no-scroll");

}


cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartFunction
);


cartOverlay.addEventListener(
    "click",
    closeCartFunction
);


/* CATEGORIAS */

const categoryButtons =
    document.querySelectorAll(".category");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderProducts(
            button.dataset.category
        );

    });

});


/* FINALIZAR PEDIDO */

checkout.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Seu carrinho está vazio.");

        return;

    }


    let message =
        "🍔 *PEDIDO VOID BURGER*%0A%0A";


    cart.forEach(item => {

        message +=
            `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}%0A`;

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    message +=
        `%0A*TOTAL: ${formatPrice(total)}*`;


    /*
        TROQUE PELO NÚMERO DO WHATSAPP
        DA HAMBURGUERIA.
    */

    const phone =
        "5511999999999";


    const url =
        `https://wa.me/${phone}?text=${message}`;


    window.open(url, "_blank");

});


/* INICIAR */

renderProducts();

updateCart();
