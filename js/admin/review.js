const API_REVIEW = `${API_LINK}/review`;
const inputImg = document.querySelector("input[name='img']");
const imgGet = document.querySelector(".showImg");
const inputTitle = document.querySelector("input[name='title']");
const inputDesc = document.querySelector("input[name='desc']");
const btnAdd = document.querySelector("#btn-add");
const btnUpdate = document.querySelector("#btn-update");

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
    let titleObj = {
        avatar: uploadImage,
        title: inputTitle.value,
        desc: inputDesc.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(titleObj),
    };
    let res = await fetch(API_REVIEW, option);
    if (res.ok) {
        alert("Add Success");
        displayReview();
    } else {
        alert("Add Fail");
    }
});

async function displayReview() {
    const table = document.querySelector("table tbody");
    let data = await fetchData(API_REVIEW);
    table.innerHTML = "";
    data.forEach((item) => {
        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>
                <img src="${item.avatar}"/>
            </td>
            <td>${item.desc}</td>
            <td><button onclick="updateReview(${item.id})" class="c-button-update">UPDATE</button></td>
            <td><button onclick="deleteReview(${item.id})" class="c-button-delete">DELETE</button></td>
        </tr>`;
    });
}
displayReview();

async function deleteReview(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_REVIEW}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
        displayReview();
    } else {
        alert("Delete Fail");
    }
}

async function updateReview(id) {
    let data = await fetchData(`${API_REVIEW}/${id}`);
    imgGet.src = data.avatar;
    inputTitle.value = data.title;
    inputDesc.value = data.desc;
    btnUpdate.style.display = "block";
    btnUpdate.setAttribute("data-id", id);
    btnAdd.style.display = "none";
}

btnUpdate.addEventListener("click", async (e) => {
    e.preventDefault();
    btnAdd.style.display = "block";
    btnUpdate.style.display = "none";
    let id = btnUpdate.getAttribute("data-id");
    let titleObj = {
        avatar: uploadImage,
        title: inputTitle.value,
        desc: inputDesc.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(titleObj),
    };
    let res = await fetch(`${API_REVIEW}/${id}`, option);
    if (res.ok) {
        alert("Update Success");
        displayReview();
    } else {
        alert("Fail");
    }
});
