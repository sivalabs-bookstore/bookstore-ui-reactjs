import axios from "./axios";
import config from './config'
import {
    CartModel, CreateOrderModel, OrderConfirmationModel, OrderModel,
    ProductListModel
} from "../models/Models";

const CATALOG_API_BASE_URL = config.CATALOG_API_BASE_URL;
const ORDER_API_BASE_URL = config.ORDER_API_BASE_URL;

export function fetchProducts(page: number) {
    let queryString = "?page=" + page;
    return axios.get<ProductListModel>(`${CATALOG_API_BASE_URL}/api/products` + queryString);
}

export function getCart(): Promise<CartModel> {
    const cartId = localStorage.getItem("cartId");
    let cartParam = "";
    if (cartId) {
        cartParam = "?cartId=" + cartId;
    }
    return axios.get<CartModel>(`${ORDER_API_BASE_URL}/api/carts${cartParam}`).then(response => {
        localStorage.setItem("cartId", response.data.id);
        return response.data;
    });
}

export function addProductToCart(code: string): Promise<CartModel> {
    const cartId = localStorage.getItem("cartId");
    let cartParam = "";
    if (cartId) {
        cartParam = "?cartId=" + cartId;
    }
    return axios.post<CartModel>(`${ORDER_API_BASE_URL}/api/carts${cartParam}`, {
        "code": code
    }).then(response => {
        localStorage.setItem("cartId", response.data.id);
        return response.data;
    });
}

export function updateProductQuantityInCart(code: string, quantity: number): Promise<CartModel> {
    const cartId = localStorage.getItem("cartId");
    let cartParam = "";
    if (cartId) {
        cartParam = "?cartId=" + cartId;
    }
    return axios.put<CartModel>(`${ORDER_API_BASE_URL}/api/carts${cartParam}`, {
        "code": code,
        "quantity": quantity
    }).then(response => {
        localStorage.setItem("cartId", response.data.id);
        return response.data;
    });
}

export function createOrder(order: CreateOrderModel): Promise<OrderConfirmationModel> {
    return axios.post<OrderConfirmationModel>(`${ORDER_API_BASE_URL}/api/orders`, order)
        .then(response => {
            localStorage.removeItem("cartId");
            return response.data;
        });
}

export function fetchOrder(orderId: string): Promise<OrderModel> {
    return axios.get<OrderModel>(`${ORDER_API_BASE_URL}/api/orders/${orderId}`)
        .then(response => {
            return response.data;
        });
}