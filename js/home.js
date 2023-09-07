async function displayBanner() {
    const API_BANNER = `${API_LINK}/adminBanner`;
    let data = await fetchData(API_BANNER);
    const banner = document.querySelector(".s-banner .s_inner");
    data.forEach((item, index) => {
        banner.innerHTML += `
        <div class="s_item ${index == 0 && "active"}" style="--bg:${item.color}">
            <div class="row m-0 align-items-center">
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="s_content">
                    <h3>${item.title}</h3>
                    <p>${item.desc} ?</p>
                    <a href="${item.link}">
                    <button class="c-button-1">SHOP NOW</button>
                    </a>
                </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6">
                    <div class="s_thumb">
                        <img src='${item.banner}' alt="imgBanner" />
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    slideBanner();
}
displayBanner();

async function displayCate() {
    const API_CATEGORY = `${API_LINK}/category`;
    let data = await fetchData(API_CATEGORY);
    const category = document.querySelector(".s-category #listCategory");
    const listCateTab = document.querySelector(".s_collection ul");
    data.forEach((item, index) => {
        category.innerHTML += `
        <div class="col-lg-3 col-md-6 col-sm-6">
        <a href="listProduct.html?Cate=${item.name}" class="s_item">
            <img src="${item.img}" alt='${item.name}'/>
            <div class="s_overflay">
                <h3>${item.name}</h3>
            </div>
        </a>
        </div>
        `;
        listCateTab.innerHTML += `
        <li class="${index == 0 && "active"}">${item.name}</li>                   
        `;
    });
    const listCateLi = document.querySelectorAll(".s_collection ul li");
    const listProduct = document.querySelector("#list-tab-product");
    let API_PRODUCT;
    let dataProduct;
    listCateLi.forEach((li) => {
        li.addEventListener("click", async () => {
            let name = li.innerHTML;
            API_PRODUCT = `${API_LINK}/listProduct?categories=${name}`;
            dataProduct = await fetchData(API_PRODUCT);
            renderProductList(dataProduct, listProduct);
        });
    });
    //load ra list sp của danh mục đầu tiên
    API_PRODUCT = `${API_LINK}/listProduct?categories=${listCateLi[0].innerHTML}`;
    dataProduct = await fetchData(API_PRODUCT);
    renderProductList(dataProduct, listProduct);

    listCateLi.forEach((item) => {
        item.addEventListener("click", () => {
            listCateLi.forEach((item2) => {
                item2.classList.remove("active");
            });
            item.classList.add("active");
        });
    });
}
displayCate();
// api product at homepage
function renderProductList(data, selector) {
    selector.innerHTML = "";
    data.forEach((item) => {
        selector.innerHTML += `
        <div class="col-lg-3 col-md-6 col-sm-6">
        <a href="detailProduct.html?id=${item.id}" class="c-product">
            <div class="c_thumb">
                <img src=${item.img} alt="imgProduct" />
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

function slideBanner() {
    const prev = document.querySelector(".s-banner .s_prev");
    const next = document.querySelector(".s-banner .s_next");
    const thumb = document.querySelector(".s_thumb");
    const itemBanner = document.querySelectorAll(".s-banner .s_item");
    let currentIndex = 0;
    function displaySlide() {
        itemBanner.forEach((item) => {
            item.classList.remove("active");
        });
        itemBanner[currentIndex].classList.add("active");
    }
    next.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex == itemBanner.length) {
            currentIndex = 0;
        }
        thumb.classList.add("active");
        displaySlide();
    });
    prev.addEventListener("click", () => {
        if (currentIndex == 0) {
            currentIndex = itemBanner.length - 1;
        } else {
            currentIndex--;
        }
        displaySlide();
    });
}
async function displayFeedback() {
    const API_REVIEW = `${API_LINK}/review`;
    let data = await fetchData(API_REVIEW);
    const feedback = document.querySelector(".s-feedback .s_wrapper");
    data.forEach((item, index) => {
        feedback.innerHTML += `
        <div class="s_content ${index == 0 && "active"}">
            <p class="s_review">
                ${item.desc}
            </p>
            <p class="s_career">
                <img src="${item.avatar}" alt="avatar"/>
            </p>
            <p class="s_user">${item.title}</p>
        </div>
        `;
    });
    slideFeedback();
}
displayFeedback();
function slideFeedback() {
    const dotSlide = document.querySelectorAll(".s-feedback li");
    const content = document.querySelectorAll(".s-feedback .s_content");
    dotSlide.forEach((item, index) => {
        item.addEventListener("click", () => {
            dotSlide.forEach((dot) => {
                dot.classList.remove("active");
            });
            item.classList.add("active");

            content.forEach((data) => {
                data.classList.remove("active");
            });
            content[index].classList.add("active");
        });
    });
}
slideFeedback();
