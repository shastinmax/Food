import tabs from'./modules/tabs';
import cards from './modules/cards';
import timer from './modules/timer';
import modal, {getOpenModal} from './modules/modal';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';

window.addEventListener("DOMContentLoaded", () => {
    const timeOpenModal = setTimeout(()=>getOpenModal('.modal',timeOpenModal), 50000);

    tabs();
    timer();
    modal("[data-modal]",".modal",timeOpenModal);
    cards();
    forms();
    slider();
    calc();
});
