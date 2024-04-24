/**
 * Базовый компонент пользовательского интерфейса
 */
export abstract class UserInterfaceComponent<T> {
	protected constructor(protected readonly container: HTMLElement) {
		// Код в конструкторе выполняется ДО всех объявлений в дочернем классе
	}

	// Инструментарий для работы с DOM в дочерних компонентах

	// Переключает класс элемента
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}

	// Устанавливает текстовое содержимое элемента
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	// Блокирует/разблокирует элемент
	setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	// Скрывает элемент
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	// Показывает элемент
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	// Устанавливает изображение с alt-текстом
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}

	// Возвращает корневой DOM-элемент компонента
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
