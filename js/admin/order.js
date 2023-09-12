const API_ORDER = `${API_LINK}/inforUserOrder`;
async function displayOrder() {
    const table = document.querySelector(".table-user tbody");
    let dataInforUser = await fetchData(API_ORDER);
    let sum = 0;
    table.innerHTML = "";
    dataInforUser.forEach((item) => {
        item.cart.forEach((data) => {
            sum += data.choice.quanlity * data.detail.pirce;
        });
        table.innerHTML += `
        <tr>
            <td>${item.id}</td>
            <td>${item.userName}</td>
            <td>${item.phone}</td>
            <td>$ ${sum}</td>
            <td>${item.date}</td>
            <td><button onclick="viewCart(${item.id})" class="c-button-update">VIEW</button></td>
            <td><button onclick="deleteCart(${item.id})" class="c-button-delete">DELETE</button></td>
        </tr>
        `;
    });
}
displayOrder();

async function viewCart(id) {
    const tableDetail = document.querySelector(".tableDetail");
    const API_ORDERDETAIL = `${API_LINK}/inforUserOrder/${id}`;
    let dataDetailOrder = await fetchData(API_ORDERDETAIL);
    let total = 0;
    tableDetail.innerHTML = `
        <div class="s_infor col-lg-12">
        <h3 class="mb-4">Customer Information</h3>
        <div class="s_content">
            <p class="fullname">Full Name : ${dataDetailOrder.userName}</p>
            <p class="phone">Phone :${dataDetailOrder.phone}</p>
            <p class="email">Email :${dataDetailOrder.email}</p>
            <p class="address">Address :${dataDetailOrder.address}</p>
        </div>
    </div>
    <div class="s_listOrder col-lg-12">
        <h3>List Product</h3>
        <table class="mb-4">
            <thead>
                <tr>
                    <td>Images</td>
                    <td>Name Product</td>
                    <td>Price</td>
                    <td>Quantity</td>
                    <td>Total</td>
                </tr>
            </thead>
            <tbody>
            ${dataDetailOrder.cart.map((data) => {
                total += data.detail.pirce * data.choice.quanlity;
                return `<tr>
                <td>
                    <img src="${data.detail.img}" alt=""/>
                </td>
                <td>${data.detail.names}</td>
                <td>${data.detail.pirce}</td>
                <td>${data.choice.quanlity}</td>
                <td>${total}</td>
            </tr>`;
            })}
                
            </tbody>
        </table>
        <form>
            <label for="text">Customer Request !</label>
            <textarea class="w-100" name="text" id="text" cols="" rows="5"></textarea>
        </form>
    </div>
        `;
    tableDetail.style.display = "block";
}

async function deleteCart(id) {
    const tableDetail = document.querySelector(".tableDetail");
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_ORDER}/${id}`, option);
    tableDetail.innerHTML = "";
    if (res.ok) {
        alert("Delete Success");
        displayOrder();
    } else {
        alert("Delete Fail");
    }
}
