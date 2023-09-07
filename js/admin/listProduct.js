const API_LISTPRODUCT = `${API_LINK}/listProduct`;
let inputCategories = document.querySelector("#selectCate");
const inputName = document.querySelector("input[name='names']");
let inputPrice = document.querySelector("input[name='price']");
let inputDiscount = document.querySelector("#selectDiscount");
const inputDescribe = document.querySelector("input[name='describe']");
let inputColor = document.querySelector("#selectColor");
let inputMaterial = document.querySelector("#selectMaterial");
const inputImg = document.querySelector("input[name='img-1']");
const imgGet = document.querySelector(".showImg");
const inputHot = document.querySelector("input[type='checkbox']");
const btnAdd = document.querySelector("#btn-add");
const btnUpdate = document.querySelector("#btn-update");
const editor = document.querySelector("textarea");

async function displayCate() {
    const API_CATEGORY = `${API_LINK}/category`;
    const selectCate = document.querySelector("#selectCate");
    let data = await fetchData(API_CATEGORY);
    data.forEach((item) => {
        selectCate.innerHTML += `
        <option value="${item.name}">${item.name}</option>
        `;
    });
}
displayCate();
async function displayColor() {
    const API_COLOR = `${API_LINK}/color`;
    const selectColor = document.querySelector("#selectColor");
    let data = await fetchData(API_COLOR);
    data.forEach((item) => {
        selectColor.innerHTML += `
        <option value="${item.name}">${item.name}</option>
        `;
    });
}
displayColor();
async function displayMaterial() {
    const API_MATERIAL = `${API_LINK}/material`;
    const selectMaterial = document.querySelector("#selectMaterial");
    let data = await fetchData(API_MATERIAL);
    data.forEach((item) => {
        selectMaterial.innerHTML += `
        <option value="${item.material}">${item.material}</option>
        `;
    });
}
displayMaterial();

let uploadImage = "";
inputImg.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});

btnAdd.addEventListener("click", async (event) => {
    event.preventDefault();
    let productObj = {
        categories: inputCategories.value,
        names: inputName.value,
        pirce: inputPrice.value,
        discount: inputDiscount.value,
        desc: inputDescribe.value,
        color: inputColor.value,
        material: inputMaterial.value,
        hot: inputHot.value,
        img: uploadImage,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productObj),
    };
    let res = await fetch(API_LISTPRODUCT, option);
    if (res.ok) {
        alert("Add Success");
    } else {
        alert("Add Fail");
    }
});

async function displayList() {
    const table = document.querySelector("table tbody");
    let data = await fetchData(API_LISTPRODUCT);
    data.forEach((item) => {
        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>
                <img src="${item.img}"/>
            </td>
            <td>${item.names}</td>
            <td>${item.categories}</td>
            <td>${item.pirce}</td>
            <td>${item.discount} %</td>
            <td>${item.hot}</td>
            <td><button onclick="updateList(${item.id})" class="c-button-update">UPDATE</button></td>
            <td><button onclick="deleteList(${item.id})" class="c-button-delete">DELETE</button></td>
        </tr>
        `;
    });
}
displayList();

async function updateList(id) {
    btnAdd.style.display = "none";
    btnUpdate.style.display = "block";
    let data = await fetchData(`${API_LISTPRODUCT}/${id}`);
    inputCategories.value = data.categories;
    imgGet.src = data.img;
    inputName.value = data.names;
    inputPrice.value = data.pirce;
    inputDiscount.value = data.discount;
    inputDescribe.value = data.desc;
    inputColor.value = data.color;
    inputHot.value = data.hot;
    inputMaterial.value = data.material;
    btnUpdate.setAttribute("data-id", id);
}

btnUpdate.addEventListener("click", async () => {
    btnAdd.style.display = "block";
    let id = btnUpdate.getAttribute("data-id");
    let productObj = {
        categories: inputCategories.value,
        names: inputName.value,
        pirce: inputPrice.value,
        discount: inputDiscount.value,
        desc: inputDescribe.value,
        color: inputColor.value,
        material: inputMaterial.value,
        hot: inputHot.value,
        img: uploadImage,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(productObj),
    };
    let res = await fetch(`${API_LISTPRODUCT}/${id}`, option);
    if (res.ok) {
        alert("Update Success");
    } else {
        alert("Update Fail");
    }
});

async function deleteList(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_LISTPRODUCT}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
    } else {
        alert("Delete Fail");
    }
}
