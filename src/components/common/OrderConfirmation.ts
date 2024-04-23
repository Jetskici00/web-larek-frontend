import { OrderSuccess } from '../../types';
import { ensureElement } from '../../utils/utils';
import { UserInterfaceComponent } from '../base/UserInterfaceComponent';

export class OrderConfirmation extends UserInterfaceComponent {
	protected _close: HTMLElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement, actions?: { onClick: () => void }) {
		super(container);

		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(total: number | string) {
		this.setText(this._total, `Списано ${total} баллов`);
	}
}
