
function dataFromServer(url, callback, category = false){
    var productList;
    fetch(url)
    .then((response) => response.json())
    .then((data) => productList = data )
    .then(() => callback(productList, category));
}

dataFromServer('http://localhost:4000/productsList', displayProducts );

function displayProducts(products, category = false) {
    document.querySelector('#products-section').innerHTML = '';
      if(category){
          productsList = products.filter( prod => {return prod.category === category});
          for (let prod of productsList) {
            productItem(prod);
          }
      }
      else{
          for (let prod of products) {
            productItem(prod);
          }
      }   
}


function displayCategory(category){
    dataFromServer('http://localhost:4000/productsList', displayProducts , category );
}




function productItem(product) {
    let productItem = document.createElement('div');
    productItem.setAttribute('class', 'product-item');
 
    let productImage = document.createElement('img');
    productImage.setAttribute('src', product.imageURL);
    productImage.setAttribute('alt', product.sku);

    let productTitle = document.createElement('h3');
    productTitle.setAttribute('class', 'product-title');
    productTitle.innerHTML = product.name;

    let productDescription = document.createElement('p');
    productDescription.setAttribute('class', 'product-description');
    productDescription.innerHTML = product.description;

    let productBuyDescription = document.createElement('div');
    productBuyDescription.setAttribute('class', 'buy-desc');

    let productPrice = document.createElement('p');
    productPrice.innerHTML = 'MRP ';
    let productPriceSpan = document.createElement('span');
    productPriceSpan.innerHTML = `Rs ${product.price}`;
    let productBuy = document.createElement('button');
    productBuy.innerText = 'Buy Now';
    productBuy.onclick = function() {addToCart(product)};
    // productBuy.setAttribute('onclick', `addToCart(${product.name }, ${product.imageURL}, ${null} ,${product.price})`);
    // productBuy.onclick = addToCart(product.name,product.imageURL, null, product.price);

    productPrice.append(productPriceSpan);
    productBuyDescription.append(productPrice);
    productBuyDescription.append(productBuy);

    productItem.appendChild(productTitle);
    productItem.appendChild(productImage);
    productItem.appendChild(productDescription);
    productItem.appendChild(productBuyDescription);

    document.querySelector('#products-section').appendChild(productItem);
}

function loadCartCount(){
    let cartCounter = localStorage.getItem('cartCount');
    if(cartCounter){
        cartCounter = parseInt(cartCounter);
        document.querySelector('.cart-count').innerText = `${cartCounter} items`;
    }else{
        document.querySelector('.cart-count').innerText = `zero items`;
    }
}

loadCartCount();



function addToCart(name, price, inCart, tag, image ) {
    let cartObj = {
        tag,
        name,
        price,
        inCart,
        image,
      };
      let productCartCounter = localStorage.getItem("cartCounter");
      productCartCounter = parseInt(productCartCounter);
      if (productCartCounter) {
        localStorage.setItem("cartCounter", productCartCounter + 1);
        document.querySelector(".cart-count").textContent = productCartCounter + 1;
      } else {
        localStorage.setItem("cartCounter", 1);
        document.querySelector(".cart-count").textContent = 1;
      }
      itemToCart(cartObj);
      cartTotaled(cartObj);
    //   displayCartItems();
}

function itemToCart(cartProduct){
    let cartItems = localStorage.getItem('cartItems');
    cartItems = JSON.parse(cartItems);
    if(cartItems != null){
      if(cartItems[cartProduct.name] == undefined){
          cartItems = { ...cartItems , [cartProduct.name] : cartProduct}
      }
       cartItems[cartProduct].itemCount += 1;
   }else{
       cartProduct.itemCount = 1;
       cartItems = {
           [cartProduct.name] : cartProduct
       };
   }

   localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function cartTotaled(product, removedItem = false ) {
    let cartCost = localStorage.getItem("cartTotal");
    cartCost = parseInt(cartCost);
    if (cartCost != null && !removedItem) {
      localStorage.setItem("cartTotal", cartCost + parseInt(product.itemPrice));
    } else if (cartCost != null && removedItem) {
      localStorage.setItem("cartTotal", cartCost - parseInt(product.itemPrice));
    } else {
      localStorage.setItem("cartTotal", parseInt(product.price));
    }
}
