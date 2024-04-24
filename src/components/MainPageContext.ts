import { MainPageActions } from '../types';
import { ensureElement } from '../utils/utils';
import { UserInterfaceComponent } from './base/UserInterfaceComponent';
import { IEventBus } from './base/EventBus';

export class MainPageContext extends UserInterfaceComponent<MainPageActions> {
	protected _counter: HTMLElement;
	protected _productGrid: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(container: HTMLElement, protected events: IEventBus) {
		super(container);

		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
		this._productGrid = ensureElement<HTMLElement>('.gallery');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
		this._basket = ensureElement<HTMLElement>('.header__basket');

		this._basket.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: number | null) {
		this.setText(this._counter, String(value));
	}

	set productGrid(items: HTMLElement[]) {
		this._productGrid.replaceChildren(...items);
	}

	set scrollLocked(value: boolean) {
		if (value) {
			this._wrapper.classList.add('page__wrapper_locked');
		} else {
			this._wrapper.classList.remove('page__wrapper_locked');
		}
	}
}
