function getOpenModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(timeOpenModal);
}

function getCloseModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}
function modal(triggerSelector,modalSelector){
    const btnModal = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);



    btnModal.forEach((item) => {
        item.addEventListener("click", getOpenModal);
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.getAttribute("data-close") === "") {
            getCloseModal();
        }
    });
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape") {
            getCloseModal();
        }
    });

    const timeOpenModal = setTimeout(getOpenModal, 50000);

    function showModalByScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight
        ) {
            getOpenModal();
            window.removeEventListener("scroll", showModalByScroll);
        }
    }

    window.addEventListener("scroll", showModalByScroll);
};
export default modal;
export {getCloseModal,getOpenModal}