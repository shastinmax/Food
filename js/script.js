import tabs from './modules/tabs';
import cards from './modules/cards';
import timer from './modules/timer';
import modal, {getOpenModal} from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener("DOMContentLoaded", () => {
    const timeOpenModal = setTimeout(() => getOpenModal('.modal', timeOpenModal), 50000);

    tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
    timer('.timer', '2021-12-06');
    modal("[data-modal]", ".modal", timeOpenModal);
    cards();
    forms('form', timeOpenModal);
    slider({
        container: ".offer__slider",
        slide: ".offer__slide",
        nextArrow: ".offer__slider-next",
        prevArrow: ".offer__slider-prev",
        totalCounter: "#total",
        currentCounter: "#current",
        wrapper: ".offer__slider-wrapper",
        field: ".offer__slider-inner",
    });
    calc();
});
