const API_CATEGORY = `${API_LINK}/category`;
const imgGet = document.querySelector(".c-dashboard .showImg");
const imgInput = document.querySelector("input[name='imgCategory']");
const category = document.querySelector("input[name='nameCategory']");
const btnCaterogy = document.querySelector(".c-dashboard #btb_category");
const showTable = document.querySelector("table tbody");
const btnUpdate = document.querySelector("#update_category");

//Convert ảnh sang base 64
let uploadImage = "";
imgInput.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});

btnCaterogy.addEventListener("click", async (event) => {
    event.preventDefault();
    let newProduct = {
        img: uploadImage,
        name: category.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
    };
    let res = await fetch(API_CATEGORY, option);
    if (res.ok) {
        alert("Add Success !");
        displayCategory();
    } else {
        alert("Fail !");
    }
});

async function displayCategory() {
    const data = await fetchData(API_CATEGORY);
    showTable.innerHTML = "";
    data.forEach((item) => {
        showTable.innerHTML += `
    <tr>
        <td>${item.id}</td>
        <td>
            <img src=${item.img} alt=""/>
        </td>
        <td>${item.name}</td>
        <td><button onclick="updateItem(${item.id})" class="c-button-update">UPDATE</button></td>
        <td><button onclick="deleteItem(${item.id})" class="c-button-delete">DELETE</button></td>
    </tr>
    `;
    });
}
displayCategory();

async function deleteItem(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_CATEGORY}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
        displayCategory();
    } else {
        alert("Fail");
    }
}

async function updateItem(id) {
    let data = await fetchData(`${API_CATEGORY}/${id}`);
    imgGet.src = data.img;
    category.value = data.name;
    btnUpdate.style.display = "block";
    btnUpdate.setAttribute("data-id", id);
    btnCaterogy.style.display = "none";
}
btnUpdate.addEventListener("click", async (e) => {
    e.preventDefault();
    btnCaterogy.style.display = "block";
    btnUpdate.style.display = "none";
    let id = btnUpdate.getAttribute("data-id");
    let newItem = {
        img: uploadImage || imgGet.src,
        name: category.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
    };
    let res = await fetch(`${API_CATEGORY}/${id}`, option);
    if (res.ok) {
        alert("Update Success");
        displayCategory();
    } else {
        alert("Update Fail");
    }
});
