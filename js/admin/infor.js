const API_INFO = `${API_LINK}/infor`;
const inputLogo = document.querySelector("input[name='logo']");
const inputAddress = document.querySelector("input[name='address']");
const inputPhone = document.querySelector("input[name='phone']");
const inputEmail = document.querySelector("input[name='email']");
const inputFb = document.querySelector("input[name='fb']");
const inputIns = document.querySelector("input[name='instagram']");
const imgGet = document.querySelector(".showImg");
const btnInfor = document.querySelector("#btn-infor");

//Convert ảnh sang base 64
let uploadImage = "";
inputLogo.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
        uploadImage = reader.result;
        imgGet.src = uploadImage;
    });
    reader.readAsDataURL(this.files[0]);
});

btnInfor.addEventListener("click", async (event) => {
    event.preventDefault();
    let objInfor = {
        logo: uploadImage || imgGet.src,
        address: inputAddress.value,
        phone: inputPhone.value,
        email: inputEmail.value,
        facebook: inputFb.value,
        instagram: inputIns.value,
    };
    const option = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objInfor),
    };
    let res = await fetch(`${API_INFO}/1`, option);
    if (res.ok) {
        alert("Save success");
    } else {
        alert("Fail");
    }
});

async function renderInfor() {
    let data = await fetchData(API_INFO);
    imgGet.src = data[0].logo;
    inputAddress.value = data[0].address;
    inputPhone.value = data[0].phone;
    inputEmail.value = data[0].email;
    inputFb.value = data[0].facebook;
    inputIns.value = data[0].instagram;
}
renderInfor();
