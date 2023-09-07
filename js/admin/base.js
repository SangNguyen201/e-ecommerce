const API_LINK = `http://localhost:3000`;
const admin = JSON.parse(localStorage.getItem("ADMIN"));
function checkAuthor() {
    if (!admin) {
        window.location.href = "index.html";
    } else {
        document.querySelector("#inforadmin").innerHTML = `Hello ! ${admin}`;
    }
}
checkAuthor();
document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("ADMIN");
    window.location.href = "index.html";
});
async function fetchData(url) {
    const data = await fetch(url);
    const extractData = data.json();
    return extractData;
}

const dashboard = document.querySelector("#dashboard");

function componentDashBoard() {
    dashboard.innerHTML = `
    <h3 class="pb-5">Dashboard</h3>
    <ul>
        <li><i class="fa-regular fa-house"></i><a href="infoAdmin.html">Infor Website</a></li>
        <li class="parentMenu"><i class="fa-solid fa-p"></i>
        <a href=""></a>Manage Product<span class="arrow"><i class="fa-thin fa-angle-down"></i></span>
        </li>
        <ul class="c_childMenu">
            <li><a href="manageProduct.html">Product Portfolio</a></li>
            <li><a href="listProduct.html">Product List</a></li>
            <li><a href="material.html">Material</a></li>
            <li><a href="color.html">Color</a></li>
        </ul>
        <li><i class="fa-sharp fa-solid fa-image"></i><a href="banner.html">Manage Banner</a></li>
        <li><i class="fa-sharp fa-solid fa-pen-to-square"></i><a href="review.html">Manage Review</a></li>
        <li><i class="fa-regular fa-cart-plus"></i><a href="order.html">Manage Order</a></li>
        <li><i class="fa-sharp fa-light fa-user"></i><a href="settingUser.html">Manage User</a></li>
        <li><i class="fa-light fa-address-book"></i><a href="contact.html">Manage Contact</a></li>
    </ul>
    `;
    const button = document.querySelector(".c-dashboard .parentMenu");
    const hiddenMenu = document.querySelector(".c-dashboard .c_childMenu");
    const arrow = document.querySelector(".c-dashboard li span");
    button.addEventListener("click", () => {
        hiddenMenu.classList.toggle("active");
        arrow.classList.toggle("active");
    });
}
componentDashBoard();
