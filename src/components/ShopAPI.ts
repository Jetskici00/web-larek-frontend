import { OrderData, ProductDetails, OrderSuccess } from '../types';
import { APIClient, ApiListResponse } from './base/APIClient';

// Интерфейс для класса ShopAPI
export interface IShopAPI {
	getProductList: () => Promise<ProductDetails[]>;
	orderResult: (order: OrderData) => Promise<OrderSuccess>;
}

export class ShopAPI extends APIClient {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string) {
		super(baseUrl);
		this.cdn = cdn;
	}

	// Получает список товаров с сервера
	getProductList(): Promise<ProductDetails[]> {
		return this.get(`/product`).then((data: ApiListResponse<ProductDetails>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	// Отправляет данные заказа
	orderResult(order: OrderData): Promise<OrderSuccess> {
		return this.post(`/order`, order).then((data: OrderSuccess) => data);
	}
}
