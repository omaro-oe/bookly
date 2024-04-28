let loginForm = document.querySelector(".login-form");
(document.querySelector("#login-user").onclick = () => {
  loginForm.classList.add("active");
}),
(document.querySelector("#close-btn").onclick = () => {
  loginForm.classList.remove("active");
});
var swiper = new Swiper(".mySwiper", {
  loop: !0,
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    0: { slidesPerView: 2 },
    768: { slidesPerView: 4 },
    1024: { slidesPerView: 3 },
  },
});
let cartIcon = document.querySelector("#cart-icon"),
  cart = document.querySelector(".cart"),
  closeCart = document.querySelector("#close-cart");

function ready() {
  var e = document.getElementsByClassName("cart-remove");
  console.log(e);
  for (var t = 0; t < e.length; t++)
    e[t].addEventListener("click", removeCartItems);

  for (var a = document.getElementsByClassName("cart-quantity"), t = 0; t < a.length; t++)
    a[t].addEventListener("change", quantitychanged);

  for (var r = document.getElementsByClassName("add-cart"), t = 0; t < r.length; t++)
    r[t].addEventListener("click", addCartClicked);

  document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  alert("your order is placed");
  for (var e = document.getElementsByClassName("cart-content")[0]; e.hasChildNodes(); )
    e.removeChild(e.firstChild);
  updatetotal();
}

function removeCartItems(e) {
  e.target.parentElement.remove(), updatetotal();
}

function quantitychanged(e) {
  e = e.target;
  (isNaN(e.value) || e.value <= 0) && (e.value = 1), updatetotal();
}

function addCartClicked(e) {
  e = e.target.parentElement;
  addProductToCart(
    e.getElementsByClassName("book-name")[0].innerText,
    e.getElementsByClassName("price")[0].innerText,
    e.getElementsByClassName("book-photo")[0].src
  ), updatetotal();
}

function addProductToCart(e, t, a) {
  var r = document.createElement("div");
  r.classList.add("cart-box"), r.classList.add("row");

  for (var i = 0; i < document.getElementsByClassName("cart-content")[0].getElementsByClassName("cart-product-title").length; i++) {
    if (document.getElementsByClassName("cart-content")[0].getElementsByClassName("cart-product-title")[i].innerText === e) {
      alert("you have already added this item");
      return;
    }
  }

  var cartBoxContent = `
    <img src="${a}" alt="" class="cart-img col-4">
    <div class="detail-box col-4">
      <p style="margin: 2%;"  class="cart-product-title">${e}</p>
      <p style="margin: 3%;" class="cart-price">${t}</p>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class="fa-solid fa-circle-minus cart-remove col-2"></i>
  `;

  r.innerHTML = cartBoxContent;
  document.getElementsByClassName("cart-content")[0].append(r);

  r.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItems);
  r.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantitychanged);
}

(cartIcon.onclick = () => {
  cart.classList.add("show");
}),
(closeCart.onclick = () => {
  cart.classList.remove("show");
}),
  "loading" == document.readyState ? document.addEventListener("DOMContentLoaded", ready) : ready();

function updatetotal() {
  for (var e = document.getElementsByClassName("cart-content")[0].getElementsByClassName("cart-box"), t = 0, a = 0; a < e.length; a++) {
    var r = e[a].getElementsByClassName("cart-price")[0],
    n = e[a].getElementsByClassName("cart-quantity")[0];
    t += parseFloat(r.innerText.replace("$", "")) * n.value;
  }
  t = Math.round(100 * t) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + t;
}

let arr = [];

