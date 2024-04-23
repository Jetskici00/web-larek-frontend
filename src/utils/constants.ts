export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

// Пустой объект настроек
export const settings = {};

// Соответствие названий способов оплаты
export const PaymentMethods: { [key: string]: string } = {
	card: 'online',
	cash: 'offline',
};

// Соответствие категорий и цветов карточек
export const categoryColour: { [key: string]: string } = {
	'софт-скил': 'card__category_soft',
	'хард-скил': 'card__category_hard',
	другое: 'card__category_other',
	дополнительное: 'card__category_additional',
	кнопка: 'card__category_button',
};
