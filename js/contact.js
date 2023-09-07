const API_CONTACTCLIENT = `${API_LINK}/contact`;
const fullname = document.querySelector("input[name='fullname']");
const email = document.querySelector("input[name='email']");
const note = document.querySelector(".s_text textarea");
const button = document.querySelector(".c-button-1");

button.addEventListener("click", async (e) => {
    e.preventDefault();
    const client = {
        name: fullname.value,
        email: email.value,
        note: note.value,
    };
    const option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
    };
    let res = await fetch(API_CONTACTCLIENT, option);
    if (res.ok) {
        alert("Add Success");
    } else {
        alert("Add Fail");
    }
});
