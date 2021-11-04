window.addEventListener("DOMContentLoaded", () => {
  // Tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.add("hide");
      item.classList.remove("show", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].classList.add("show", "fade");
    tabsContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (item === target) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
  // Timer
  const deadline = "2022-10-25";

  function getTimeRemaining(endTime) {
    const t = Date.parse(endTime) - Date.parse(new Date()),
      days = Math.floor(t / (1000 * 60 * 60 * 24)),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24),
      minutes = Math.floor((t / (1000 * 60)) % 60),
      seconds = Math.floor((t / 1000) % 60);
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endTime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  // Modal
  const btnModal = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");

  function getOpenModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    clearInterval(timeOpenModal);
  }

  function getCloseModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

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
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.classes = classes;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 71;
      this.changeToRUB();
    }
    changeToRUB(dollar) {
      this.price = this.transfer * this.price;
    }
    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
            <img src=${this.src} alt=${this.alt} />
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">
              ${this.descr}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span>руб/день</div>
            </div>
      `;
      this.parent.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Меню 'Фитнес'",
    "Меню 'Фитнес' - это новый подход к приготовлению блюд: большесвежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
    9,
    ".menu .container",
    "menu__item",
    "big"
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню 'Премиум'",
    " В меню “Премиум” мы используем не только красивый дизайн упаковки,но и качественное исполнение блюд. Красная рыба, морепродукты,фрукты - ресторанное меню без похода в ресторан!",
    15,
    ".menu .container",
    "menu__item"
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню 'Постное'",
    "Меню “Постное” - это тщательный подбор ингредиентов:полное отсутствие продуктов животного происхождения, молоко из миндаля, или гречки, правильное количество белков за счет тофу.",
    9,
    ".menu .container",
    "menu__item"
  ).render();

  //forms
  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с Вами свяжемся",
    failure: "Что-то пошло не так",
  };

  const { loading, success, failure } = message;

  forms.forEach((form) => {
    postData(form);
  });

  function postData(form) {
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

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });

      fetch("server.php", {
        method: "Post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(object),
      })
        .then((data) => data.text())
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
    getOpenModal();

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
      getCloseModal();
    }, 4000);
  }
  // console.log("зфпрос данных...");
  // const req = new Promise(function (resolve, reject) {
  //   setTimeout(() => {
  //     console.log("Подготовка данных...");

  //     const product = {
  //       name: "Tv",
  //       price: 2000,
  //     };
  //     resolve(product);
  //   }, 2000);
  // });
  // req.then((product) => {
  //   return new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       product.status = "order";
  //       resolve(product);
  //     }, 2000);
  //   })
  //     .then((data) => {
  //       data.modify = true;
  //       return data;
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch(() => {
  //       console.error("kjkvjh");
  //     })
  //     .finally(() => {
  //       console.log("finally");
  //     });
  // });
  // const test = (time) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => resolve(), time);
  //   });
  // };
  // // test(2000).then(() => console.log("Ну ты олень"));
  // // test(3000).then(() => console.log("Ну ты Baran"));
  // Promise.all([test(2000), test(3000)]);

  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "POST",
  //   body: JSON.stringify({ name: "Alex" }),
  //   headers: {
  //     "Content-type": "application/json",
  //   },
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));
});