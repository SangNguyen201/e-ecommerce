const url = new URL(window.location.href);
const urlid = url.searchParams.get("id");
async function displayInforProduct() {
    const API_DETAIL = `${API_LINK}/listProduct/${urlid}`;
    let dataDetail = await fetchData(API_DETAIL);
    const infor = document.querySelector(".s-detailProduct .s_content");
    const thumb = document.querySelector(".s-detailProduct .s_thumb img");
    thumb.src = dataDetail.img;
    infor.innerHTML = `
    <h3 class="s_title">${dataDetail.names}</h3>
    <p class="s_price my-2 fw-bold fs-5"><span>$</span> ${dataDetail.pirce}</p>
    <div class="s_desc">
    ${dataDetail.desc}
    </div>
    `;
    const API_ANOTHER = `${API_LINK}/listProduct?categories=${dataDetail.categories}`;
    let dataRelated = await fetchData(API_ANOTHER);
    //kiểm tra trùng id , nếu trùng thì ẩn
    const listRelated = document.querySelector(".s-anorther .s_list");
    let filterRelated = dataRelated.filter((item) => item.id !== dataDetail.id);
    filterRelated.forEach((item) => {
        listRelated.innerHTML += `
        <div class="col-lg-4 col-md-6 col-sm-6 mb-2 s_item">
        <a href="detailProduct.html?id=${item.id}">
            <div class="s_thumb">
                <img src="${item.img}" alt="" />
            </div>
            <div class="s_infor">
            <p class="name">${item.names}</p>
            <p class="price"><span>$</span>${item.pirce}</p>
            </div>
            </a>
        </div>
        `;
    });

    const popup = document.querySelector("header .s-popup");
    popup.innerHTML = `
    <div class="s_wrapper">
        <p>Added to cart !</p>
    <div class="row s_inner">
        <div class="col-lg-4 s_thumb">
            <img src="${dataDetail.img}" alt="addCartImg" />
        </div>
        <div class="col-lg-8 s_infor">
            <p class="name">${dataDetail.names}</p>
            <p class="detail">Material : <span id="material-popup"></span>/ <span id="color-popup"></span></p>
            <p class="price"><span>$</span>${dataDetail.pirce}</p>
        </div>
        <a href="cart.html">
            <button class="c-button-1 w-100">View Cart</button>
        </a>
    </div>
    </div>
    `;
}
displayInforProduct();

let quanlity = document.querySelector("input[name='quanlity']");
let clickQuanlity = document.querySelectorAll(".s_quantity .s_number div");
clickQuanlity.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.getAttribute("type") == "plus") {
            ++quanlity.value;
        } else {
            // đặt điều kiện để chặn sự kiện khi number = 1
            if (quanlity.value > 1) {
                --quanlity.value;
            }
        }
    });
});
const btnAdd = document.querySelector(".s_quantity #btn-popup");

btnAdd.addEventListener("click", async () => {
    const popup = document.querySelector("header .s-popup");
    const choiceColor = document.querySelector("#choiceColor");
    const choiceMaterial = document.querySelector("#choiceMaterial");
    if (choiceColor.innerHTML == "") {
        alert("Please !! Choose Color for product");
    } else if (choiceMaterial.innerHTML == "") {
        alert("Please !! Choose Material for product");
    } else {
        const materialPopup = document.querySelector("#material-popup");
        materialPopup.innerHTML = choiceMaterial.innerHTML;
        const ColorPopup = document.querySelector("#color-popup");
        ColorPopup.innerHTML = choiceColor.innerHTML;

        popup.classList.add("active");
        setTimeout(() => {
            popup.classList.remove("active");
        }, 2000);

        const API_DETAIL = `${API_LINK}/listProduct/${urlid}`;
        let dataDetail = await fetchData(API_DETAIL);
        //add vào arrCart thêm 3 key
        const objDetail = {
            detail: dataDetail,
            choice: {
                color: choiceColor.innerHTML,
                material: choiceMaterial.innerHTML,
                quanlity: quanlity.value,
            },
        };
        //kiểm tra id để chặn sự kiện user click tăng số lượng trùng sp và cập nhật lại obj mới nhát
        let findItem = arrCart.findIndex((item) => item.detail.id === dataDetail.id);
        if (findItem >= 0) {
            arrCart[findItem].choice.color = choiceColor.innerHTML;
            arrCart[findItem].choice.material = choiceMaterial.innerHTML;
            arrCart[findItem].choice.quanlity = quanlity.value;
        } else {
            arrCart.push(objDetail);
        }
        localStorage.setItem("LISTCART", JSON.stringify(arrCart));
        countCart(); //function ở file base.js
    }
});
async function listColor() {
    const API_COLOR = `${API_LINK}/color`;
    let data = await fetchData(API_COLOR);
    const choiceColor = document.querySelector("#choiceColor");
    const color = document.querySelector(".s_listColor ul");
    data.forEach((item) => {
        color.innerHTML += `
        <li data-name="${item.name}">
            <span class="Gray"><img src="${item.img}" alt="color" /></span>${item.name}
        </li>
        `;
    });
    const liColor = document.querySelectorAll(".s_listColor ul li");
    liColor.forEach((item) => {
        item.addEventListener("click", () => {
            let nameColor = item.getAttribute("data-name");
            choiceColor.innerHTML = nameColor;
        });
    });
}
listColor();

async function listMaterial() {
    const API_MATERIAL = `${API_LINK}/material`;
    let data = await fetchData(API_MATERIAL);
    const material = document.querySelector(".s_listMaterial ul");
    const choiceMaterial = document.querySelector("#choiceMaterial");
    data.forEach((item) => {
        material.innerHTML += `
        <li data-name="${item.material}"><img src="${item.img}" alt="" />${item.material}</li>        
        `;
    });
    const liMaterial = document.querySelectorAll(".s_listMaterial ul li");
    liMaterial.forEach((item) => {
        item.addEventListener("click", () => {
            let nameMaterial = item.getAttribute("data-name");
            choiceMaterial.innerHTML = nameMaterial;
        });
    });
}
listMaterial();
