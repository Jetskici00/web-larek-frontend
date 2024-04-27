import { ItemCardData, ItemCardActions } from '../types';
import { categoryColour } from '../utils/constants';
import { ensureElement } from '../utils/utils';
import { UserInterfaceComponent } from './base/UserInterfaceComponent';

export class ItemCard extends UserInterfaceComponent<ItemCardData> {
	protected _name: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _buttonText: string;
	protected _button: HTMLButtonElement;
	protected _index: HTMLElement;

	public text(element: HTMLElement, value: string): void {
		element.textContent = value;
	}

	constructor(container: HTMLElement, actions?: ItemCardActions) {
		super(container);

		this._name = ensureElement<HTMLElement>(`.card__title`, container);
		this._image = container.querySelector(`.card__image`);
		this._category = container.querySelector(`.card__category`);
		this._price = container.querySelector(`.card__price`);
		this._description = container.querySelector(`.card__text`);
		this._button = container.querySelector(`.card__button`);
		this._index = container.querySelector('.basket__item-index');

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
	set title(value: string) {
		this.text(this._name, value);
	}

	// Возвращает название товара
	get name(): string {
		return this._name.textContent || '';
	}

	// Устанавливает URL изображения товара
	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	// Устанавливает категорию товара
	set category(value: string) {
		this.text(this._category, value);
		this._category.classList.add(categoryColour[value]);
	}

	// Устанавливает цену товара
	set price(value: number | null) {
		if (value !== null) {
			this.text(this._price, `${value} синапсов`);
		} else {
			this.text(this._price, 'Бесценно');
			if (this._button) {
				this._button.disabled = true;
			}
		}
	}

	// Устанавливает текст кнопки
	set buttonText(status: string) {
		if (status === 'basket') {
			this.text(this._button, 'Удалить');
		} else {
			this.text(this._button, 'В корзину');
		}
	}

	// Устанавливает описание товара
	set description(value: string) {
		this.text(this._description, value);
	}

	set index(value: string) {
		this._index.textContent = value;
	}

	get index(): string {
		return this._index.textContent || '';
	}
}
