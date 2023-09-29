// 1 task
// Создайте простую интерактивную форму, которая будет проверять введенные пользователем данные. Форма должна содержать следующие поля:
// 1. Поле ввода для имени пользователя.
// 2. Поле ввода для телефонного номера.
// 3. Поле ввода для пароля.
// 4. Поле ввода для повторного введения пароля.
// 5. Кнопка "Отправить".
// Ваша задача состоит в следующем:
// 1. При загрузке страницы должна быть видимой только форма.
// 2. При клике на кнопку "Отправить" должна быть запущена функция, которая проверяет следующие условия:
// Имя пользователя должно содержать только буквы и быть не пустым.
// Номер телефона должен состоять только из чисел и быть не пустым.
// Пароль должен быть не менее 8 символов длиной.
// Пароли должны совпадать
// 3. Если все условия выполняются, выведите в консоль сообщение "Данные формы прошли проверку!".
// 4. Если хотя бы одно из условий не выполняется, выведите соответствующую ошибку (например, "Введите правильное имя пользователя", "Введите корректный номер телефона" и т.д.) и предотвратите отправку формы.
// Добавьте здесь код для отправки формы на сервер, если все условия выполняются
// 2 task
// Описание задачи:
// Ваша задача
// создать простую веб-страницу, которая будет использовать localStorage для сохранения и извлечения данных пользователя.
// Требования:
// Создайте HTML-страницу с полями ввода и кнопками.
// Добавьте поле ввода для имени пользователя и кнопку "Сохранить".
// При нажатии на кнопку "Сохранить" имя пользователя должно быть сохранено в localStorage.
// Добавьте кнопку "Загрузить", которая будет извлекать сохраненное имя пользователя из localStorage и отображать его на странице.
// Добавьте кнопку "Очистить", которая будет удалять сохраненное имя пользователя из localStorage.
// Проверьте, что данные сохраняются и извлекаются корректно, а также очищаются при необходимости.
// Примерный порядок действий:
// Создайте файл HTML и добавьте необходимые элементы: поле ввода, кнопки и элемент для отображения сохраненного имени пользователя.
// Используйте JavaScript для обработки событий нажатия на кнопки.
// При нажатии на кнопку "Сохранить" получите значение из поля ввода и сохраните его в localStorage.
// При нажатии на кнопку "Загрузить" извлеките сохраненное значение из localStorage и отобразите его на странице.
// При нажатии на кнопку "Очистить" удалите сохраненное значение из localStorage.
// Протестируйте функциональность страницы, убедитесь, что данные сохраняются, извлекаются и очищаются корректно.
// Уточнение:
// Задача описывает основные шаги для работы с localStorage. Вы можете расширить функциональность, добавив возможность сохранять и извлекать другие данные, или улучшить пользовательский интерфейс.
const formData = document.querySelector("button");
const inpName = document.querySelector(".inp_name");
const inpPhoneNumber = document.querySelector(".inp_phone");
const inpPassword = document.querySelector(".inp_password");
const inpPasswordSecond = document.querySelector(".inp_password_second");

const setDataLS = (newData) => {
  const lsData = JSON.parse(localStorage.getItem("to-do"));
  if (!lsData) {
    localStorage.setItem("to-do", JSON.stringify([]));
  } else if (newData) {
    const dataArr = JSON.parse(localStorage.getItem("to-do"));
    dataArr.push(newData);
    localStorage.setItem("to-do", JSON.stringify(dataArr));
  }
};

setDataLS();

const setData = () => {
  if (
    !inpName.value.trim("") ||
    !inpPhoneNumber.value.trim("") ||
    !inpPassword.value.trim("") ||
    !inpPasswordSecond.value.trim("") ||
    inpPassword.value !== inpPasswordSecond.value
  ) {
    alert("Заполните все ячейки или проверьте все ли верно");
    return;
  } else {
    const newData = {
      name: inpName.value,
      phone: inpPhoneNumber.value,
      password: inpPassword.value,
      passwordSecond: inpPasswordSecond.value,
    };
    setDataLS(newData);
    getDataLS();
    inpName.value = "";
    inpPhoneNumber.value = "";
    inpPassword.value = "";
    inpPasswordSecond.value = "";
  }
};
formData.addEventListener("click", setData);

const resultElem = document.querySelector(".result");

function getDataLS() {
  const data = JSON.parse(localStorage.getItem("to-do"));
  resultElem.innerHTML = "";
  data.forEach(
    (item) =>
      (resultElem.innerHTML += `<div class="card" style="width: 18rem;">
    <div class="card-body">
        <h5 class="card-title">${item.name}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${item.phone}</h6>
        <p class="card-text">${item.password}</p>
        <a href="#" class="card-delete">DELETE</a>
        <a href="#" class="card-edit">EDIT</a>
    </div>
    </div>`)
  );
}

getDataLS();

//  удаления карточки
resultElem.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-delete")) {
    const cardElement = event.target.closest(".card");
    const cardName = cardElement.querySelector(".card-title").textContent;

    // Удаление карточки из localStorage
    removeDataLS(cardName);

    // Удаление карточки из DOM
    cardElement.remove();
  }
});

// Функция удаления карточки из localStorage
const removeDataLS = (cardName) => {
  const dataArr = JSON.parse(localStorage.getItem("to-do"));
  const updatedData = dataArr.filter((item) => item.name !== cardName);
  localStorage.setItem("to-do", JSON.stringify(updatedData));
};

// Обработчик изменения карточки
resultElem.addEventListener("click", (event) => {
  if (event.target.classList.contains("card-edit")) {
    const cardElement = event.target.closest(".card");
    const cardName = cardElement.querySelector(".card-title").textContent;

    // Получение данных о карточке из localStorage
    const dataArr = JSON.parse(localStorage.getItem("to-do"));
    const cardData = dataArr.find((item) => item.name === cardName);

    // Заполнение формы данными карточки для редактирования
    inpName.value = cardData.name;
    inpPhoneNumber.value = cardData.phone;
    inpPassword.value = cardData.password;
    inpPasswordSecond.value = cardData.passwordSecond;

    // Удаление старой карточки после редактирования
    removeDataLS(cardName);
  }
});
