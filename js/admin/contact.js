const API_CONTACTADMIN = `${API_LINK}/contact`;

async function displayContact() {
    const table = document.querySelector("table tbody");
    let dataContact = await fetchData(API_CONTACTADMIN);
    console.log("dataContact: ", dataContact);
    dataContact.forEach((data) => {
        table.innerHTML += `
        <tr>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>${data.note}</td>
            <td><button onclick="viewContact(${data.id})" class="c-button-update">VIEW</button></td>
            <td><button onclick="deleteContact(${data.id})" class="c-button-delete">DELETE</button></td>
        </tr>
        `;
    });
}
displayContact();

async function viewContact(id) {
    let data = await fetchData(`${API_CONTACTADMIN}/${id}`);
    const fullname = document.querySelector("input[name='fullname']");
    const email = document.querySelector("input[name='email']");
    const note = document.querySelector("textarea");

    fullname.value = data.name;
    email.value = data.email;
    note.value = data.note;
}
async function deleteContact(id) {
    const option = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    let res = await fetch(`${API_CONTACTADMIN}/${id}`, option);
    if (res.ok) {
        alert("Delete Success");
    } else {
        alert("Delete Fail");
    }
}
