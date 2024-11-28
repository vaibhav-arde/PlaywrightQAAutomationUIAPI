import { expect, Locator, Page } from '@playwright/test';
export class CartPage {

    continueShopping: Locator;
    checkout: Locator;
    page: Page;


    constructor(page: Page) {
        this.page = page;
        this.continueShopping = page.locator(`#continue-shopping`);
        this.checkout = page.locator(`#checkout`);

    }

    async validateProductsOnCartPage(productData: any[]) {
        for (const data of productData) {
            // Locate the container of the product using the name
            const productContainer = this.page.locator('.cart_item_label', { hasText: data.name });

            // Locate the price inside the product container
            const priceLocator = productContainer.locator('.inventory_item_price');

            // Retrieve the text of the price element
            const price = await priceLocator.innerText();
            // console.log(`Price for ${data.name}: ${price}`);

            // Assert the price matches the expected value
            expect(price).toBe(data.price);

            // Assert each cart item has remove button 
            await expect(productContainer.locator('button.cart_button', { hasText: `Remove` })).toHaveId(data.remove)
        }
    }

    async removeItemFromCart(data:any){
        this.page.locator(`#${data.remove}`).click()
    }

    async clickToContinueShopping(){
        this.continueShopping.click()
    }

}