import { ItemCardData, ItemCardActions } from '../types';
import { categoryColour } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { UserInterfaceComponent } from './base/UserInterfaceComponent';

export class ItemCard extends UserInterfaceComponent {
	protected _name: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _buttonText: string;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ItemCardActions) {
		super(container);

		this._name = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = container.querySelector(`.card__image`);
		this._category = container.querySelector(`.card__category`);
		this._price = container.querySelector(`.card__price`);
		this._description = container.querySelector(`.card__text`);
		this._button = container.querySelector(`.card__button`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	// Устанавливает id товара
	set id(value: string) {
		this.container.dataset.id = value;
	}

	// Возвращает id товара
	get id(): string {
		return this.container.dataset.id || '';
	}

	// Устанавливает название товара
	set name(value: string) {
		this.setText(this._name, value);
	}

	// Возвращает название товара
	get name(): string {
		return this._name.textContent || '';
	}

	// Устанавливает URL изображения товара
	set imageUrl(value: string) {
		this.setImage(this._image, value, this.name);
	}

	// Устанавливает категорию товара
	set category(value: string) {
		this.setText(this._category, value);
		this._category.classList.add(categoryColour[value]);
	}

	// Устанавливает цену товара
	set price(value: number | null) {
		if (value !== null) {
			this.setText(this._price, `${value} синапсов`);
		} else {
			this.setText(this._price, 'Бесценно');
			if (this._button) {
				this._button.disabled = true;
			}
		}
	}

	// Устанавливает текст кнопки
	set buttonText(status: string) {
		if (status === 'basket') {
			this.setText(this._button, 'Удалить');
		} else {
			this.setText(this._button, 'В корзину');
		}
	}

	// Устанавливает описание товара
	set description(value: string) {
		this.setText(this._description, value);
	}
}
