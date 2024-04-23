import { FormDataProcessor } from './common/FormDataProcessor';
import { DeliveryInfo } from '../types';
import { ensureElement } from '../utils/utils';
import { IEventBus } from './base/EventBus';

export class DeliveryForm extends FormDataProcessor {
	protected _cardButton: HTMLButtonElement;
	protected _cashButton: HTMLButtonElement;

	constructor(
		container: HTMLFormElement,
		events: IEventBus,
		actions?: { onClick: (event: MouseEvent) => void }
	) {
		super(container, events);

		this._cardButton = ensureElement<HTMLButtonElement>(
			'button[name="card"]',
			this.container
		);
		this._cashButton = ensureElement<HTMLButtonElement>(
			'button[name="cash"]',
			this.container
		);
		this._cardButton.classList.add('button_alt-active');

		if (actions?.onClick) {
			this._cardButton.addEventListener('click', actions.onClick);
			this._cashButton.addEventListener('click', actions.onClick);
		}
	}

	// Выбирает способ оплаты
	selectPaymentMethod(name: HTMLElement) {
		this._cardButton.classList.toggle('button_alt-active');
		this._cashButton.classList.toggle('button_alt-active');
	}

	// Устанавливает адрес доставки
	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}
