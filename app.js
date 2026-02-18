const products = [
  { id: 1, name: "Laptop", price: 800, category: "Electronics" },
  { id: 2, name: "Smartphone", price: 600, category: "Electronics" },
  { id: 3, name: "T-shirt", price: 20, category: "Clothing" },
  { id: 4, name: "Blender", price: 50, category: "Home Appliances" },
  { id: 5, name: "Jeans", price: 40, category: "Clothing" },
];

// 1️⃣ Filter by Category
function filterByCategory(products, category) {
  return products.filter(function(product) {
    return product.category === category;
  });
}

// 2️⃣ Get Product Names
function getProductNames(products) {
  return products.map(function(product) {
    return product.name;
  });
}

// 3️⃣ Calculate Total Price
function calculateTotalPrice(products) {
  return products.reduce(function(total, product) {
    return total + product.price;
  }, 0);
}

// 4️⃣ Log Product Details
function logProductDetails(products) {
  products.forEach(function(product) {
    console.log(
      "Product Name: " + product.name +
      ", Price: $" + product.price +
      ", Category: " + product.category
    );
  });
}

// 5️⃣ Get Expensive Products
function getExpensiveProducts(products, minPrice) {
  return products
    .filter(function(product) {
      return product.price >= minPrice;
    })
    .map(function(product) {
      return product.name;
    });
}
