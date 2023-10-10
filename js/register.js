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
    if (userName.value.trim().toLowerCase() === "") {
        fullnameError.innerHTML = "Please enter name.";
        event.preventDefault();
    } else {
        fullnameError.innerHTML = "";
    }

    if (phone.value.trim() === "") {
        phoneError.innerHTML = "Please enter phone number.";
        event.preventDefault();
    } else {
        phoneError.innerHTML = "";
    }

    if (!emailRegex.test(email.value)) {
        emailError.innerHTML = "Email invalid.";
        event.preventDefault();
    } else {
        emailError.innerHTML = "";
    }

    if (password.value.length < 10) {
        passwordError.innerHTML = "Password must have at least 10 characters.";
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
