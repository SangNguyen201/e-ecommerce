const API_USER = `${API_LINK}/user`;
const userName = document.querySelector("input[name='Fullname']");
const email = document.querySelector("input[name='Email']");
const phone = document.querySelector("input[name='Phone']");
const password = document.querySelector("input[name='Password']");
const btnRegister = document.querySelector(".s-register .c-button-1");
const fullnameError = document.getElementById("fullnameError");
const phoneError = document.getElementById("phoneError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
btnRegister.addEventListener("click", async (event) => {
    event.preventDefault();
    if (userName.value.trim() === "") {
        fullnameError.innerHTML = "Vui lòng nhập tên đầy đủ.";
        event.preventDefault();
    } else {
        fullnameError.innerHTML = "";
    }

    if (phone.value.trim() === "") {
        phoneError.innerHTML = "Vui lòng nhập số điện thoại.";
        event.preventDefault();
    } else {
        phoneError.innerHTML = "";
    }

    if (!emailRegex.test(email.value)) {
        emailError.innerHTML = "Email không hợp lệ.";
        event.preventDefault();
    } else {
        emailError.innerHTML = "";
    }

    if (password.value.length < 10) {
        passwordError.innerHTML = "Mật khẩu phải có ít nhất 10 ký tự.";
        event.preventDefault();
    } else {
        passwordError.innerHTML = "";
        const newUserObj = {
            email: email.value,
            phone: phone.value,
            userName: userName.value,
            password: password.value,
        };
        const option = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserObj),
        };
        let res = await fetch(API_USER, option);
        if (res.ok) {
            alert("Register Success");
            window.location.href = "index.html";
        } else {
            alert("Register Fail");
        }
        localStorage.setItem("REGISTER_USER", JSON.stringify(newUserObj));
    }
});
