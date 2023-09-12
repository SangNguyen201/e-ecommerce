const API_LINK = `https://ecommerce-drile.onrender.com`;
const API_AUTHOR = `${API_LINK}/user`;
const email = document.querySelector("input[name='email']");
const password = document.querySelector("input[name='password']");
const btnAuthor = document.querySelector("#btn-author");
async function fetchData(url) {
    const data = await fetch(url);
    const extractData = data.json();
    return extractData;
}
btnAuthor.addEventListener("click", async (event) => {
    event.preventDefault();
    let data = await fetchData(API_AUTHOR);
    let find = data.find((data) => data.email == email.value);
    if (find) {
        if (find.authorized == "admin") {
            document.querySelector(".errEmail").innerHTML = "";
            if (find.password == password.value) {
                window.location.href = "infoAdmin.html";
                localStorage.setItem("ADMIN", JSON.stringify(find.userName));
            } else {
                document.querySelector(".errPass").innerHTML = "Invalid Password !";
            }
        } else {
            document.querySelector(".errEmail").innerHTML = "You are not admin !";
        }
    } else {
        document.querySelector(".errEmail").innerHTML = "Email is correct !";
    }
});
