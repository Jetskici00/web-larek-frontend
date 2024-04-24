import { FormDataProcessor } from './common/FormDataProcessor';
import { CustomerContacts } from '../types';
import { IEventBus } from './base/EventBus';

export class ContactForm extends FormDataProcessor<CustomerContacts> {
	constructor(container: HTMLFormElement, events: IEventBus) {
		super(container, events);
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}
}
