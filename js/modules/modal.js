function getOpenModal(modalSelector, timeOpenModal) {
    const modal = document.querySelector(modalSelector)
    modal.style.display = "block";
    document.body.style.overflow = "hidden";

    console.log(timeOpenModal)
    if (timeOpenModal) {
        clearInterval(timeOpenModal);
    }

}

function getCloseModal(modalSelector) {
    const modal = document.querySelector(modalSelector)
    modal.style.display = "none";
    document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector,timeOpenModal) {
    const btnModal = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);


    btnModal.forEach((item) => {
        item.addEventListener("click", () => getOpenModal(modalSelector,timeOpenModal));
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") === "") {
            getCloseModal(modalSelector);
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            getCloseModal(modalSelector);
        }
    });

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            getOpenModal(modalSelector,timeOpenModal);
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
};
export default modal;
export {getCloseModal, getOpenModal}