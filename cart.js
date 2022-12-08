const buyBtn = document.querySelector(".buy_button");

const carts = JSON.parse(localStorage.getItem("carts"));

function initSite() {
    if (!localStorage.getItem("carts")) {
        buyBtn.style.display = "none";
    } else {
        renderProductsInCart();
        quantityInCart();
        productsPriceResult();
    }
}

/* Render products on the cart page */
function renderProductsInCart() {
    const cartContainer = document.querySelector(".cart_container");

    cartContainer.innerHTML = "";

    for (const product of carts) {

        /* Add elements to the page */
        const div = document.createElement("div");
        
        const img = document.createElement("img");
        img.src = `assets/${product.image}`
        
        const h1 = document.createElement("h1");
        h1.innerText = product.title

        const p = document.createElement("p");
        p.innerText = `${product.price} kr`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Ta bort";

        const i = document.createElement("i");
        
        /* Link elements and style */
        div.classList.add("productMainCart")
        cartContainer.appendChild(div)

        img.classList.add("productImageCart");
        div.appendChild(img);
        
        h1.classList.add("productTitleCart")
        div.appendChild(h1)

        p.classList.add("productPriceCart") 
        div.appendChild(p);

        deleteBtn.classList.add("productButtonDelete");
        div.appendChild(deleteBtn);

        i.classList.add("fa-solid");
        i.classList.add("fa-trash-can");
        deleteBtn.appendChild(i);

        /* Remove items from cart */
        deleteBtn.addEventListener("click", function() {

        const index = carts.indexOf(product);
        carts.splice(index, 1);
        
        if (carts.length > 0) {
            localStorage.setItem("carts", JSON.stringify(carts));
            } else {
            localStorage.removeItem("carts");
            }

        if (!localStorage.getItem("carts")) {
            buyBtn.style.display = "none";
            const priseResult = document.querySelector(".total_price_result");
            priseResult.style.display = "none";
            }

            renderProductsInCart();
            quantityInCart();
            productsPriceResult() 
        });
    }
}

/* Number of products in the cart page */
function quantityInCart() {
    const cartNumber = document.querySelector(".number_products_cart");

    if (localStorage.getItem("carts")) {
        cartNumber.innerText = carts.length;
    } else {
        cartNumber.innerText = "";
    }
}

/* Complete purchase */
buyBtn.addEventListener("click", function() {
    const cartContainer = document.querySelector(".cart_container");
    const purchaseBox = document.querySelector(".purchase_box");
    const products = JSON.parse(localStorage.getItem("carts"));
    const order = products;

    purchaseBox.style.visibility = "visible";

    if (!localStorage.getItem("orders")) {
        localStorage.setItem("orders", JSON.stringify([order]))
    } else {
        const orders = JSON.parse(localStorage.getItem("orders"))
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
    }

   localStorage.removeItem("carts");
   renderProductsInCart()
   quantityInCart()
   cartContainer.innerHTML = "";
   buyBtn.style.visibility = "hidden";
});

/* Products total price */  
function productsPriceResult() {
    const priseResult = document.querySelector(".total_price_result");
    
    const productsPriceResult = carts.reduce((total, item) => {
        return total + item.price;
    }, 0);

    priseResult.innerText = `Totalt pris: ${productsPriceResult} kr`;
}