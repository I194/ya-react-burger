# Ya-React-Burger

Учебный проект, выполенный в ходе курса по реакту от Яндекс.Практикума (5 поток). 

В проекте использовались:
1. **React.js**
2. **Redux.js**
3. **TypeScript**

Также используется **React DnD**, **React Router DOM** и **Redux Thunk**.

В проекте реализован функционал онлайн-бургерной:
1. На главной странице (`/`) реализовано создание бургеров и оформление заказа;
2. На странице ленты заказов (`/feed`) отображаются 50 последних заказов, а также имеется табло со статусами заказов;
3. В личном кабинете (`/profile`) пользователь может изменить свою личную информацию и посмотреть историю всех своих заказов (`/profile/orders`).

:exclamation: Оформление заказов доступно только авторизованным пользователям.

:exclamation: Вёрстка не адаптивная, поскольку изначально так и задумывалось. 

Список всех страниц проекта
---
1. `/` — главная страница, конструктор бургеров;
2. `/feed` — страница всех заказов;
3. `/login` — страница авторизации;
4. `/register` — страница регистрации;
5. `/forgot-password` — страница восстановления пароля, этап 1;
6. `/reset-password` — страница восстановления пароля, этап 2;
7. `/profile` — страница профиля пользователя;
8. `/profile/orders` — страница с историей заказов пользователя;
9. `/ingredients/:id` — страница с детальной информацией об ингредиенте;
10. `/feed/:id` — страница с детальной информацией о заказе;
11. `/profile/orders/:id` — страница с детальной информацией о заказе пользователя. 

Здесь `:id` — id ингредиента или заказа соответственно. Страницы с детальной информацией доступны либо при прямом переходе по ссылке, либо после обновления страницы при просмотре детальной информации в модальном окне (появляется при нажатии на ингредиент или заказ соответственно). 

:exclamation: :exclamation: :exclamation: К сожалению, динамические роуты (`:id`) не поддерживаются GitHub Pages, на которых задеплоен проект, и потому при переходе по ним возникает Error 404. Ошибка возникнёт и даже от обычной перезагрузки страницы, если на странице идёт динамическое обновление данных. **Это касается только страниц с заказами**, потому что заказы приходят с сервера по веб-сокету. 

Проект создавался параллельно с изучением описанного выше стека технологий на протяжении двух месяцев с небольшими перерывами.

Деплой
---

Проект задеплоен на GitHub Pages по следующему адресу: https://i194.github.io/ya-react-burger/

Сборка
---

Собрать проект вы можете клонировав этот репозиторий. 

Для запуска пропишите в консоли `npm start`, предварительно установив все необходимые пакеты (`npm install`).
