const API_BANNER = `${API_LINK}/adminBanner`;
const banner = document.querySelector("input[name='img']");
const title = document.querySelector("input[name='title']");
const desc = document.querySelector("input[name='desc']");
const link = document.querySelector("input[name='link']");
const color = document.querySelector("input[name='color']");
const imgGet = document.querySelector(".showImg");
const updataBanner = document.querySelector("#update-banner");
const btnBanner = document.querySelector("#btn-banner");

//Convert ảnh sang base 64
let uploadImage = "";
banner.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});

btnBanner.addEventListener("click", async (e) => {
    e.preventDefault();
    let objBanner = {
        banner: uploadImage,
        title: title.value,
        desc: desc.value,
        link: link.value,
        color: color.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBanner),
    };
    let res = await fetch(API_BANNER, option);
    if (res.ok) {
        alert("Add Success");
        showDisplay();
    } else {
        alert("Add Fail");
    }
});

async function showDisplay() {
    const table = document.querySelector("table tbody");
    let data = await fetchData(API_BANNER);
    table.innerHTML = "";
    data.forEach((item) => {
        table.innerHTML += `
        <tr>
            <td>
                <img src="${item.banner}"/>
            </td>
            <td>${item.title}</td>
            <td>${item.desc}</td>
            <td><button onclick="updateBanner(${item.id})" class="c-button-update">UPDATE</button></td>
            <td><button onclick="deleteBanner(${item.id})" class="c-button-delete">DELETE</button></td>
        </tr>
        `;
    });
}
showDisplay();

async function deleteBanner(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_BANNER}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
        showDisplay();
    } else {
        alert("Delete Fail");
    }
}

async function updateBanner(id) {
    let data = await fetchData(`${API_BANNER}/${id}`);
    imgGet.src = data.banner;
    title.value = data.title;
    desc.value = data.desc;
    link.value = data.link;
    color.value = data.color;
    updataBanner.style.display = "block";
    updataBanner.setAttribute("data-id", id);
    btnBanner.style.display = "none";
}
updataBanner.addEventListener("click", async (e) => {
    e.preventDefault();
    btnBanner.style.display = "block";
    updataBanner.style.display = "none";
    let id = updataBanner.getAttribute("data-id");
    let objBanner = {
        banner: uploadImage || imgGet.src,
        title: title.value,
        desc: desc.value,
        link: link.value,
        color: color.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objBanner),
    };
    let res = await fetch(`${API_BANNER}/${id}`, option);
    if (res.ok) {
        alert("Update Success");
        showDisplay();
    } else {
        alert("Fail");
    }
});
