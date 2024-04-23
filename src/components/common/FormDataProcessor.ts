import { UserInterfaceComponent } from '../base/UserInterfaceComponent';
import { IEventBus } from '../base/EventBus';
import { ensureElement } from '../../utils/utils';
import { FieldState } from '../../types';

export class FormDataProcessor {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(
		protected container: HTMLFormElement,
		protected events: IEventBus
	) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	// Устанавливает валидность формы
	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	// Устанавливает список ошибок
	set errors(value: string) {
		this.setText(this._errors, value);
	}

	// Отрисовывает форму с новым состоянием
	render(state: Partial<T> & FieldState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
