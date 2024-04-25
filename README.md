# Проектная работа "Веб-ларек" - Интернет-магазин

Этот проект представляет собой веб-приложение для интернет-магазина, разработанное с использованием стека технологий HTML, SCSS, TypeScript и Webpack.
Используем архитектурный патерн MVVM (Model-View-ViewModel).

## Структура проекта

- src/ - Исходники проекта
  - components/ - Компоненты интерфейса
  - base/ - Базовые классы и утилиты

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

## Описание типов данных

## Интерфейс MainPageActions

Описывает возможные действия на главной странице

```ts
interface MainPageActions {
	productGrid: HTMLElement[];
	scrollLocked: boolean;
}
```

## Интерфейс ProductDetails

Подробная информация о продукте

```ts
interface ProductDetails {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}
```

## Интерфейс ItemCardActions

Действия, доступные для карточки товара

```ts
interface ItemCardActions {
	onClick: (event: MouseEvent) => void;
}
```

## Интерфейс ItemCardData

Данные для отображения карточки товара

```ts
interface ItemCardData {
	buttonText: string;
	quantity: number | null;
}
```

## Интерфейс ModalContent

Содержимое модального окна

```ts
interface ModalContent {
	content: HTMLElement;
}
```

## Интерфейс ShoppingCartView

Данные для отображения корзины.

```ts
interface ShoppingCartView {
	items: HTMLElement[];
	total: number | string;
	selectedIds: string[];
}
```

## Интерфейс FieldState

Состояние поля формы

```ts
interface FieldState {
	valid: boolean;
	errors: string[];
}
```

## Интерфейс DeliveryInfo

Адрес доставки

```ts
interface DeliveryInfo {
	paymentType: string;
	address: string;
}
```

## Интерфейс CustomerContacts

Контактные данные покупателя

```ts
interface CustomerContacts {
	email: string;
	phone: string;
}
```

## Интерфейс OrderData extends DeliveryInfo, CustomerContacts

Объединяет информацию о доставке и контактах

```ts
interface OrderData extends DeliveryInfo, CustomerContacts {
	total: number | string;
	items: string[];
}
```

## Интерфейс CustomerData extends CustomerContacts

Информация о покупателе и его заказах

```ts
interface CustomerData extends CustomerContacts {
	items: string[];
}
```

## Интерфейс OrderSuccess

Информация об успешном заказе

```ts
interface OrderSuccess {
	id: string;
	total: number;
}
```

# Базовые классы

## Класс DataModel

Абстрактный класс для управления данными и взаимодействия с системой событий

- isModel - Проверяет, является ли объект экземпляром модели

Методы:

- emitChanges(event: string, payload?: object) - Уведомляет подписчиков об изменении данных

## Класс UserInterfaceComponent

Абстрактный класс, предоставляющий инструменты для работы с DOM

| Метод                                                                 |                                    Описание |
| --------------------------------------------------------------------- | ------------------------------------------: |
| toggleClass(element: HTMLElement, className: string, force?: boolean) |                  Переключает класс элемента |
| setText(element: HTMLElement, value: unknown)                         | Устанавливает текстовое содержимое элемента |
| setDisabled(element: HTMLElement, state: boolean)                     |              Блокирует/разблокирует элемент |
| setHidden(element: HTMLElement)                                       |                            Скрывает элемент |
| setVisible(element: HTMLElement)                                      |                          Показывает элемент |
| setImage(element: HTMLImageElement, src: string, alt?: string)        |     Устанавливает изображение с alt-текстом |
| render(data?: Partial): HTMLElement                                   |  Возвращает корневой DOM-элемент компонента |

## Класс EventBus

Централизованная система событий

| Метод                                                  |                                               Описание |
| ------------------------------------------------------ | -----------------------------------------------------: |
| on(eventName: EventName, callback: (event: T) => void) |                               Подписывается на событие |
| off(eventName: EventName, callback: Subscriber)        |                                Отписывается от события |
| emit(eventName: string, data?: T)                      |                            Публикует событие с данными |
| onAll(callback: (event: EmitterEvent) => void)         |                           Подписывается на все события |
| offAll()                                               |                           Отписывается от всех событий |
| trigger(eventName: string, context?: Partial)          | Создает коллбэк, который генерирует событие при вызове |

## Класс APIClient

Базовый класс для взаимодействия с API

| Метод                                                            |                   Описание |
| ---------------------------------------------------------------- | -------------------------: |
| handleResponse(response: Response): Promise                      | Обрабатывает ответ сервера |
| get(uri: string)                                                 |       Выполняет GET-запрос |
| post(uri: string, data: object, method: ApiPostMethods = 'POST') |      Выполняет POST-запрос |

# Компоненты представления (View)

## Класс ItemCard

Отображает карточку товара

| Свойства            |             Описание |
| ------------------- | -------------------: |
| id: string          | Идентификатор товара |
| name: string        |      Название товара |
| imageUrl: string    |      URL изображения |
| category: string    |            Категория |
| price: number/null  |                 Цена |
| buttonText: string  |         Текст кнопки |
| description: string |             Описание |
| index: string       |        Индекс товара |

## Класс FormDataProcessor

Управляет формами

| Метод                                        |                              Описание |
| -------------------------------------------- | ------------------------------------: |
| onInputChange(field: keyof T, value: string) |  Обрабатывает изменение значения поля |
| render(state: Partial & IFormState)          | Отрисовывает форму с новым состоянием |

| Свойство       |         Описание |
| -------------- | ---------------: |
| valid: boolean | Валидность формы |
| errors: string |    Список ошибок |

## Класс DeliveryForm

Форма для выбора способа оплаты и ввода адреса доставки

| Метод                                  |               Описание |
| -------------------------------------- | ---------------------: |
| selectPaymentMethod(name: HTMLElement) | Выбирает способ оплаты |

| Свойство        |       Описание |
| --------------- | -------------: |
| address: string | Адрес доставки |

## Класс ContactForm

Форма для ввода контактных данных

| Свойство      |                Описание |
| ------------- | ----------------------: |
| phone: string |          Номер телефона |
| email: string | Адрес электронной почты |

## Класс MainPageContext

Управляет элементами главной страницы

| Свойство                   |                      Описание |
| -------------------------- | ----------------------------: |
| counter: number/null       |  Количество товаров в корзине |
| productGrid: HTMLElement[] |       Список карточек товаров |
| scrollLocked: boolean      | Блокировка прокрутки страницы |

## Класс ShoppingCart

Управляет отображением корзины

| Свойство              |                                 Описание |
| --------------------- | ---------------------------------------: |
| items: HTMLElement[]  |                 Список товаров в корзине |
| selectedIds: string[] | Список идентификаторов выбранных товаров |
| total: number/string  |                  Общая стоимость товаров |

## Класс ModalWindow

Управляет модальным окном

| Свойство             |        Описание |
| -------------------- | --------------: |
| content: HTMLElement | Содержимое окна |

| Метод                                 |                Описание |
| ------------------------------------- | ----------------------: |
| open()                                |          Открывает окно |
| close()                               |          Закрывает окно |
| render(data: IModalData): HTMLElement | Отрисовывает содержимое |

## Класс OrderConfirmation

Отображает информацию об успешном заказе

| Свойство             |                Описание |
| -------------------- | ----------------------: |
| id: string           |    Идентификатор заказа |
| total: number/string | Общая стоимость товаров |

# Компоненты данных (Model)

## Класс Product

Представляет один товар

```ts
class Product extends DataModel<ProductDetails> {
	id: string;
	description: string;
	imageUrl: string;
	name: string;
	category: string;
	price: number | null;
	status: ProductStatus = 'sell';
	quantity: number = 0;
}
```

## Класс ApplicationState

Управляет данными и событиями приложения

| Методы                                                         |                                   Описание |
| -------------------------------------------------------------- | -----------------------------------------: |
| clearBasket()                                                  |                            Очищает корзину |
| getTotal()                                                     |          Возвращает общую стоимость заказа |
| setCatalog(items: ProductDetails[])                            |               Устанавливает список товаров |
| setOrderField(field: keyof DeliveryInfo, value: string)        |       Обновляет поле информации о доставке |
| validateOrder()                                                |     Проверяет валидность данных о доставке |
| setContactsField(field: keyof CustomerContacts, value: string) |       Обновляет поле контактной информации |
| validateContacts()                                             | Проверяет валидность контактной информации |
| toggleBasketList(item: Product)                                |         Добавляет/удаляет товар из корзины |
| getBasketList(): Product[]                                     |        Возвращает список товаров в корзине |

## Класс ShopAPI

Взаимодействует с сервером

| Методы                                      |                          Описание |
| ------------------------------------------- | --------------------------------: |
| getProductList(): Promise<ProductDetails[]> | Получает список товаров с сервера |
| orderResult(order: OrderData): Promise      |          Отправляет данные заказа |

# Presenter

Список основных событий:

| Событие                   |                                      Описание |
| ------------------------- | --------------------------------------------: |
| catalog:install           |                  Отображение каталога товаров |
| card:select               |                                  Выбор товара |
| item:toggle               |         Добавление/удаление товара из корзины |
| modal:open                |                      Открытие модального окна |
| modal:close               |                      Закрытие модального окна |
| basket:open               |                              Открытие корзины |
| basket:changed            |                 Изменение содержимого корзины |
| order:open                |                         Открытие формы заказа |
| payment:toggle            |                          Выбор способа оплаты |
| /^order..\_:change/       |                   Изменение поля формы заказа |
| formErrorsOrder:change    |    Изменение состояния валидации формы заказа |
| order:submit              |                       Отправка формы доставки |
| /^contacts.[^:]\_:change/ |                Изменение поля формы контактов |
| formErrorsContacts:change | Изменение состояния валидации формы контактов |
| contacts:submit           |                  Завершение оформления заказа |

Данный README файл описывает структуру и основные компоненты проекта. Он предоставляет информацию о технологиях, используемых в проекте, ключевых файлах, установке и запуске, а также определяет основные типы данных и базовые классы, используемые для управления данными и отображением интерфейса.
