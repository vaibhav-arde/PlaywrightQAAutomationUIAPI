
import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { OrdersPage } from './OrdersPage';
import { ProductsPage } from './ProductsPage';

export class POManager {
    
    loginPage: LoginPage;
    ordersPage: OrdersPage
    productsPage: ProductsPage;
    page: Page;


    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.ordersPage = new OrdersPage(this.page);

        this.productsPage = new ProductsPage(this.page);

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
    
}
