document.querySelector(".s_resultCart").innerHTML = `Your selection ( ${arrCart.length} Item )`;
function displayCart() {
    const table = document.querySelector(".s_cartItem table tbody");
    let total = 0;
    let priceTotal = document.querySelector(".s_subtotalPrice .price");
    arrCart.forEach((item) => {
        table.innerHTML += `
        <tr class="cart-item" dataId="${item.detail.id}">
            <td class="imgs"><img src="${item.detail.img}" alt="imgItem" /></td>
            <td class="name">${item.detail.names}</td>
            <td><span>$</span>${item.detail.pirce}</td>
            <td class="quantity">
                <div class="s_number">
                    <input name="quanlity" type="text" value=${item.choice.quanlity} />
                    <div class="s_increase" onclick="changeCart(event,'plus')" type="plus" ><i class="fa-thin fa-chevron-up"></i></div>
                    <div class="s_reduce" onclick="changeCart(event,'minus')" type="minus" ><i class="fa-thin fa-chevron-down"></i></div>
                </div>
            </td>
            <td class="subtotal" data-price = '${item.detail.pirce}'><span>$ ${item.choice.quanlity * item.detail.pirce}</span></td>
            <td class="cancel" onclick="changeCart(event,'delete')" type="delete"><i class="fa-light fa-xmark"></i></td>
        </tr>
        `;
        total += item.choice.quanlity * item.detail.pirce;
        priceTotal.innerHTML = `$ ${total}.00`;
    });
}
displayCart();
function changeCart(event, type) {
    let total = 0;
    let priceTotal = document.querySelector(".s_subtotalPrice .price");
    const cartItem = event.target.closest(".cart-item"); //forcus vào mỗi item khi click
    let quanlity = cartItem.querySelector(".quantity .s_number input");
    let priceItem = cartItem.querySelector(".subtotal span");
    let updateSubtotal = cartItem.querySelector(".subtotal").getAttribute("data-price");
    let dataId = cartItem.getAttribute("dataId");
    let findId = arrCart.findIndex((item) => item.detail.id == dataId);
    if (type == "plus") {
        ++quanlity.value;
        priceItem.innerHTML = `$ ${updateSubtotal * quanlity.value}`;
        arrCart[findId].choice.quanlity = quanlity.value;
    } else if (type == "minus") {
        if (quanlity.value > 1) {
            --quanlity.value;
            priceItem.innerHTML = `$ ${updateSubtotal * quanlity.value}`;
        }
        arrCart[findId].choice.quanlity = quanlity.value;
    } else {
        cartItem.style.display = "none";
        arrCart.splice(findId, 1);
    }
    arrCart.forEach((item) => {
        total += item.choice.quanlity * item.detail.pirce;
    });
    countCart();
    priceTotal.innerHTML = `$ ${total}.00`;
    localStorage.setItem("LISTCART", JSON.stringify(arrCart));
}
