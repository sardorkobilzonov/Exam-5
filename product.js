const container = document.querySelector(".product-container");

async function fetchProduct(id) {
  container.insertAdjacentHTML("afterbegin", "<div class='spinner'></div>");
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
  } finally {
    const spinner = document.querySelector(".spinner");
    spinner.remove();
  }
}

function getProductIdAndTitle() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const productTitle = urlParams.get("title");

  return { productId, productTitle };
}

function renderProduct(product) {
  const div = document.createElement("div");

  const img = document.createElement("img");
  img.src = product.image;
  img.style.width = "300px";
  img.style.height = "400px";

  const ratingContainer = document.createElement("div");
  ratingContainer.style.display = "flex";
  ratingContainer.style.gap = "6px";
  ratingContainer.style.alignItems = "center";

  const price = document.createElement("strong");
  price.textContent = `$${product.price}`;
  div.append(price);

  const starsContainer = document.createElement("div");
  starsContainer.insertAdjacentHTML(
    "beforeend",
    "<span>⭐️</span>".repeat(Math.round(product.rating.rate))
  );
  // starsContainer.style.width = "170px";
  starsContainer.style.marginTop = "auto";

  ratingContainer.append(starsContainer);

  const ratingCount = document.createElement("div");
  ratingCount.textContent = `(${product.rating.count})`;
  ratingContainer.append(ratingCount);
  div.append(ratingContainer);

  div.append(img);

  container.append(div);
}

// IIFE
(async function () {
  try {
    const object = getProductIdAndTitle();
    const { productId: id, productTitle: title } = object;
    document.title = title;

    container.insertAdjacentHTML("afterbegin", `<h1>${title}</h1>`);
    const product = await fetchProduct(id);
    renderProduct(product);
  } catch (error) {}
})();
