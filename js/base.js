const API_LINK = `https://ecommerce-drile.onrender.com`;
const API_INFO = `${API_LINK}/infor`;
const loginUser = JSON.parse(localStorage.getItem("LOGINUSER"));
// scroll nav header
const scrollSticky = document.querySelector("header");

window.addEventListener("scroll", () => {
    let sticky = scrollSticky.offsetTop;
    if (window.pageYOffset > sticky) {
        scrollSticky.classList.add("active");
    } else {
        scrollSticky.classList.remove("active");
    }
});
// scroll nav header end
// getData from url and db.json
async function fetchData(url) {
    const data = await fetch(url);
    const extractData = await data.json();
    return extractData;
}

// getData from url and db.json end
//component header
function componentHeaders() {
    const headers = document.querySelectorAll("header .c-header");
    headers.forEach((item) => {
        item.innerHTML = `
    <div class="c_nav">
    <div class="c_listMenu">
        <div class="c_logo">
        <a href="index.html">
            <img src="img/logo (1).png" alt="logo" />
        </a>
        </div>
        <div class="c_menu">
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="listProduct.html">Product</a></li>
                <li><a href="aboutus.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
            <div class="c_hiddenSearch">
                <i class="fa-thin fa-magnifying-glass"></i>
                <input type="text" placeholder="Search..." />
            </div>
        </div>
    </div>
    <div class="c_listIcon">
        <ul>
            <li class="toggleMenu">
                <i id="search" class="fa-thin fa-magnifying-glass"></i>
            </li>
            ${
                loginUser
                    ? ` <li>
            
            <a href="usersetting.html">
               Hello ! ${loginUser.name}
            </a>
            </li>`
                    : ` <li>
            
        <a href="login.html">
            <i class="fa-thin fa-user"></i>
        </a>
    </li>`
            }
           
            <li class="c_cart">
                <a href="cart.html">
                <i class="fa-thin fa-cart-shopping"></i>
                <span>0</span>
                </a>
            </li>
            <li class="btnHiddenNav"><i class="fa-thin fa-bars"></i></li>
        </ul>
    </div>  
</div>
    <div class="c_hiddenNav">
        <ul class="container">
            <li><a href="index.html">Home</a></li>
            <li><a href="listProduct.html">Product</a></li>
            <li><a href="aboutus.html">Blog</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </div>
    `;
    });
    let search = document.querySelector(".c_hiddenSearch input");
    search.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
            window.location.href = `listProduct.html?keySearch=${search.value}`;
        }
    });
}
componentHeaders();
const btnHidden = document.querySelector("header .btnHiddenNav");
const navHidden = document.querySelector("header .c_hiddenNav");
btnHidden.addEventListener("click", () => {
    navHidden.classList.toggle("active");
});
const displayMenu = document.querySelector(".c_menu ul");
const hiddenMenu = document.querySelector(".c_menu .c_hiddenSearch");
const toggleMenu = document.querySelector(".c_listIcon .toggleMenu #search");
toggleMenu.addEventListener("click", (e) => {
    displayMenu.classList.toggle("active");
    hiddenMenu.classList.toggle("active");

    e.target.classList.toggle("fa-xmark");
});
//component footer
async function componentFooter() {
    const footers = document.querySelector("footer");
    let data = await fetchData(API_INFO);
    footers.innerHTML = `
    <div class="c-wrapper container-fluid">
    <div class="c_footerTop">
        <div class="container">
            <div class="c_logo">
                <img src="${data[0].logo}" alt="logoFooter" />
            </div>
            <div class="row c_inner">
                <div class="col-lg-4 c_infor">
                    <ul>
                        <li><i class="fa-thin fa-location-dot"></i>${data[0].address}</li>
                        <li><i class="fa-thin fa-envelope"></i>${data[0].email}</li>
                        <li><i class="fa-thin fa-phone"></i>${data[0].phone}</li>
                    </ul>
                    <div class="c_platform">
                        <ul>
                            <li>
                                <a href="${data[0].facebook}" target='_blank'>
                                    <i class="fa-brands fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="${data[0].instagram}" target="_blank">
                                    <i class="fa-brands fa-instagram"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-4 c_menu">
                    <ul>
                        <li><a href="">About Us</a></li>
                        <li><a href="">Delivery Info</a></li>
                        <li><a href="">Order Tracking</a></li>
                        <li><a href="">My Account</a></li>
                        <li><a href="">Help</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 c_newsletter">
                    <h3>NEWSLETTER</h3>
                    <p>Enjoy our newsletter yo stay updated with the latest news and special sales.</p>
                    <div class="c_input">
                        <input type="text" placeholder="Enter your emil address" />
                        <i class="fa-thin fa-paper-plane"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="c_footerBottom container">
        <div class="c_inner">
            <div class="c_item"><i class="fa-thin fa-copyright"></i> Drile Theme.All Rights Reserved.</div>
            <div class="c_item">
                <div class="c_payment">
                    <ul>
                        <li><i class="fa-brands fa-cc-visa"></i></li>
                        <li><i class="fa-brands fa-cc-paypal"></i></li>
                        <li><i class="fa-brands fa-cc-mastercard"></i></li>
                        <li><i class="fa-brands fa-cc-discover"></i></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
    `;
}
componentFooter();

//quanlity cart global

const arrCart = localStorage.getItem("LISTCART") ? JSON.parse(localStorage.getItem("LISTCART")) : [];

const quantity = document.querySelector(".c_cart span");

function countCart() {
    quantity.innerHTML = arrCart.length;
}
countCart();
