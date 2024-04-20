# Проектная работа "Веб-ларек" - Интернет-магазин

Этот проект представляет собой веб-приложение для интернет-магазина, разработанное с использованием стека технологий HTML, SCSS, TypeScript и Webpack.

## Структура проекта

- src/ — исходные файлы проекта
  - components/ — JS компоненты
    - base/ — базовые компоненты
  - models/ — папка с JS моделями
    - base/ - базовые модели
  - pages/ - HTML файлы страниц
  - scss/ - файлы стилей
  - types/ - файлы с типами
  - utils/ - вспомогательные файлы

## Технологии

- HTML - для структуры и содержания страниц.
- SCSS - для стилизации интерфейса.
- TypeScript - для написания кода с использованием статической типизации.
- Webpack - для сборки проекта.

## Установка и запуск

Создайте файл .env в корне проекта и добавьте ключ API_ORIGIN с адресом сервера API:

```
API_ORIGIN=https://example.com
```

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура приложения

Приложение построено на упрощенной версии шаблона проектирования MVP (Model-View-Presenter).

- Model (Модели): Отвечают за управление данными и бизнес-логику.
- View (Отображения): Отвечают за отображение данных и взаимодействие с пользователем.
- Presenter (Ведущий): Координирует работу View и Model, обрабатывает события и обновляет состояние приложения.

В данном случае, используется общий "Presenter", который координирует работу всех View и Model через событийно-ориентированный подход. Компоненты взаимодействуют друг с другом, отправляя и получая события.

### Модели данных (Model)

- `AppState`:
  - Центральная модель данных приложения, представляющая собой глобальное хранилище информации.
  - Отвечает за хранение и управление данными о товарах, корзине и заказе.
  - Предоставляет методы для изменения данных и оповещения об изменениях через события.

### Интерфейс `IAppState`

```ts
interface IAppState {
	preview: IProduct; // Текущий просматриваемый товар
	basket: Set<IProduct>; // Набор товаров в корзине
	products: IProduct[]; // Список товаров
	order: IOrder; // Данные заказа
}
```

### Методы `AppState`

```ts
// Установка этапа оформления заказа
setStep(value: TOrderStep) {}

// Установка поля заказа
setOrderField(field: keyof IOrder, value: unknown) {}

// Проверка валидности текущего заказа
getOrderIsValid() {}

// Получение ошибок текущего заказа
getOrderErrors() {}

// Получение полей заказа в виде для взаимодействия с API
getOrderInvoice() {}

// Инициализация нового заказа
initOrder() {}

// Сброс всех полей заказа
resetOrder() {}

// Установка товаров каталога
setProductsItems(value: IProduct[]) {}

// Проверка на наличие товара в корзине
getBasketIsContains(id: string) {}

// Добавление товара в корзину
addBasketItem(value: IProduct) {}

// Удаление товара из корзины
removeBasketItem(id: string) {}

// Сброс текущего состояния корзины
resetBasket() {}

// Инициализация корзины
initBasket() {}

// Получение цены позиций в корзине
getBasketPrice() {}

// Установка текущего просматриваемого элемента
setPreview(value: IProduct) {}
```

### События `AppState`

| Событие         |        Вызывающий метод         |           Передаваемые данные |
| --------------- | :-----------------------------: | ----------------------------: |
| PRODUCTS_UPDATE |        setProductsItems         |         { items: IProduct[] } |
| PREVIEW_UPDATE  |           setPreview            |            { item: IProduct } |
| BASKET_INIT     |           initBasket            |         { items: IProduct[] } |
| BASKET_UPDATE   | addBasketItem, removeBasketItem |         { items: IProduct[] } |
| BASKET_RESET    |           resetBasket           |         { items: IProduct[] } |
| ORDER_STEP      |             setStep             |          { step: TOrderStep } |
| ORDER_UPDATE    |          setOrderField          | { field: string, value: any } |
| ORDER_RESET     |           resetOrder            |                             - |

## Отображения (View)

- Глобальные компоненты:
  - `Page`:
    - Отображение страницы, управление скроллингом.
    - Позволяет блокировать прокрутку страницы при необходимости (например, при открытом модальном окне).
  - `Header`:
    - Отображение хедера с счетчиком корзины.
    - Отображает количество товаров в корзине.
    - Предоставляет возможность открыть корзину по клику на иконку.
  - `Modal`:
    - Отображение модального окна.
    - Позволяет открывать и закрывать модальное окно с различным содержимым.
  - `Form`:
    - Базовый компонент для форм с валидацией.
    - Обрабатывает ввод данных, отображает ошибки валидации и предоставляет события для отправки формы.
- Компоненты корзины:
  - `Basket`:
    - Отображение корзины с товарами и общей суммой.
    - Отображает список товаров в корзине с возможностью удаления товаров.
    - Показывает общую стоимость товаров в корзине.
    - Предоставляет кнопку для оформления заказа.
  - `BasketItem`:
    - Отображение отдельного товара в корзине.
    - Показывает название, цену и кнопку удаления товара.
- Компоненты заказа:
  - `OrderShipment`:
    - Форма с полями для способа оплаты и адреса доставки.
    - Позволяет выбрать способ оплаты (наличные или карта) и ввести адрес доставки.
    - Проводит валидацию введенных данных.
  - `OrderContacts`:
    - Форма с полями для email и телефона.
    - Позволяет ввести email и номер телефона.
    - Проводит валидацию введенных данных.
  - `OrderSuccess`:
    - Отображение успешного оформления заказа.
    - Показывает информацию о заказе и потраченных средствах.
    - Предоставляет кнопку для возврата к списку товаров.
- Компоненты товаров:
  - `Products`:
    - Список товаров.
    - Отображает список доступных товаров в виде сетки или списка.
  - `Product`:
    - Отображение отдельного товара.
    - Показывает изображение товара, название, категорию и цену.
    - Позволяет открыть детальное отображение товара по клику.
  - `ProductPreview`:
    - Детальное отображение товара.
    - Показывает полную информацию о товаре, включая описание.
    - Предоставляет кнопку для добавления товара в корзину.

## Специальные компоненты

- `ShopAPI`:
  - Компонент для взаимодействия с API магазина.
  - Предоставляет методы для получения списка товаров и оформления заказа.
  - Использует базовый класс `API` для выполнения HTTP-запросов.
