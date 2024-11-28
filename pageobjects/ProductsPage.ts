import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {

    productsTitle: Locator;
    appLogo: Locator;
    cart: Locator;
    invertoryList: Locator;
    burgerButton: Locator;
    logoutLink: Locator;
    cartBadge: Locator;
    appLogoText: string;
    productsTitleText: string;
    addToCart: Locator;
    cartItems: Locator;

    page: Page;

    constructor(page: Page) {
        this.page = page;
        this.appLogo = page.locator("div.app_logo");
        this.productsTitle = page.locator("span.title");
        this.cart = page.locator("a.shopping_cart_link");
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.invertoryList = page.locator("div.inventory_list");
        this.burgerButton = page.locator("div.bm-burger-button");
        this.logoutLink = page.locator("#logout_sidebar_link");
        this.appLogoText = "Swag Labs"
        this.productsTitleText = "Products"
        this.cartItems = page.locator('.cart_item');
        this.addToCart = page.locator('[data-test^="add-to-cart"]');

    }

    async validateProductsandAddToCart(productData: any[]) {
        for (const data of productData) {
            // Locate the container of the product using the name
            const productContainer = this.page.locator('.inventory_item', { hasText: data.name });

            // Locate the price inside the product container
            const priceLocator = productContainer.locator('.inventory_item_price');

            // Retrieve the text of the price element
            const price = await priceLocator.innerText();

            // Assert the price matches the expected value
            expect(price).toBe(data.price);

            // Click the 'Add to Cart' button
            await this.page.locator(data.add_to_cart).click();
        }
    }


    async verifyProductPage() {
        await expect(this.appLogo).toHaveText(this.appLogoText)
        await expect(this.productsTitle).toHaveText(this.productsTitleText)
        await expect(this.invertoryList).toBeInViewport()
        await expect(this.cart).toBeVisible()
        await expect(this.burgerButton).toBeVisible()
    }

    async logout() {
        await this.burgerButton.click()
        await this.logoutLink.click()
    }

}
