// Описывает возможные действия на главной странице
export interface MainPageActions {
	productGrid: HTMLElement[];
	scrollLocked: boolean;
}

// Подробная информация о продукте
export interface ProductDetails {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// Действия, доступные для карточки товара
export interface ItemCardActions {
	onClick: (event: MouseEvent) => void;
}

// Данные для отображения карточки товара
export interface ItemCardData extends ProductDetails {
	buttonText: string;
	quantity: number | string;
}

// Содержимое модального окна
export interface ModalContent {
	content: HTMLElement;
}

// Данные для отображения корзины
export interface ShoppingCartView {
	items: HTMLElement[];
	total: number | string;
	selectedIds: string[];
}

// Состояние поля формы
export interface FieldState {
	valid: boolean;
	errors: string[];
}

// Адрес доставки
export interface DeliveryInfo {
	payment: string;
	address: string;
}

// Контактные данные покупателя
export interface CustomerContacts {
	email: string;
	phone: string;
}

// Объединяет информацию о доставке и контактах
export interface OrderData extends DeliveryInfo, CustomerContacts {
	total: number | string;
	items: string[];
}

// Информация о покупателе и его заказах
export interface CustomerData extends CustomerContacts {
	items: string[];
}

// Обработка событий кликов
export interface IActions {
	onClick: (event: MouseEvent) => void;
}

// Обработки после успешных операций
export interface ISuccessActions {
	onClick: () => void;
}

// Информация об успешном заказе
export interface OrderSuccess {
	id: string;
	total: number;
}

export type FormErrorsOrder = Partial<Record<keyof OrderData, string>>;
export type FormErrorsContacts = Partial<Record<keyof CustomerData, string>>;
