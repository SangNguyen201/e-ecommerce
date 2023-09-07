const API_USER = `${API_LINK}/user`;
const inputEmail = document.querySelector("input[name='email']");
const inputPassword = document.querySelector("input[name='password']");
const emailError = document.querySelector("#emailError");
const result = document.querySelector("#result");
const passwordError = document.querySelector("#passwordError");
const btnLogin = document.querySelector(".s-login .c-button-1");
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
btnLogin.addEventListener("click", async (event) => {
    event.preventDefault();
    let dataUser = await fetchData(API_USER);
    let isLogin = false;
    let findEmail = dataUser.find((data) => data.email == inputEmail.value);
    console.log("findEmail: ", findEmail);
    if (findEmail) {
        emailError.innerHTML = "";
        if (findEmail.password == inputPassword.value) {
            emailError.innerHTML = "";
            isLogin = true;
        } else {
            passwordError.innerHTML = "Invalid Password!";
        }
    } else {
        emailError.innerHTML = "Invalid Email";
    }
    if (isLogin) {
        window.location.href = "index.html";
        let loginUser = {
            email: findEmail.email,
            name: findEmail.userName,
        };
        localStorage.setItem("LOGINUSER", JSON.stringify(loginUser));
    } else {
        inputPassword.value = "";
    }
});
