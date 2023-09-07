const button = document.querySelectorAll(".s_dashboard button");
const listContent = document.querySelectorAll(".s_content .s_item");
button.forEach((item) => {
    item.addEventListener("click", () => {
        listContent.forEach((data) => {
            if (item.getAttribute("data-btn") == data.getAttribute("data-content")) {
                listContent.forEach((e) => {
                    e.classList.remove("active");
                });
                data.classList.add("active");
            }
        });
        button.forEach((btn) => {
            btn.classList.remove("active");
        });
        item.classList.add("active");
    });
});

const contentDash = document.querySelector(".s_content .content");
contentDash.innerHTML = `
<p>Hello ! <span class="name">${loginUser.name}</span></p>
<p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate adipisci asperiores atque nesciunt. Consectetur inventore laudantium eius neque beatae quas ea dolores
    eveniet, illum quam esse reiciendis veritatis aspernatur praesentium.
</p>
`;

const API_LOGINUSER = `${API_LINK}/user`;
async function findUser() {
    const fullname = document.querySelector("input[name='fullname']");
    const email = document.querySelector("input[name='email']");
    const phone = document.querySelector("input[name='phone']");
    const pass = document.querySelector("input[name='pass']");
    const btn = document.querySelector("#btn-user");
    let dataUser = await fetchData(API_LOGINUSER);
    let find = dataUser.find((item) => item.email == loginUser.email);
    fullname.value = find.userName;
    email.value = find.email;
    pass.value = find.password;
    phone.value = find.phone;
    btn.addEventListener("click", async (event) => {
        event.preventDefault();
        let objUser = {
            userName: fullname.value,
            email: email.value,
            phone: phone.value,
            password: pass.value,
        };
        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objUser),
        };
        let res = await fetch(`${API_LOGINUSER}/${find.id}`, option);
        if (res.ok) {
            alert("Update Success");
        } else {
            alert("Update Fail");
        }
    });
}
findUser();
async function findUserOrder() {
    const API_USERORDER = `${API_LINK}/inforUserOrder`;
    let dataContracted = await fetchData(API_USERORDER);
    let findOrderUser = dataContracted.filter((item) => item.email == loginUser.email);
    const table = document.querySelector("#list-order");
    findOrderUser.forEach((item) => {
        console.log("item: ", item);
        table.innerHTML += `
        <p>${item.date}</p>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Quanlity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    
                    ${item.cart.map((data) => {
                        return `
                        <td>${data.detail.names}</td>
                        <td>
                            <span>$${data.detail.pirce}</span>
                        </td>
                        <td>${data.choice.quanlity}</td>
                        <td>${data.detail.pirce * data.choice.quanlity}</td>
                        `;
                    })}
                </tr>
            </tbody>
        </table>
        `;
    });
}
findUserOrder();

const btnLogout = document.querySelector("#btn-logout");
btnLogout.addEventListener("click", () => {
    localStorage.removeItem("LOGINUSER");
    window.location.href = "index.html";
});
