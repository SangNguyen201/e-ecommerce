const API_COLOR = `${API_LINK}/color`;
const nameColor = document.querySelector("input[name='name']");
const codeColor = document.querySelector("input[name='code']");
const btnAdd = document.querySelector("#btn-add");
const btnUpdate = document.querySelector("#btn-update");
const imgInput = document.querySelector("input[name='img']");
const imgGet = document.querySelector(".showImg");

let uploadImage = "";
imgInput.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});

btnAdd.addEventListener("click", async (event) => {
    event.preventDefault();
    let colorObj = {
        name: nameColor.value,
        code: codeColor.value,
        img: uploadImage,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(colorObj),
    };
    let res = await fetch(API_COLOR, option);
    if (res.ok) {
        alert("Add Success");
        displayColor();
    } else {
        alert("Add Fail");
    }
});

async function displayColor() {
    const tableBody = document.querySelector("table tbody");
    let data = await fetchData(API_COLOR);
    tableBody.innerHTML = "";
    data.forEach((item) => {
        tableBody.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.code}</td>
            <td><button onclick="updateColor(${item.id})" class="c-button-update">UPDATE</button></td>
            <td><button onclick="deleteColor(${item.id})" class="c-button-delete">DELETE</button></td>
        </tr>
        `;
    });
}
displayColor();

async function updateColor(id) {
    let data = await fetchData(`${API_COLOR}/${id}`);
    nameColor.value = data.name;
    codeColor.value = data.code;
    imgGet.src = data.img;
    btnAdd.style.display = "none";
    btnUpdate.style.display = "block";
    btnUpdate.setAttribute("data-id", id);
}

btnUpdate.addEventListener("click", async (event) => {
    event.preventDefault();
    btnUpdate.style.display = "none";
    let id = btnUpdate.getAttribute("data-id");
    let colorObj = {
        name: nameColor.value,
        code: codeColor.value,
        img: uploadImage,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(colorObj),
    };
    let res = await fetch(`${API_COLOR}/${id}`, option);
    if (res.ok) {
        alert("Update Success");
        displayColor();
    } else {
        alert("Update Fail");
    }
});

async function deleteColor(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_COLOR}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
        displayColor();
    } else {
        alert("Delete Fail");
    }
}
