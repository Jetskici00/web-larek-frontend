import {
	FormErrorsContacts,
	FormErrorsOrder,
	CustomerContacts,
	DeliveryInfo,
	OrderData,
	ProductDetails,
} from '../types';
import { DataModel } from './base/DataModel';

// Тип для события изменения каталога
export type CatalogChangeEvent = {
	catalog: Product[];
};

// Статусы продукта
export type ProductStatus = 'basket' | 'sell';

// Класс для представления одного продукта
export class Product extends DataModel<ProductDetails> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	status: ProductStatus = 'sell';
	quantity = 0;
}

// Класс для управления состоянием приложения
export class ApplicationState extends Product {
	basketList: Product[] = [];
	catalog: Product[];
	order: OrderData = {
		address: '',
		items: [],
		payment: 'online',
		email: '',
		phone: '',
		total: 0,
	};

	formErrorsOrder: FormErrorsOrder = {};
	formErrorsContacts: FormErrorsContacts = {};

	// Очищает корзину
	clearBasket() {
		this.basketList.forEach((item) => {
			item.status = 'sell';
		});
		this.basketList = [];
	}

	// Возвращает общую стоимость заказа
	getTotal() {
		return this.basketList.reduce((a, c) => a + c.price, 0);
	}

	// Устанавливает список товаров
	setCatalog(items: ProductDetails[]) {
		this.catalog = items.map((item) => new Product(item, this.events));
		this.emitChanges('catalog:install', { catalog: this.catalog });
	}

	// Обновляет поле информации о доставке
	setOrderField(field: keyof DeliveryInfo, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	// Проверяет валидность данных о доставке
	validateOrder() {
		const errors: typeof this.formErrorsOrder = {};

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrorsOrder = errors;
		this.events.emit('formErrorsOrder:change', this.formErrorsOrder);

		return Object.keys(errors).length === 0;
	}

	// Обновляет поле контактной информации
	setContactsField(field: keyof CustomerContacts, value: string) {
		this.order[field] = value;
		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	// Проверяет валидность контактной информации
	validateContacts() {
		const errors: typeof this.formErrorsContacts = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrorsContacts = errors;
		this.events.emit('formErrorsContacts:change', this.formErrorsContacts);

		return Object.keys(errors).length === 0;
	}

	// Добавляет/удаляет товар из корзины
	toggleBasketList(item: Product) {
		if (item.status === 'sell' && item.price !== null) {
			this.basketList.push(item);
			item.status = 'basket';
			item.quantity = this.basketList.length;
			this.emitChanges('basket:changed', this.basketList);
		} else if (item.status === 'basket') {
			this.basketList = this.basketList.filter((it) => it !== item);
			item.status = 'sell';
			item.quantity = this.basketList.length;
			this.emitChanges('basket:changed', this.basketList);
		}
	}

	// Возвращает список товаров в корзине
	getBasketList(): Product[] {
		return this.basketList;
	}
}
