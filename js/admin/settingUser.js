const API_USER = `${API_LINK}/user`;
const inputEmail = document.querySelector("input[name='email']");
const inputPassword = document.querySelector("input[name='password']");
const inputName = document.querySelector("input[name='fullname']");
const inputPhone = document.querySelector("input[name='phone']");
const inputAvatar = document.querySelector("input[name='avatar']");
const inputAuthor = document.querySelector("#listAuthor");
const inputStatus = document.querySelector("#listStatus");
const btnAdd = document.querySelector("#btn-add");
const btnUpdate = document.querySelector("#btn-update");
const imgGet = document.querySelector(".showImg");

let uploadImage = "";
inputAvatar.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});

btnAdd.addEventListener("click", async (event) => {
    event.preventDefault();
    const userObj = {
        email: inputEmail.value,
        password: inputPassword.value,
        userName: inputName.value,
        phone: inputPhone.value,
        inputAvatar: uploadImage,
        authorized: inputAuthor.value,
        userStatus: inputStatus.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
    };
    let res = await fetch(API_USER, option);
    if (res.ok) {
        alert("Save Success");
    } else {
        alert("Save Fail");
    }
});

async function displayUser() {
    const table = document.querySelector("table tbody");
    let data = await fetchData(API_USER);
    data.forEach((item) => {
        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.userName}</td>
            <td>${item.email}</td>
            <td>${item.authorized}</td>
            <td><button onclick="updateUser(${item.id})" class="c-button-update">VIEW</button></td>
            <td><button onclick="deleteUser(${item.id})" class="c-button-delete">DELETE</button></td>
        </tr>`;
    });
}
displayUser();

async function updateUser(id) {
    btnAdd.style.display = "none";
    btnUpdate.style.display = "block";
    let data = await fetchData(`${API_USER}/${id}`);
    inputEmail.value = data.email;
    inputPassword.value = data.password;
    inputName.value = data.userName;
    inputPhone.value = data.phone;
    inputAvatar.src = data.inputAvatar;
    inputAuthor.value = data.authorized;
    inputStatus.value = data.userStatus;
    btnUpdate.setAttribute("data-id", id);
}

async function updateList(id) {
    btnAdd.style.display = "none";
    btnUpdate.style.display = "block";
    let data = await fetchData(`${API_LISTPRODUCT}/${id}`);
    inputCategories.value = data.categories;
    imgGet.src = data.img;
    imgGet1.src = data.imgMore;
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
    const userObj = {
        email: inputEmail.value,
        password: inputPassword.value,
        userName: inputName.value,
        phone: inputPhone.value,
        inputAvatar: uploadImage,
        authorized: inputAuthor.value,
        userStatus: inputStatus.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userObj),
    };
    let res = await fetch(`${API_USER}/${id}`, option);
    if (res.ok) {
        alert("Update Success");
    } else {
        alert("Update Fail");
    }
});

async function deleteUser(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_USER}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
    } else {
        alert("Delete Fail");
    }
}
