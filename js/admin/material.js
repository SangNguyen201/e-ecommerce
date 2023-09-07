const API_MATERIAL = `${API_LINK}/material`;
const imgInput = document.querySelector("input[name='img']");
const imgGet = document.querySelector(".showImg");
const material = document.querySelector("input[name='material']");
const btnAdd = document.querySelector("#btn-add");
const btnUpdate = document.querySelector("#btn-update");
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

btnAdd.addEventListener("click", async (event) => {
    event.preventDefault();
    let materialObj = {
        img: uploadImage,
        material: material.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(materialObj),
    };
    let res = await fetch(API_MATERIAL, option);
    if (res.ok) {
        alert("Add Success");
    } else {
        alert("Add Fail");
    }
});
async function displayMaterial() {
    const bodyTable = document.querySelector("table tbody");
    let data = await fetchData(API_MATERIAL);
    data.forEach((item) => {
        bodyTable.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>
                <img src=${item.img} alt="img"/> 
            </td>
            <td>${item.material}</td>
            <td><button onclick="updateMaterial(${item.id})" class="c-button-update">UPDATE</button></td>
            <td><button onclick="deleteMaterial(${item.id})" class="c-button-delete">DELETE</button></td>
        </tr>
        `;
    });
}
displayMaterial();

async function updateMaterial(id) {
    btnAdd.style.display = "none";
    btnUpdate.style.display = "block";
    let data = await fetchData(`${API_MATERIAL}/${id}`);
    imgGet.src = data.img;
    material.value = data.material;
    btnUpdate.setAttribute("data-id", id);
}
btnUpdate.addEventListener("click", async () => {
    btnUpdate.style.display = "none";
    let id = btnUpdate.getAttribute("data-id");
    let materialObj = {
        img: uploadImage || imgGet.src,
        material: material.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(materialObj),
    };
    let res = await fetch(`${API_MATERIAL}/${id}`, option);
    if (res.ok) {
        alert("Update Success");
    } else {
        alert("Update Fail");
    }
});

async function deleteMaterial(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_MATERIAL}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
    } else {
        alert("Delete Fail");
    }
}
