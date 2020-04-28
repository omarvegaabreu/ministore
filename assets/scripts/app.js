class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCartHandler() {
    console.log("add to cart button");
    console.log(this.product);
  }

  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
      <div> 
      <img src="${this.product.imageUrl}" alt="${this.product.title}">
        <div class="product-item__content"> 
          <h2>${this.product.title}</h2>
          <h3>\$${this.product.price}</h3>
          <p>${this.product.description}</p>
          <button>Add to Cart</button>
        </div>
      </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCartHandler.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      "A pillow",
      "https://thorlo-prod.scdn1.secure.raxcdn.com/images/0fee6e7.jpg",
      19.95,
      "only buy made in america"
    ),
    new Product(
      "A flag",
      "https://www.minespress.com/Content/Images/uploaded/Blog/american-made-products.jpg",
      19.95,
      "american flag"
    ),
  ];

  constructor() {} //empty for now

  render() {
    const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";

    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    renderHook.append(prodList);
  }
}
const productsList = new ProductList();

productsList.render();
