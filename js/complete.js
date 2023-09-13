const API_ORDERUSER = `${API_LINK}/inforUserOrder`;
const date = document.querySelector(".s_inforOrder .s_inner .dateTime span");
const table = document.querySelector("table tbody");
let price = document.querySelector(".s_charge .price");
let shipping = document.querySelector(".s_charge .shipping");
let total = document.querySelector(".s_charge .total");
const fullName = document.querySelector(".s_inforDelivery .fullname");
const email = document.querySelector(".s_inforDelivery .email");
const phone = document.querySelector(".s_inforDelivery .phone");
const address = document.querySelector(".s_inforDelivery .address");

async function displayOrder() {
    let data = await fetchData(API_ORDERUSER);
    let sum = 0;
    data.forEach((item) => {
        item.cart.forEach((product) => {
            sum += product.detail.pirce * product.choice.quanlity;
            table.innerHTML += `
        <tr>
            <td>${product.detail.names}</td>
            <td>${product.choice.quanlity}</td>
            <td>${product.detail.pirce}</td>
            <td>${product.detail.pirce * product.choice.quanlity}</td>
        </tr>
        `;
        });
        fullName.innerHTML = item.userName;
        email.innerHTML = item.email;
        phone.innerHTML = item.phone;
        address.innerHTML = item.address;
    });
    price.innerHTML = `${sum} $`;
    total.innerHTML = `${sum} $`;
}
displayOrder();
