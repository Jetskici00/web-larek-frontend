import { UserInterfaceComponent } from '../base/UserInterfaceComponent';
import { createElement, ensureElement } from '../../utils/utils';
import { EventBus } from '../base/EventBus';
import { Product } from '../AppData';
import { ShoppingCartView } from '../../types';

export class ShoppingCart extends UserInterfaceComponent<ShoppingCartView> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;
	protected _buttonDelete: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventBus) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.basket__button');
		this._buttonDelete = this.container.querySelector('.basket__item-delete');

		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open');
			});
		} else if (this._buttonDelete) {
			this._buttonDelete.addEventListener('click', () => {
				events.emit('item:toggle');
			});
		}

		this.items = [];
	}

	// Устанавливает список товаров в корзине
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	// Устанавливает список идентификаторов выбранных товаров и обновляет кнопку
	set selectedIds(items: Product[]) {
		if (items.length) {
			this.setDisabled(this._button, false);
		} else {
			this.setDisabled(this._button, true);
		}
	}

	// Устанавливает общую стоимость товаров в корзине
	set total(total: number | string) {
		this.setText(this._total, `${total} синапсов`);
	}
}
