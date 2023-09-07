const API_ORDERUSER = `${API_LINK}/inforUserOrder`;
const fullName = document.querySelector("input[name='Fullname']");
const email = document.querySelector("input[name='Email']");
const phone = document.querySelector("input[name='Phone']");
const address = document.querySelector("input[name='Address']");
const note = document.querySelector("textarea");
const btnCheckOut = document.querySelector(".btn-checkout");
const API_LOGINUSER = `${API_LINK}/user`;
async function findUser() {
    let dataUser = await fetchData(API_ORDERUSER);
    let find = dataUser.find((item) => item.email == loginUser.email);
    fullName.value = find.userName;
    email.value = find.email;
    phone.value = find.phone;
    address.value = find.address;
}
findUser();
btnCheckOut.addEventListener("click", async (event) => {
    event.preventDefault();
    let now = new Date();
    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minute = now.getMinutes();
    let fullTime = date + "/" + month + "/" + year + "-" + hours + ":" + minute;
    const orderUserObj = {
        email: email.value,
        userName: fullName.value,
        phone: phone.value,
        address: address.value,
        note: note.value,
        cart: arrCart,
        date: fullTime,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderUserObj),
    };
    let res = await fetch(API_ORDERUSER, option);
    if (res.ok) {
        alert("Save Success");
        localStorage.removeItem("LISTCART");
        window.location.href = "index.html";
    } else {
        alert("Save Fail");
    }
});
function displayResume() {
    let resume = document.querySelector(".s_yourOrder .s_content");
    let total = document.querySelector(".s_yourOrder .total .price");
    let sum = 0;
    arrCart.forEach((item) => {
        resume.innerHTML += `
        <div class="s_shipping">
            <span>${item.detail.names} x ${item.choice.quanlity}</span>
            <span><span>$</span>${item.choice.quanlity * item.detail.pirce}</span> 
        </div>
        `;
        sum += item.choice.quanlity * item.detail.pirce;
    });
    total.innerHTML = `$ ${sum}`;
}
displayResume();
