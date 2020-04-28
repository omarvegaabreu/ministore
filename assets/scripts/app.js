class Product {
  constructor(title, image, desc, price) {
    // /**item object */
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  // /**creates shopping cart */
  items = [];

  set cartItems(value) {
    // /**renders the added values */
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    // /**gets total amount */
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  addProduct(product) {
    // /**writes to the items array  */
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    // /**Renders car section button element  */
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order Now!</button>
    `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  // /**sets the product item */
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    // /**adds product to cart */
    App.addProductToCart(this.product);
  }

  render() {
    // /**renders product object */
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl}" alt="${this.product.title}" >
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>\$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Cart</button>
          </div>
        </div>
      `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  // /***list of dummy products */
  products = [
    new Product(
      "A Pillow",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ3BDsqRZ9YSuJ7l6VwIME4_StTAizJ1afSU_VbaaYBRojtQmkp4Kg9jLOre3sWd_Dc866mf_Q&usqp=CAc",
      "A soft pillow!",
      19.99
    ),
    new Product(
      "A Carpet",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Ardabil_Carpet.jpg/397px-Ardabil_Carpet.jpg",
      "A carpet which you might like - or not.",
      89.99
    ),
  ];

  constructor() {}

  render() {
    // /**renders prod list element */
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  // /**renders all classes */
  render() {
    const renderHook = document.getElementById("app");

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
