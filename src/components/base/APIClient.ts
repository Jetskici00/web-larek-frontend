// Определяем типы для ответа API и методов POST-запроса
export type ApiListResponse<Type> = {
	total: number;
	items: Type[];
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

// Базовый класс для взаимодействия с API
export class APIClient {
	readonly baseUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		this.baseUrl = baseUrl;
		this.options = {
			headers: {
				'Content-Type': 'application/json',
				...((options.headers as object) ?? {}),
			},
		};
	}

	// Обрабатывает ответ сервера
	protected handleResponse(response: Response): Promise<object> {
		if (response.ok) return response.json();
		else
			return response
				.json()
				.then((data) => Promise.reject(data.error ?? response.statusText));
	}

	// Выполняет GET-запрос
	get(uri: string) {
		const url = `${this.baseUrl}${uri}`;
		return fetch(url, {
			...this.options,
			method: 'GET',
		}).then(this.handleResponse);
	}

	// Выполняет POST-запрос
	post(uri: string, data: object, method: ApiPostMethods = 'POST') {
		return fetch(this.baseUrl + uri, {
			...this.options,
			method,
			body: JSON.stringify(data),
		}).then((response) => this.handleResponse(response));
	}
}
