
import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { OrdersPage } from './OrdersPage';

import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';

export class POManager {
    
    loginPage: LoginPage;
    ordersPage: OrdersPage

    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    page: Page;


    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.ordersPage = new OrdersPage(this.page);

        this.productsPage = new ProductsPage(this.page);
        this.cartPage = new CartPage(this.page);
        this.checkoutPage = new CheckoutPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }


    
    getProductsPage() {
        return this.productsPage;
    }
    
    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }
    
}
