async function displayListCate() {
    const API_CATEGORY = `${API_LINK}/category`;
    let data = await fetchData(API_CATEGORY);
    const listProduct = document.querySelector(".s-bannerProduct .s_list");
    data.forEach((item) => {
        listProduct.innerHTML += `
        <div class="col-lg-3 col-md-6 col-sm-6 mb-4">
        <a href="listProduct.html?Cate=${item.name}" class="s_item">
            <img src="${item.img}" alt='${item.name}'/>
            <div class="s_overflay">
                <h3>${item.name}</h3>
            </div>
        </a>
        </div>
        `;
    });
}
displayListCate();
function renderList(data, selector) {
    selector.innerHTML = "";
    data.forEach((item) => {
        selector.innerHTML += `
        <div class="col-lg-3 col-md-6 col-sm-6 c-product">
            <a href="detailProduct.html?id=${item.id}">
                <div class="c_thumb">
                <img src="${item.img}" alt="imgProduct" />
                <div class="c_discount">${item.discount}<span>%</span></div>
                </div>
                <div class="c_infor">
                <p class="c_name">${item.names}</p>
                <p class="c_price"><span>$</span>${item.pirce}</p>
                </div>
            </a>    
        </div>
        `;
    });
}

const url = new URL(window.location.href);
const idCate = url.searchParams.get("Cate");
const keySearch = url.searchParams.get("keySearch");
async function displayListProduct() {
    let API_LISTPRODUCT;
    if (idCate) {
        API_LISTPRODUCT = `${API_LINK}/listProduct?categories=${idCate}`;
    } else if (keySearch) {
        API_LISTPRODUCT = `${API_LINK}/listProduct?names_like=${keySearch}`;
    } else {
        API_LISTPRODUCT = `${API_LINK}/listProduct`;
    }
    let data = await fetchData(API_LISTPRODUCT);
    const list = document.querySelector(".s_listProduct");
    renderList(data, list);
}
displayListProduct();
//-----------------side bar---------------
async function displayCategory() {
    const API_CATEGORY = `${API_LINK}/category`;
    let data = await fetchData(API_CATEGORY);
    const category = document.querySelector(".s-shopProduct .s_filter #filterCate");
    for (const item of data) {
        // chỉ có thể để li
        category.innerHTML += `
        <li>${item.name}</li>
        `;
    }
    const ulCategory = document.querySelectorAll(".s-shopProduct #filterCate li");
    ulCategory.forEach((li) => {
        li.addEventListener("click", async () => {
            const API_LISTPRODUCT = `${API_LINK}/listProduct`;
            let dataFilterCate = await fetchData(API_LISTPRODUCT);
            const name = li.innerHTML;
            const list = document.querySelector(".s_listProduct");
            let dataFiltered = dataFilterCate.filter((item) => {
                return item.categories.toLowerCase() == name.toLowerCase();
            });
            renderList(dataFiltered, list);
        });
    });
}
displayCategory();

async function filterPrice() {
    const ulPrice = document.querySelectorAll("#filterPrice li");
    ulPrice.forEach((li) => {
        li.addEventListener("click", async () => {
            const API_LISTPRODUCT = `${API_LINK}/listProduct`;
            let dataPrice = await fetchData(API_LISTPRODUCT);
            const numberMin = li.getAttribute("data-min");
            const numberMax = li.getAttribute("data-max");
            const numberCheck = li.getAttribute("data-check");
            const list = document.querySelector(".s_listProduct");
            let filtered = dataPrice.filter((item) => {
                if (numberCheck == "all") {
                    return item;
                } else if (numberCheck == "over") {
                    if (item.pirce > 1000) {
                        return item;
                    }
                } else if (item.pirce >= parseFloat(numberMin) && item.pirce <= parseFloat(numberMax)) {
                    return item;
                }
            });
            renderList(filtered, list);
        });
    });
}
filterPrice();
async function displayColor() {
    const API_COLOR = `${API_LINK}/color`;
    let data = await fetchData(API_COLOR);
    const color = document.querySelector(".s-shopProduct .s_filter #filterColor");
    for (const item of data) {
        color.innerHTML += `
        <li><img src="${item.img}" alt="imgColor"/>${item.name}</li>
        `;
    }
    const ulColor = document.querySelectorAll(".s-shopProduct .s_filter #filterColor li");
    ulColor.forEach((li) => {
        li.addEventListener("click", async () => {
            const API_LISTPRODUCT = `${API_LINK}/listProduct`;
            let dataFilterColor = await fetchData(API_LISTPRODUCT);
            const name = li.textContent;
            const list = document.querySelector(".s_listProduct");
            let dataFiltered = dataFilterColor.filter((item) => {
                return item.color.toLowerCase().trim() == name.toLowerCase().trim();
            });
            renderList(dataFiltered, list);
        });
    });
}
displayColor();

async function displayMaterial() {
    const API_MATERIAL = `${API_LINK}/material`;
    let data = await fetchData(API_MATERIAL);
    const material = document.querySelector(".s-shopProduct .s_filter #filterMaterial");
    for (const item of data) {
        material.innerHTML += `
        <li><img src="${item.img}" alt="imgmaterial"/>${item.material}</li>
        `;
    }
    const ulMaterial = document.querySelectorAll(".s-shopProduct .s_filter #filterMaterial li");
    ulMaterial.forEach((li) => {
        li.addEventListener("click", async () => {
            const API_LISTPRODUCT = `${API_LINK}/listProduct`;
            let dataMaterial = await fetchData(API_LISTPRODUCT);
            const name = li.textContent;
            const list = document.querySelector(".s_listProduct");
            let dataFiltered = dataMaterial.filter((item) => {
                return item.material.toLowerCase().trim() == name.toLowerCase().trim();
            });
            renderList(dataFiltered, list);
        });
    });
}
displayMaterial();
