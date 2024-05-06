import './scss/styles.scss';

import { CustomerContacts, OrderData, DeliveryInfo } from './types';
import { MainPageContext } from './components/MainPageContext';
import { EventBus } from './components/base/EventBus';
import { ItemCard } from './components/ItemCard';
import { ShopAPI } from './components/ShopAPI';
import { ModalWindow } from './components/common/ModalWindow';
import { ShoppingCart } from './components/common/ShoppingCart';
import { ApplicationState, Product } from './components/AppData';
import { DeliveryForm } from './components/DeliveryForm';
import { ContactForm } from './components/ContactForm';
import { OrderConfirmation } from './components/common/OrderConfirmation';
import { cloneTemplate, ensureElement } from './utils/utils';
import { API_URL, CDN_URL, PaymentMethods } from './utils/constants';

const events = new EventBus();
const api = new ShopAPI(CDN_URL, API_URL);

// Шаблоны
const itemCardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const itemPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const shoppingCartTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cartItemTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const contactFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const deliveryFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new ApplicationState({}, events);

// Глобальные контейнеры
const mainPageContext = new MainPageContext(document.body, events);
const modalWindow = new ModalWindow(
	ensureElement<HTMLElement>('#modal-container'),
	events
);

// Переиспользуемые компоненты интерфейса
const shoppingCart = new ShoppingCart(
	cloneTemplate(shoppingCartTemplate),
	events
);
const deliveryForm = new DeliveryForm(
	cloneTemplate(deliveryFormTemplate),
	events,
	{
		onClick: (evt: Event) => events.emit('payment:toggle', evt.target),
	}
);
const contactForm = new ContactForm(cloneTemplate(contactFormTemplate), events);

// Отображение каталога товаров на главной странице
events.on('catalog:install', () => {
	mainPageContext.productGrid = appData.catalog.map((item) => {
		const card = new ItemCard(cloneTemplate(itemCardTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

// Открытие карточки товара
events.on('card:select', (item: Product) => {
	const card = new ItemCard(cloneTemplate(itemPreviewTemplate), {
		// Добавление/удаление товара из корзины
		onClick: () => {
			events.emit('item:toggle', item);
			mainPageContext.counter = appData.getBasketList().length;
			card.buttonText = item.status;
		},
	});
	return modalWindow.render({
		content: card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
			buttonText: item.status,
		}),
	});
});

// Блокировка прокрутки страницы при открытии модального окна
events.on('modal:open', () => {
	mainPageContext.scrollLocked = true;
});

// Разблокировка прокрутки страницы при закрытии модального окна
events.on('modal:close', () => {
	mainPageContext.scrollLocked = false;
});

// Открытие корзины
events.on('basket:open', () => {
	return modalWindow.render({
		content: shoppingCart.render(),
	});
});

// Удаление из корзины
events.on('item:toggle', (item: Product) => {
	appData.toggleBasketList(item);
	mainPageContext.counter = appData.getBasketList().length;
});

// Изменение содержимого корзины
events.on('basket:changed', () => {
	shoppingCart.items = appData.getBasketList().map((item, index) => {
		const card = new ItemCard(cloneTemplate(cartItemTemplate), {
			onClick: () => {
				events.emit('item:toggle', item);
			},
		});
		card.index = (index + 1).toString();
		return card.render({
			title: item.title,
			price: item.price,
		});
	});
	mainPageContext.counter = appData.getBasketList().length;
	appData.order.total = appData.getTotal();
	shoppingCart.total = appData.getTotal();
});

// Открытие формы заказа
events.on('order:open', () => {
	modalWindow.render({
		content: deliveryForm.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Смена способа оплаты
events.on('payment:toggle', (name: HTMLElement) => {
	if (!name.classList.contains('button_alt-active')) {
		deliveryForm.selectPaymentMethod(name);
		appData.order.payment = PaymentMethods[name.getAttribute('name')];
	}
});

// Изменение поля формы заказа
events.on(
	/^order\..*:change/,
	(data: { field: keyof DeliveryInfo; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Изменение состояния валидации формы заказа
events.on('formErrorsOrder:change', (errors: Partial<OrderData>) => {
	const { address } = errors;
	deliveryForm.valid = !address;
	deliveryForm.errors = Object.values({ address }).filter(Boolean).join('; ');
});

// Отправка формы доставки
events.on('order:submit', () => {
	modalWindow.render({
		content: contactForm.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
	appData.order.items = appData.basketList.map((item) => item.id);
});

// Изменение поля формы контактов
events.on(
	/^contacts\.[^:]*:change/,
	(data: { field: keyof CustomerContacts; value: string }) => {
		appData.setContactsField(data.field, data.value);
	}
);

// Изменение состояния валидации формы контактов
events.on('formErrorsContacts:change', (errors: Partial<OrderData>) => {
	const { email, phone } = errors;
	contactForm.valid = !email && !phone;
	contactForm.errors = Object.values({ email, phone })
		.filter(Boolean)
		.join('; ');
});

// Завершение оформления заказа
events.on('contacts:submit', () => {
	api
		.orderResult(appData.order)
		.then((result) => {
			appData.clearBasket();
			mainPageContext.counter = appData.getBasketList().length;
			events.emit('basket:changed');
			const success = new OrderConfirmation(cloneTemplate(successTemplate), {
				onClick: () => {
					modalWindow.close();
				},
			});
			success.total = result.total;

			modalWindow.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Получение каталога товаров с сервера
api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});
