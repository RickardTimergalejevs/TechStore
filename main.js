var listOfProducts;

/** Get products from the json file and store it in a gobal variable */
function loadProducts() {
    fetch("./products.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(products) {
        listOfProducts = products;
        addProductsToWebpage();
    });
}

function initSite() {
    loadProducts();

    if (localStorage.getItem("carts")) {
        quantityInCart();
    }
}

/* Render products on the page */
function addProductsToWebpage() {

    const main = document.querySelector("main");

    for (const product of listOfProducts) {

        /* Add elements to the page */
        const div = document.createElement("div");

        const h1 = document.createElement("h1");
        h1.innerText = product.title

        const h3 = document.createElement("h3");
        h3.innerText = product.description

        const img = document.createElement("img");
        img.src = `assets/${product.image}`

        const h2 = document.createElement("h2");
        h2.innerText = `${product.price} kr`; 

        const btn = document.createElement("button");
        btn.innerText = "Lägg till i kundvagnen";

        const i = document.createElement("i");

        /* Link elements and style */
        div.classList.add("productMain")
        main.appendChild(div)
        
        h1.classList.add("productTitle")
        div.appendChild(h1)

        h3.classList.add("productDescription")
        div.appendChild(h3)

        img.classList.add("productImage");
        div.appendChild(img);

        h2.classList.add("productPrice") 
        div.appendChild(h2)

        btn.classList.add("productButton");
        div.appendChild(btn);

        i.classList.add("fa-solid");
        i.classList.add("fa-cart-arrow-down");
        btn.appendChild(i);

        /* Add items to localStorage */
        btn.addEventListener("click", function() {
            const cart = {
                title: product.title,
                image: product.image,
                price: product.price,
            };

            if (!localStorage.getItem("carts")) {
                localStorage.setItem("carts", JSON.stringify([cart]));
            } else {
                const carts = JSON.parse(localStorage.getItem("carts"));
                carts.push(cart);
                localStorage.setItem("carts", JSON.stringify(carts));
            }
        quantityInCart();
       });
    }
}

/* Number of products in the cart */
function quantityInCart() {
    const cartNumber = document.querySelector(".number_products_cart");
    const carts = JSON.parse(localStorage.getItem("carts"));
    cartNumber.innerText = carts.length;
}
