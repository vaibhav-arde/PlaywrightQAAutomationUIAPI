import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {

    productName: Locator;
    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.productName = page.locator(".card-body b");
        
    }

}
