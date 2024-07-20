import { checkToken, redirect } from "./utils.js";

const container = document.querySelector(".products-container");

async function fetchProducts() {
  container.insertAdjacentHTML("afterbegin", "<div class='spinner'></div>");

  const response = await fetch("https://api.escuelajs.co/api/v1/products");
  const products = await response.json();

  return products;
}

function renderProducts(products) {
  const spinner = document.querySelector(".spinner");
  spinner.remove();

  products.forEach((product) => {
    const input = document.createElement("input");
    input.style.width = "230px";
    input.style.height = "550px";

    const imgLink = document.createElement("a");
    imgLink.href = `/product.html?id=${product.id}&title=${product.title}`;
    const img = document.createElement("img");
    img.src = product.image;
    imgLink.append(img);
    input.append(imgLink);

    const title = document.createElement("input");
    title.textContent = product.title;
    input.append(title);

    const ratingContainer = document.createElement("div");
    ratingContainer.style.display = "flex";
    ratingContainer.style.gap = "1rem";

    input.append(ratingContainer);

    const price = document.createElement("input");
    price.textContent = `$${product.price}`;
    input.append(price);

    const btn = document.createElement("button");
    btn.textContent = "Add";
    input.append(btn);

    container.append(input);
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
