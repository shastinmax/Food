import {getCloseModal,getOpenModal} from "./modal";
import{postData} from "../services/services";

function forms(formSelector,timeOpenModal){
    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: "img/form/spinner.svg",
        success: "Спасибо! Скоро мы с Вами свяжемся",
        failure: "Что-то пошло не так",
    };

    const {loading, success, failure} = message;

    forms.forEach((form) => {
        bindPostData(form);
    });

    function bindPostData(form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const statusMessage = document.createElement("img");
            statusMessage.src = loading;
            statusMessage.style.cssText = `
      display:block;
      margin:0 auto;
      `;

            form.insertAdjacentElement("afterend", statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData("http://localhost:3000/requests", json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(success);
                    statusMessage.remove();
                })
                .catch(() => {
                    showThanksModal(failure);
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        getOpenModal('.modal',timeOpenModal);

        const thanksModal = document.createElement("div");
        thanksModal.classList.add("modal__dialog");
        thanksModal.innerHTML = `
    <div class='modal__content'>
      <div class='modal__close' data-close>×</div>
      <div class='modal__title'>${message}</div>
    </div>
    `;

        document.querySelector(".modal").append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add("show");
            prevModalDialog.classList.remove("hide");
            getCloseModal('.modal');
        }, 4000);
    }
}

export default forms;