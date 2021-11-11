window.addEventListener("DOMContentLoaded", () => {
    const tabs = require('./modules/tabs'),
        cards = require('./modules/cards'),
        timer=require('./modules/timer'),
        modal=require('./modules/modal'),
        forms=require('./modules/forms'),
        slider=require('./modules/slider'),
        calc=require('./modules/calc');


    tabs();
    timer();
    modal();
    cards();
    forms();
    slider();
    calc();
});
