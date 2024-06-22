import { checkToken, redirect } from "./utils.js";

const container = document.querySelector(".products-container");

async function fetchProducts() {
  container.insertAdjacentHTML("afterbegin", "<div class='spinner'></div>");

  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();

  return products;
}

function renderProducts(products) {
  const spinner = document.querySelector(".spinner");
  spinner.remove();

  products.forEach((product) => {
    const li = document.createElement("li");
    li.style.width = "250px";
    li.style.height = "550px";

    const imgLink = document.createElement("a");
    imgLink.href = `/product.html?id=${product.id}&title=${product.title}`;
    const img = document.createElement("img");
    img.src = product.image;
    imgLink.append(img);
    li.append(imgLink);

    const title = document.createElement("h3");
    title.textContent = product.title;
    li.append(title);

    const ratingContainer = document.createElement("div");
    ratingContainer.style.display = "flex";
    ratingContainer.style.gap = "1rem";

    const starsContainer = document.createElement("div");
    starsContainer.insertAdjacentHTML(
      "beforeend",
      "<span>⭐</span>".repeat(Math.round(product.rating.rate))
    );
    ratingContainer.append(starsContainer);

    const ratingCount = document.createElement("div");
    ratingCount.textContent = `(${product.rating.count})`;
    ratingContainer.append(ratingCount);

    li.append(ratingContainer);

    const price = document.createElement("strong");
    price.textContent = `$${product.price}`;
    li.append(price);

    const btn = document.createElement("button");
    btn.textContent = "Add  to cart";
    li.append(btn);

    container.append(li);
  });
}

//IIFE
(async function () {
  const products = await fetchProducts();
  renderProducts(products);

  const hasToken = checkToken();
  if (hasToken == false) {
    redirect("/login.html");
  }
})();
