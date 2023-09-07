function slideAboutUs() {
    const listBanner = document.querySelectorAll(".s-bannerStory .s_thumb .s_item");
    const listDots = document.querySelectorAll(".s-bannerStory .s_dotSlide li");
    listDots.forEach((dots, index) => {
        dots.addEventListener("click", () => {
            listDots.forEach((dot) => {
                dot.classList.remove("active");
            });
            dots.classList.add("active");

            listBanner.forEach((imgs) => {
                imgs.classList.remove("active");
            });
            listBanner[index].classList.add("active");
        });
    });
}
slideAboutUs();
