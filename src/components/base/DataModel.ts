import { IEventBus } from './EventBus';

// Функция для проверки является ли объект экземпляром DataModel
export const isModel = (obj: unknown): obj is DataModel<any> => {
	return obj instanceof DataModel;
};

/**
 * Абстрактный класс для управления данными и взаимодействия с системой событий
 */
export abstract class DataModel<T> {
	constructor(data: Partial<T>, protected events: IEventBus) {
		Object.assign(this, data);
	}

	// Уведомляет подписчиков об изменении данных
	emitChanges(event: string, payload?: object) {
		// Данные события можно модифицировать
		this.events.emit(event, payload ?? {});
	}

	// Здесь можно добавить общие методы для моделей
}
