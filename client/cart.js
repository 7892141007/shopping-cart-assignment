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

function displayCartItems() {
    let cartItems = localStorage.getItem("cartItems");
    let cartCost = localStorage.getItem("cartTotal");
    cartItems = JSON.parse(cartItems);
    console.log("cartItems");
    let productContainer = document.querySelector(".cart-products");
    let shoppingCartDiv = document.querySelector(".cart-container");
    if (cartItems && productContainer && Object.keys(cartItems).length !== 0) {
      productContainer.innerHTML = "";
      Object.values(cartItems).map((item) => {
        productContainer.innerHTML += `
              <div class="product">
              <div class="product-image">
                <img src="${item.image}">
              </div>
              <div class="product-details">
                <h4 class="product-title">${item.name}</h4>
              </div>
              <div class="product-price"> ${parseInt(item.price)}</div>
              <div class="product-quantity">
              <i onclick="removeFromCart('${item.name}','${item.price}',${0},'${
          item.tag
        }')" style="margin-right: 10px;" class="fa fa-minus-circle"></i> ${
          item.inCart
        } <i onclick="addToCart('${item.name}','${item.price}',${0},'${
          item.tag
        }')" style="margin-left: 10px;" class="fa fa-plus-circle"></i>
              </div>
              <div class="product-line-price"> ${
                item.inCart * parseInt(item.price)
              }</div>
            </div>`;
      });
      productContainer.innerHTML += `
        <button class="checkout" onclick="clearStorage()" >Proceed to Checkout <span>Rs ${cartCost}</span></button>`;
    } else {
      shoppingCartDiv.innerHTML = `<h1 class="noCart-h1">No items in your cart</h1>
           <p class="noCart-p">Your favorite items are just a click away</p>
           <button class="checkout checkout1"><a href="home.html">Start Shopping<a/></button>`;
    }
}

// displayCartItems();

function handleCart() {
    // show the dropdown first;
    displayCartItems();
}

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
      displayCartItems();
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

function removeFromCart(cartProduct){
    let cartCounter = localStorage.getItem('cartCount');
    cartCounter = parseInt(cartCounter);

    if(cartCounter){
        localStorage.setItem('cartCount', cartCounter - 1);
        document.querySelector('.cart-count').innerText = `${cartCounter} items`;
    }else{
        localStorage.setItem('cartCount', 1);
        document.querySelector('.cart-count').innerText = `${cartCounter} items`;
    }

    itemFromCart(cartProduct.name);
    cartTotaled(cartProduct);
    displayCartItems();
}

function itemFromCart(cartProduct) {
   let cartProducts = localStorage.getItem('cartItems');
   cartProducts = JSON.parse(cartProducts);
 
   cartProducts = cartProducts.filter((product) => {return product.name !== cartProduct}) 
   
   localStorage.setItem("cartItems", JSON.stringify(cartProducts));
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

